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
    // or configure directly below. Default left empty to prevent fabricating statistics.
    username: '',
    profileUrl: 'https://leetcode.com',
    graphqlEndpoint: 'https://leetcode.com/graphql',
    cacheTtlMinutes: 15,
  },
  linkedin: {
    profileUrl: 'https://linkedin.com/in/manav-chaudhary',
    cacheTtlMinutes: 30,
  },
};
