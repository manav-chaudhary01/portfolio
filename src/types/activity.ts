export type ActivityProvider = 'github' | 'leetcode' | 'linkedin';

export type ActivityStatus = 'success' | 'stale' | 'loading' | 'unavailable' | 'not-configured';

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface GitHubHeatmapDay {
  date: string;
  count: number;
  level: ContributionLevel;
  weekday: number; // 0 = Sunday, 6 = Saturday
}

export interface GitHubHeatmapWeek {
  days: GitHubHeatmapDay[];
}

export interface GitHubHeatmapMonth {
  name: string;
  year: number;
  firstDay: string;
  totalWeeks: number;
}

export interface GitHubPublicEvent {
  id: string;
  type: string;
  repo: string;
  repoUrl: string;
  createdAt: string;
  detail: string;
}

export interface GitHubActivityData {
  username: string;
  totalContributions: number;
  periodLabel: string;
  weeks: GitHubHeatmapWeek[];
  months: GitHubHeatmapMonth[];
  recentEvents: GitHubPublicEvent[];
  profileUrl: string;
}

export interface LeetCodeCalendarDay {
  date: string;
  timestamp: number;
  count: number;
  level: ContributionLevel;
}

export interface LeetCodeAcceptedProblem {
  id: string;
  title: string;
  titleSlug: string;
  timestamp: number;
  url: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface LeetCodeActivityData {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  streak: number;
  totalActiveDays: number;
  activeYears: number[];
  submissionCalendar: Record<string, number>;
  calendarDays: LeetCodeCalendarDay[];
  recentAccepted: LeetCodeAcceptedProblem[];
  profileUrl: string;
}

export interface LinkedInPostData {
  postUrl: string;
  text: string;
  publishedAt?: string;
  imageUrl?: string;
  profileUrl: string;
  isManualFallback: boolean;
}

export interface ProviderResponse<T> {
  provider: ActivityProvider;
  status: ActivityStatus;
  data: T | null;
  lastFetched: string;
  cachedAt?: string;
  isStale?: boolean;
  message?: string;
}

export interface ActivityPayload {
  github: ProviderResponse<GitHubActivityData>;
  leetcode: ProviderResponse<LeetCodeActivityData>;
  linkedin: ProviderResponse<LinkedInPostData>;
}
