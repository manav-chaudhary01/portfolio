import React, { useEffect, useState } from 'react';
import { ActivityPayload } from '../../types/activity';
import { fetchActivityData } from '../../services/activityApi';
import { GitHubActivity } from './GitHubActivity';
import { LeetCodeActivity } from './LeetCodeActivity';
import { LatestLinkedInPost } from './LatestLinkedInPost';
import { ActivitySkeleton } from './ActivitySkeleton';

interface ElsewhereSectionProps {
  id?: string;
  className?: string;
}

export const ElsewhereSection: React.FC<ElsewhereSectionProps> = ({
  id = 'elsewhere',
  className = '',
}) => {
  const [payload, setPayload] = useState<ActivityPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchActivityData()
      .then((data) => {
        if (isMounted) {
          setPayload(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('[ElsewhereSection] Unexpected fetch error:', err);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id={id} className={`w-full py-12 sm:py-16 border-t border-border-subtle/80 ${className}`}>
      {/* Section Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-ink-muted">
            Elsewhere // Live Telemetry
          </span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl text-ink-primary tracking-tight leading-tight">
          Live Activity & Social Presence
        </h2>
        <p className="text-sm sm:text-base text-ink-secondary font-sans leading-relaxed mt-2 max-w-2xl">
          Verified open-source commits, algorithm practice telemetry, and professional notes pulled from upstream APIs.
        </p>
      </div>

      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivitySkeleton title="Loading GitHub..." />
            <ActivitySkeleton title="Loading LeetCode..." />
          </div>
          <ActivitySkeleton title="Loading LinkedIn..." />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top 2 Primary Activity Panels: GitHub & LeetCode */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {payload?.github && <GitHubActivity response={payload.github} />}
            {payload?.leetcode && <LeetCodeActivity response={payload.leetcode} />}
          </div>

          {/* Bottom Card: Single Latest LinkedIn Dispatch */}
          {payload?.linkedin && <LatestLinkedInPost response={payload.linkedin} />}
        </div>
      )}
    </section>
  );
};
