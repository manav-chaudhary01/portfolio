import { LinkedInPostData } from '../types/activity.js';
import { ACTIVITY_CONFIG } from './activityConfig.js';

export interface ManualLinkedInPostConfig {
  postUrl?: string;
  text?: string;
  publishedAt?: string;
  imageUrl?: string;
}

/**
 * Single latest LinkedIn post manual configuration.
 *
 * If official LinkedIn API access is not available (which requires approved
 * r_member_social partner permissions), this file serves as the single source
 * of truth for Manav's latest post.
 *
 * Leave fields undefined or empty if no specific post is configured; the UI
 * will gracefully display a restrained direct profile invitation instead of
 * fabricating post content.
 */
export const MANUAL_LINKEDIN_POST: ManualLinkedInPostConfig = {
  // Example configuration:
  // postUrl: 'https://linkedin.com/posts/...',
  // text: 'Reflecting on building MeterFlow: why usage billing systems need arbitrary-precision math...',
  // publishedAt: '2026-11-12T10:00:00Z',
  // imageUrl: undefined,
};

export function getManualLinkedInPost(): LinkedInPostData | null {
  if (!MANUAL_LINKEDIN_POST.postUrl || !MANUAL_LINKEDIN_POST.text) {
    return null;
  }

  return {
    postUrl: MANUAL_LINKEDIN_POST.postUrl,
    text: MANUAL_LINKEDIN_POST.text,
    publishedAt: MANUAL_LINKEDIN_POST.publishedAt || new Date().toISOString(),
    imageUrl: MANUAL_LINKEDIN_POST.imageUrl,
    profileUrl: ACTIVITY_CONFIG.linkedin.profileUrl,
    isManualFallback: true,
  };
}
