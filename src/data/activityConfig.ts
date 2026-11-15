/**
 * Activity & Social Presence Configuration.
 * Centralizes verified handles, upstream endpoints, and caching rules.
 */
export const ACTIVITY_CONFIG = {
  github: {
    username: 'manav-chaudhary01',
    profileUrl: 'https://github.com/manav-chaudhary01',
    graphqlEndpoint: 'https://api.github.com/graphql',
    restEventsEndpoint: 'https://api.github.com/users/manav-chaudhary01/events/public',
    cacheTtlMinutes: 15,
  },
  leetcode: {
    // Configurable LeetCode handle. Set via environment variable LEETCODE_USERNAME
    // or configure directly below.
    username: 'manav_chaudhary01',
    profileUrl: 'https://leetcode.com/u/manav_chaudhary01/',
    graphqlEndpoint: 'https://leetcode.com/graphql',
    cacheTtlMinutes: 15,
  },
  linkedin: {
    profileUrl: 'https://www.linkedin.com/in/manav-chaudhary13/',
    cacheTtlMinutes: 30,
  },
};
