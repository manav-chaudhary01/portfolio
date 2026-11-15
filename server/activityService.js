import { mapGitHubResponse, mapLeetCodeResponse, mapLinkedInResponse } from '../src/services/activityMappers.js';
import { ACTIVITY_CONFIG } from '../src/data/activityConfig.js';
import { getManualLinkedInPost } from '../src/data/latestLinkedInPost.js';

// Cache stores
const cache = {
  github: { response: null, timestamp: 0 },
  leetcode: { response: null, timestamp: 0 },
  linkedin: { response: null, timestamp: 0 },
};

// In-flight request coalescing promises
const inFlight = {
  github: null,
  leetcode: null,
  linkedin: null,
};

const TTL_MS = {
  github: ACTIVITY_CONFIG.github.cacheTtlMinutes * 60 * 1000,
  leetcode: ACTIVITY_CONFIG.leetcode.cacheTtlMinutes * 60 * 1000,
  linkedin: ACTIVITY_CONFIG.linkedin.cacheTtlMinutes * 60 * 1000,
};

// Upstream request timeout (8 seconds)
const UPSTREAM_TIMEOUT_MS = 8000;

function createFetchSignal(timeoutMs = UPSTREAM_TIMEOUT_MS) {
  if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
    return AbortSignal.timeout(timeoutMs);
  }
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller.signal;
}

/**
 * Fetch GitHub Activity (GraphQL Calendar + REST Public Events)
 */
async function fetchGitHubInternal(env = process.env) {
  const username = env.GITHUB_USERNAME !== undefined ? env.GITHUB_USERNAME : ACTIVITY_CONFIG.github.username;
  const token = env.GITHUB_TOKEN;
  const now = new Date().toISOString();

  // If no server token configured, fetch public events via REST only
  if (!token) {
    try {
      const restRes = await fetch(`https://api.github.com/users/${username}/events/public?per_page=5`, {
        headers: { 'User-Agent': 'Portfolio-Elsewhere-Service' },
        signal: createFetchSignal(),
      });
      const restEvents = restRes.ok ? await restRes.json() : [];

      const fallbackData = mapGitHubResponse(null, restEvents);
      return {
        provider: 'github',
        status: 'not-configured',
        data: fallbackData,
        lastFetched: now,
        message: 'GitHub Personal Access Token (GITHUB_TOKEN) is not configured in server environment. Full contribution heatmap requires read-only token.',
      };
    } catch (err) {
      return {
        provider: 'github',
        status: 'unavailable',
        data: null,
        lastFetched: now,
        message: `Failed to fetch public events: ${err.message}`,
      };
    }
  }

  // GraphQL query for contribution calendar
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                contributionLevel
                weekday
              }
            }
            months {
              name
              year
              firstDay
              totalWeeks
            }
          }
        }
      }
    }
  `;

  try {
    const [gqlRes, restRes] = await Promise.all([
      fetch(ACTIVITY_CONFIG.github.graphqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'User-Agent': 'Portfolio-Elsewhere-Service',
        },
        body: JSON.stringify({ query, variables: { username } }),
        signal: createFetchSignal(),
      }),
      fetch(`https://api.github.com/users/${username}/events/public?per_page=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': 'Portfolio-Elsewhere-Service',
        },
        signal: createFetchSignal(),
      }),
    ]);

    if (!gqlRes.ok) {
      if (gqlRes.status === 401 || gqlRes.status === 403) {
        throw new Error(`GitHub API authentication failed (${gqlRes.status}). Check GITHUB_TOKEN.`);
      }
      throw new Error(`GitHub API returned status ${gqlRes.status}`);
    }

    const gqlData = await gqlRes.json();
    const restEvents = restRes.ok ? await restRes.json() : [];

    const mapped = mapGitHubResponse(gqlData, restEvents);

    return {
      provider: 'github',
      status: 'success',
      data: mapped,
      lastFetched: now,
      cachedAt: now,
    };
  } catch (err) {
    // If cached data exists, return stale-on-error
    if (cache.github.response?.data) {
      return {
        ...cache.github.response,
        isStale: true,
        lastFetched: now,
        message: `Upstream error: ${err.message}. Showing last cached telemetry.`,
      };
    }

    return {
      provider: 'github',
      status: 'unavailable',
      data: null,
      lastFetched: now,
      message: err.message,
    };
  }
}

/**
 * Fetch LeetCode Activity (Public GraphQL Profile & Submissions)
 */
async function fetchLeetCodeInternal(env = process.env) {
  const username = env.LEETCODE_USERNAME !== undefined ? env.LEETCODE_USERNAME : ACTIVITY_CONFIG.leetcode.username;
  const now = new Date().toISOString();

  if (!username) {
    return {
      provider: 'leetcode',
      status: 'not-configured',
      data: null,
      lastFetched: now,
      message: 'LEETCODE_USERNAME is not configured. Set LEETCODE_USERNAME in environment or activityConfig.ts.',
    };
  }

  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        userCalendar {
          streak
          totalActiveDays
          submissionCalendar
          activeYears
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
      recentAcSubmissionList(username: $username, limit: 5) {
        id
        title
        titleSlug
        timestamp
      }
    }
  `;

  try {
    const res = await fetch(ACTIVITY_CONFIG.leetcode.graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Referer: 'https://leetcode.com',
      },
      body: JSON.stringify({ query, variables: { username } }),
      signal: createFetchSignal(),
    });

    if (res.status === 429) {
      throw new Error('LeetCode rate limit reached (HTTP 429).');
    }

    if (!res.ok) {
      throw new Error(`LeetCode API returned status ${res.status}`);
    }

    const json = await res.json();
    const mapped = mapLeetCodeResponse(json, username);

    if (!mapped) {
      return {
        provider: 'leetcode',
        status: 'unavailable',
        data: null,
        lastFetched: now,
        message: `LeetCode user '${username}' not found or profile is private.`,
      };
    }

    return {
      provider: 'leetcode',
      status: 'success',
      data: mapped,
      lastFetched: now,
      cachedAt: now,
    };
  } catch (err) {
    // If cached data exists, return stale-on-error
    if (cache.leetcode.response?.data) {
      return {
        ...cache.leetcode.response,
        isStale: true,
        lastFetched: now,
        message: `Upstream error: ${err.message}. Showing last cached telemetry.`,
      };
    }

    return {
      provider: 'leetcode',
      status: 'unavailable',
      data: null,
      lastFetched: now,
      message: err.message,
    };
  }
}

/**
 * Fetch LinkedIn Activity (Official API or Manual Fallback)
 */
async function fetchLinkedInInternal(env = process.env) {
  const token = env.LINKEDIN_ACCESS_TOKEN;
  const memberId = env.LINKEDIN_MEMBER_ID;
  const now = new Date().toISOString();

  // If no official API token, cleanly fall back to manual config
  if (!token || !memberId) {
    const manualPost = getManualLinkedInPost();
    return {
      provider: 'linkedin',
      status: manualPost ? 'success' : 'not-configured',
      data: manualPost,
      lastFetched: now,
      message: manualPost
        ? 'Displaying latest manually configured post.'
        : 'No manual post configured and official API access is not active.',
    };
  }

  try {
    const res = await fetch(`https://api.linkedin.com/v2/posts?author=urn:li:person:${memberId}&sortBy=LAST_MODIFIED&count=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Restli-Protocol-Version': '2.0.0',
      },
      signal: createFetchSignal(),
    });

    if (!res.ok) {
      throw new Error(`LinkedIn API returned status ${res.status}`);
    }

    const json = await res.json();
    const mapped = mapLinkedInResponse(json);

    return {
      provider: 'linkedin',
      status: 'success',
      data: mapped,
      lastFetched: now,
      cachedAt: now,
    };
  } catch (err) {
    const manualFallback = getManualLinkedInPost();
    if (manualFallback) {
      return {
        provider: 'linkedin',
        status: 'stale',
        data: manualFallback,
        lastFetched: now,
        isStale: true,
        message: `Official LinkedIn API error: ${err.message}. Showing manual fallback.`,
      };
    }

    return {
      provider: 'linkedin',
      status: 'unavailable',
      data: null,
      lastFetched: now,
      message: err.message,
    };
  }
}

/**
 * Cached provider runner with request coalescing
 */
async function getProviderData(provider, fetchFn, env) {
  const now = Date.now();
  const cached = cache[provider];

  // Return fresh cache if within TTL
  if (cached.response && now - cached.timestamp < TTL_MS[provider] && !cached.response.isStale) {
    return cached.response;
  }

  // If a request is already in-flight, coalesce onto it
  if (inFlight[provider]) {
    return inFlight[provider];
  }

  // Initiate new fetch
  inFlight[provider] = fetchFn(env)
    .then((result) => {
      if (result.status === 'success' || (result.status === 'not-configured' && result.data)) {
        cache[provider] = {
          response: result,
          timestamp: Date.now(),
        };
      }
      return result;
    })
    .finally(() => {
      inFlight[provider] = null;
    });

  return inFlight[provider];
}

/**
 * Master handler for Activity API (/api/activity)
 */
export async function getActivityPayload(env = process.env) {
  const [github, leetcode, linkedin] = await Promise.all([
    getProviderData('github', fetchGitHubInternal, env),
    getProviderData('leetcode', fetchLeetCodeInternal, env),
    getProviderData('linkedin', fetchLinkedInInternal, env),
  ]);

  return {
    github,
    leetcode,
    linkedin,
  };
}

/**
 * Clear in-memory cache (useful for testing)
 */
export function clearActivityCache() {
  cache.github = { response: null, timestamp: 0 };
  cache.leetcode = { response: null, timestamp: 0 };
  cache.linkedin = { response: null, timestamp: 0 };
  inFlight.github = null;
  inFlight.leetcode = null;
  inFlight.linkedin = null;
}
