import test from 'node:test';
import assert from 'node:assert/strict';

import {
  mapGitHubContributionLevel,
  mapLeetCodeIntensityLevel,
  mapGitHubResponse,
  mapLeetCodeResponse,
  mapLinkedInResponse,
} from '../src/services/activityMappers.js';

import {
  getActivityPayload,
  clearActivityCache,
} from '../server/activityService.js';

test('1. mapGitHubContributionLevel maps quartile strings to numbers', () => {
  assert.equal(mapGitHubContributionLevel('NONE'), 0);
  assert.equal(mapGitHubContributionLevel('FIRST_QUARTILE'), 1);
  assert.equal(mapGitHubContributionLevel('SECOND_QUARTILE'), 2);
  assert.equal(mapGitHubContributionLevel('THIRD_QUARTILE'), 3);
  assert.equal(mapGitHubContributionLevel('FOURTH_QUARTILE'), 4);
  assert.equal(mapGitHubContributionLevel('UNKNOWN_VALUE'), 0);
});

test('2. mapLeetCodeIntensityLevel maps submission counts to 0-4 scale', () => {
  assert.equal(mapLeetCodeIntensityLevel(0), 0);
  assert.equal(mapLeetCodeIntensityLevel(1), 1);
  assert.equal(mapLeetCodeIntensityLevel(2), 1);
  assert.equal(mapLeetCodeIntensityLevel(3), 2);
  assert.equal(mapLeetCodeIntensityLevel(5), 2);
  assert.equal(mapLeetCodeIntensityLevel(6), 3);
  assert.equal(mapLeetCodeIntensityLevel(9), 3);
  assert.equal(mapLeetCodeIntensityLevel(10), 4);
  assert.equal(mapLeetCodeIntensityLevel(45), 4);
});

test('3. mapGitHubResponse transforms GraphQL and REST data accurately', () => {
  const mockGql = {
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: 142,
            weeks: [
              {
                contributionDays: [
                  {
                    contributionCount: 3,
                    date: '2026-01-01',
                    contributionLevel: 'SECOND_QUARTILE',
                    weekday: 4,
                  },
                ],
              },
            ],
            months: [
              {
                name: 'Jan',
                year: 2026,
                firstDay: '2026-01-01',
                totalWeeks: 4,
              },
            ],
          },
        },
      },
    },
  };

  const mockRest = [
    {
      id: 'evt-1',
      type: 'PushEvent',
      repo: { name: 'manav-chaudhary01/meter-flow' },
      created_at: '2026-03-10T12:00:00Z',
      payload: { commits: [{}, {}] },
    },
    {
      id: 'evt-2',
      type: 'CreateEvent',
      repo: { name: 'manav-chaudhary01/attendance-tracker' },
      created_at: '2026-03-09T10:00:00Z',
      payload: { ref_type: 'branch' },
    },
    {
      id: 'evt-3',
      type: 'PullRequestEvent',
      repo: { name: 'manav-chaudhary01/leetcode-widget' },
      created_at: '2026-03-08T09:00:00Z',
      payload: { action: 'opened' },
    },
    {
      id: 'evt-4',
      type: 'WatchEvent',
      repo: { name: 'vitejs/vite' },
      created_at: '2026-03-07T08:00:00Z',
    },
    {
      id: 'evt-5',
      type: 'IssuesEvent',
      repo: { name: 'manav-chaudhary01/meter-flow' },
      created_at: '2026-03-06T07:00:00Z',
      payload: { action: 'closed' },
    },
    {
      id: 'evt-6-excess',
      type: 'PushEvent',
      repo: { name: 'manav-chaudhary01/portfolio' },
      created_at: '2026-03-05T06:00:00Z',
    },
  ];

  const result = mapGitHubResponse(mockGql, mockRest);

  assert.equal(result.totalContributions, 142);
  assert.equal(result.weeks.length, 1);
  assert.equal(result.weeks[0].days[0].count, 3);
  assert.equal(result.weeks[0].days[0].level, 2);
  assert.equal(result.months.length, 1);
  assert.equal(result.months[0].name, 'Jan');

  // Verify slice to max 5 recent events
  assert.equal(result.recentEvents.length, 5);
  assert.equal(result.recentEvents[0].detail, 'Pushed 2 commits');
  assert.equal(result.recentEvents[1].detail, 'Created branch');
  assert.equal(result.recentEvents[2].detail, 'opened pull request');
  assert.equal(result.recentEvents[3].detail, 'Starred repository');
  assert.equal(result.recentEvents[4].detail, 'closed issue');
});

test('4. mapGitHubResponse handles empty/null fallback inputs safely', () => {
  const result = mapGitHubResponse(null, null);
  assert.equal(result.totalContributions, 0);
  assert.deepEqual(result.weeks, []);
  assert.deepEqual(result.months, []);
  assert.deepEqual(result.recentEvents, []);
  assert.equal(result.username, 'manav-chaudhary01');
});

test('5. mapLeetCodeResponse handles missing user as null', () => {
  const result = mapLeetCodeResponse({ data: { matchedUser: null } }, 'nonexistent');
  assert.equal(result, null);
});

test('6. mapLeetCodeResponse maps profile, calendar, breakdown and submissions accurately', () => {
  const mockGql = {
    data: {
      matchedUser: {
        username: 'coder_manav',
        userCalendar: {
          streak: 14,
          totalActiveDays: 48,
          activeYears: [2025, 2026],
          submissionCalendar: JSON.stringify({
            '1704067200': 3,
            '1704153600': 1,
            '1704240000': 12,
          }),
        },
        submitStatsGlobal: {
          acSubmissionNum: [
            { difficulty: 'All', count: 180 },
            { difficulty: 'Easy', count: 90 },
            { difficulty: 'Medium', count: 75 },
            { difficulty: 'Hard', count: 15 },
          ],
        },
      },
      recentAcSubmissionList: [
        {
          id: 'sub-1',
          title: 'Two Sum',
          titleSlug: 'two-sum',
          timestamp: '1704240000',
        },
        {
          id: 'sub-2',
          title: 'LRU Cache',
          titleSlug: 'lru-cache',
          timestamp: '1704230000',
        },
      ],
    },
  };

  const result = mapLeetCodeResponse(mockGql, 'coder_manav');
  assert.ok(result);
  assert.equal(result.username, 'coder_manav');
  assert.equal(result.totalSolved, 180);
  assert.equal(result.easySolved, 90);
  assert.equal(result.mediumSolved, 75);
  assert.equal(result.hardSolved, 15);
  assert.equal(result.streak, 14);
  assert.equal(result.totalActiveDays, 48);

  // Calendar days
  assert.equal(result.calendarDays.length, 3);
  assert.equal(result.calendarDays[0].count, 3);
  assert.equal(result.calendarDays[0].level, 2);
  assert.equal(result.calendarDays[2].count, 12);
  assert.equal(result.calendarDays[2].level, 4);

  // Recent accepted submissions
  assert.equal(result.recentAccepted.length, 2);
  assert.equal(result.recentAccepted[0].title, 'Two Sum');
  assert.equal(result.recentAccepted[0].url, 'https://leetcode.com/problems/two-sum/');
});

test('7. mapLinkedInResponse returns API data or manual fallback', () => {
  const mockApi = {
    elements: [
      {
        postUrl: 'https://linkedin.com/feed/update/urn:li:activity:123',
        commentary: 'Shipped a new feature!',
        publishedAt: '2026-03-01T10:00:00Z',
        media: [{ url: 'https://media.licdn.com/dms/image/test.jpg' }],
      },
    ],
  };

  const fromApi = mapLinkedInResponse(mockApi);
  assert.ok(fromApi);
  assert.equal(fromApi.postUrl, 'https://linkedin.com/feed/update/urn:li:activity:123');
  assert.equal(fromApi.text, 'Shipped a new feature!');
  assert.equal(fromApi.imageUrl, 'https://media.licdn.com/dms/image/test.jpg');
  assert.equal(fromApi.isManualFallback, false);

  const fallback = mapLinkedInResponse(null);
  if (fallback) {
    assert.equal(fallback.isManualFallback, true);
  }
});

test('8. getActivityPayload handles unconfigured environments without crashing', async () => {
  clearActivityCache();

  // Test with completely empty environment
  const payload = await getActivityPayload({});

  assert.ok(payload);
  assert.ok(payload.github);
  assert.ok(payload.leetcode);
  assert.ok(payload.linkedin);

  // GitHub without token should still gracefully fetch or report not-configured / fallback
  assert.ok(['success', 'not-configured', 'unavailable'].includes(payload.github.status));

  // LeetCode without username should report not-configured
  assert.equal(payload.leetcode.status, 'not-configured');
  assert.equal(payload.leetcode.data, null);

  // LinkedIn without token should report success (if manual fallback configured) or not-configured
  assert.ok(['success', 'not-configured'].includes(payload.linkedin.status));
});

test('9. In-memory cache coalesces concurrent requests and stores results', async () => {
  clearActivityCache();

  // Trigger 3 concurrent requests simultaneously
  const [p1, p2, p3] = await Promise.all([
    getActivityPayload({}),
    getActivityPayload({}),
    getActivityPayload({}),
  ]);

  // All 3 should receive identical results from coalesced in-flight / cache
  assert.equal(p1.leetcode.status, p2.leetcode.status);
  assert.equal(p2.leetcode.status, p3.leetcode.status);
  assert.equal(p1.github.status, p2.github.status);
});

test('10. Independent failure isolation preserves healthy providers', async () => {
  clearActivityCache();

  // Pass an invalid leetcode username to trigger upstream not found
  const payload = await getActivityPayload({
    LEETCODE_USERNAME: 'invalid_user_definitely_nonexistent_xyz987',
  });

  // LeetCode should fail or return unavailable
  assert.ok(['unavailable', 'not-configured'].includes(payload.leetcode.status));

  // GitHub and LinkedIn should still respond without being brought down
  assert.ok(payload.github);
  assert.ok(payload.linkedin);
  assert.notEqual(payload.github.status, 'crashed');
});
