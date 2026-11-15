import {
  GitHubActivityData,
  GitHubHeatmapWeek,
  GitHubHeatmapMonth,
  GitHubPublicEvent,
  ContributionLevel,
  LeetCodeActivityData,
  LeetCodeCalendarDay,
  LeetCodeAcceptedProblem,
  LinkedInPostData,
} from '../types/activity.js';
import { ACTIVITY_CONFIG } from '../data/activityConfig.js';
import { getManualLinkedInPost } from '../data/latestLinkedInPost.js';

// Map GitHub contribution level strings to 0-4 numbers
export function mapGitHubContributionLevel(level: string): ContributionLevel {
  switch (level) {
    case 'FIRST_QUARTILE':
      return 1;
    case 'SECOND_QUARTILE':
      return 2;
    case 'THIRD_QUARTILE':
      return 3;
    case 'FOURTH_QUARTILE':
      return 4;
    case 'NONE':
    default:
      return 0;
  }
}

// Map LeetCode submission count to 0-4 intensity level
export function mapLeetCodeIntensityLevel(count: number): ContributionLevel {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

/**
 * Maps raw GitHub GraphQL & REST API responses into normalized GitHubActivityData
 */
export function mapGitHubResponse(
  graphqlData: any,
  restEvents: any[] = []
): GitHubActivityData {
  const calendar =
    graphqlData?.data?.user?.contributionsCollection?.contributionCalendar;

  const totalContributions = calendar?.totalContributions ?? 0;

  const weeks: GitHubHeatmapWeek[] = (calendar?.weeks ?? []).map((w: any) => ({
    days: (w.contributionDays ?? []).map((d: any) => ({
      date: d.date,
      count: d.contributionCount ?? 0,
      level: mapGitHubContributionLevel(d.contributionLevel),
      weekday: d.weekday ?? 0,
    })),
  }));

  const months: GitHubHeatmapMonth[] = (calendar?.months ?? []).map((m: any) => ({
    name: m.name,
    year: m.year,
    firstDay: m.firstDay,
    totalWeeks: m.totalWeeks,
  }));

  const recentEvents: GitHubPublicEvent[] = (Array.isArray(restEvents) ? restEvents : [])
    .slice(0, 5)
    .map((e: any) => {
      let detail = 'Active in repository';
      const repoName = e.repo?.name || 'repository';
      const repoUrl = `https://github.com/${repoName}`;

      if (e.type === 'PushEvent') {
        const commitCount = e.payload?.commits?.length || 1;
        detail = `Pushed ${commitCount} commit${commitCount === 1 ? '' : 's'}`;
      } else if (e.type === 'CreateEvent') {
        detail = `Created ${e.payload?.ref_type || 'repository'}`;
      } else if (e.type === 'PullRequestEvent') {
        detail = `${e.payload?.action || 'Opened'} pull request`;
      } else if (e.type === 'IssuesEvent') {
        detail = `${e.payload?.action || 'Updated'} issue`;
      } else if (e.type === 'WatchEvent') {
        detail = 'Starred repository';
      }

      return {
        id: e.id || String(Math.random()),
        type: e.type || 'Event',
        repo: repoName,
        repoUrl,
        createdAt: e.created_at || new Date().toISOString(),
        detail,
      };
    });

  return {
    username: ACTIVITY_CONFIG.github.username,
    totalContributions,
    periodLabel: 'Past 12 Months',
    weeks,
    months,
    recentEvents,
    profileUrl: ACTIVITY_CONFIG.github.profileUrl,
  };
}

/**
 * Maps raw LeetCode GraphQL response into normalized LeetCodeActivityData
 */
export function mapLeetCodeResponse(
  rawGraphQL: any,
  username: string
): LeetCodeActivityData | null {
  const matched = rawGraphQL?.data?.matchedUser;
  if (!matched) return null;

  const calendar = matched.userCalendar;
  const submitStats = matched.submitStatsGlobal;

  let total = 0,
    easy = 0,
    medium = 0,
    hard = 0;

  if (submitStats?.acSubmissionNum) {
    for (const item of submitStats.acSubmissionNum) {
      switch (item.difficulty) {
        case 'All':
          total = item.count;
          break;
        case 'Easy':
          easy = item.count;
          break;
        case 'Medium':
          medium = item.count;
          break;
        case 'Hard':
          hard = item.count;
          break;
      }
    }
  }

  // Parse submission calendar JSON string (e.g. '{"1704067200": 2, ...}')
  let rawCalendarMap: Record<string, number> = {};
  if (calendar?.submissionCalendar) {
    try {
      rawCalendarMap =
        typeof calendar.submissionCalendar === 'string'
          ? JSON.parse(calendar.submissionCalendar)
          : calendar.submissionCalendar;
    } catch {
      rawCalendarMap = {};
    }
  }

  // Convert submission calendar timestamps to sorted calendar days
  const calendarDays: LeetCodeCalendarDay[] = Object.entries(rawCalendarMap).map(
    ([timestampStr, count]) => {
      const ts = Number(timestampStr);
      const date = new Date(ts * 1000).toISOString().split('T')[0];
      return {
        date,
        timestamp: ts,
        count: Number(count),
        level: mapLeetCodeIntensityLevel(Number(count)),
      };
    }
  );

  calendarDays.sort((a, b) => a.timestamp - b.timestamp);

  // Map recent accepted submissions
  const recentRaw = rawGraphQL?.data?.recentAcSubmissionList || [];
  const recentAccepted: LeetCodeAcceptedProblem[] = (
    Array.isArray(recentRaw) ? recentRaw : []
  )
    .slice(0, 5)
    .map((item: any) => ({
      id: item.id || String(Math.random()),
      title: item.title,
      titleSlug: item.titleSlug,
      timestamp: Number(item.timestamp) || 0,
      url: `https://leetcode.com/problems/${item.titleSlug}/`,
      difficulty: item.difficulty,
    }));

  return {
    username: matched.username || username,
    totalSolved: total,
    easySolved: easy,
    mediumSolved: medium,
    hardSolved: hard,
    streak: calendar?.streak ?? 0,
    totalActiveDays: calendar?.totalActiveDays ?? 0,
    activeYears: calendar?.activeYears ?? [],
    submissionCalendar: rawCalendarMap,
    calendarDays,
    recentAccepted,
    profileUrl: `https://leetcode.com/u/${matched.username || username}/`,
  };
}

/**
 * Maps raw LinkedIn response or falls back to manual config
 */
export function mapLinkedInResponse(rawApiResponse: any): LinkedInPostData | null {
  if (rawApiResponse?.elements && rawApiResponse.elements.length > 0) {
    const post = rawApiResponse.elements[0];
    return {
      postUrl: post.postUrl || ACTIVITY_CONFIG.linkedin.profileUrl,
      text: post.commentary || post.text || '',
      publishedAt: post.publishedAt || undefined,
      imageUrl: post.media?.[0]?.url,
      profileUrl: ACTIVITY_CONFIG.linkedin.profileUrl,
      isManualFallback: false,
    };
  }

  return getManualLinkedInPost();
}
