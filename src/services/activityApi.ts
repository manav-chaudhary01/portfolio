import { ActivityPayload } from '../types/activity';
import { getManualLinkedInPost } from '../data/latestLinkedInPost';

/**
 * Client service to retrieve normalized activity data.
 * Calls /api/activity and handles fallback states gracefully if the backend is unreachable.
 */
export async function fetchActivityData(): Promise<ActivityPayload> {
  const now = new Date().toISOString();

  try {
    const res = await fetch('/api/activity', {
      headers: {
        Accept: 'application/json',
      },
    });

    if (res.ok) {
      const payload: ActivityPayload = await res.json();
      return payload;
    }
  } catch (err) {
    console.warn('[ActivityAPI] Unable to reach /api/activity endpoint. Falling back to offline client defaults.', err);
  }

  // Fallback payload if /api/activity is unreachable (e.g. pure static preview or network drop)
  const manualLinkedIn = getManualLinkedInPost();

  return {
    github: {
      provider: 'github',
      status: 'unavailable',
      data: null,
      lastFetched: now,
      message: 'Activity service unreachable. Visit GitHub directly to view recent repositories and activity.',
    },
    leetcode: {
      provider: 'leetcode',
      status: 'not-configured',
      data: null,
      lastFetched: now,
      message: 'LeetCode handle is not configured. Set LEETCODE_USERNAME in server environment.',
    },
    linkedin: {
      provider: 'linkedin',
      status: manualLinkedIn ? 'success' : 'not-configured',
      data: manualLinkedIn,
      lastFetched: now,
      message: manualLinkedIn ? 'Displaying latest configured post.' : 'No post configured.',
    },
  };
}
