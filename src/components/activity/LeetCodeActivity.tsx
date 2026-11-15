import React from 'react';
import { ProviderResponse, LeetCodeActivityData } from '../../types/activity';
import { ExternalLink, CheckCircle2, Clock, Code2 } from 'lucide-react';
import { LeetCodeHeatmap } from './LeetCodeHeatmap';
import { RecentAcceptedProblems } from './RecentAcceptedProblems';
import { ActivitySkeleton } from './ActivitySkeleton';
import { ActivityUnavailable } from './ActivityUnavailable';

interface LeetCodeActivityProps {
  response: ProviderResponse<LeetCodeActivityData>;
}

export const LeetCodeActivity: React.FC<LeetCodeActivityProps> = ({ response }) => {
  const { status, data, lastFetched, isStale, message } = response;

  if (status === 'loading') {
    return <ActivitySkeleton title="Loading LeetCode telemetry..." />;
  }

  if ((status === 'unavailable' || status === 'not-configured') && !data) {
    return (
      <div className="rounded-3xl border border-border-card bg-surface p-6 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
              <Code2 size={16} />
            </div>
            <span className="text-xs font-mono font-semibold text-ink-primary">
              LeetCode Telemetry
            </span>
          </div>
        </div>
        <ActivityUnavailable
          provider="leetcode"
          status={status}
          message={message}
          profileUrl="https://leetcode.com"
        />
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border-card bg-surface p-6 sm:p-7 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
              <Code2 size={15} />
            </div>
            <div>
              <span className="font-editorial text-lg text-ink-primary leading-tight block">
                LeetCode Metrics
              </span>
              <span className="text-[11px] font-mono text-ink-muted block">
                @{data?.username || 'manav'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isStale ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                <Clock size={10} />
                <span>Cached</span>
              </span>
            ) : status === 'success' ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 size={10} />
                <span>Live Sync</span>
              </span>
            ) : null}
            <a
              href={data?.profileUrl || 'https://leetcode.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted hover:text-ink-primary transition-colors p-1"
              aria-label="View Manav on LeetCode"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Problem Stats Strip */}
        <div className="grid grid-cols-4 gap-2 mb-6 text-center">
          <div className="p-2.5 rounded-2xl bg-surface-subtle/60 border border-border-subtle/60">
            <span className="block text-xl font-bold font-mono text-ink-primary">
              {data?.totalSolved ?? 0}
            </span>
            <span className="text-[9px] font-mono uppercase text-ink-muted">Total</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60">
            <span className="block text-xl font-bold font-mono text-emerald-700">
              {data?.easySolved ?? 0}
            </span>
            <span className="text-[9px] font-mono uppercase text-emerald-600">Easy</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-amber-50/60 border border-amber-200/60">
            <span className="block text-xl font-bold font-mono text-amber-700">
              {data?.mediumSolved ?? 0}
            </span>
            <span className="text-[9px] font-mono uppercase text-amber-600">Med</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-rose-50/60 border border-rose-200/60">
            <span className="block text-xl font-bold font-mono text-rose-700">
              {data?.hardSolved ?? 0}
            </span>
            <span className="text-[9px] font-mono uppercase text-rose-600">Hard</span>
          </div>
        </div>

        {/* Heatmap Section */}
        {data?.calendarDays && data.calendarDays.length > 0 && (
          <div className="mb-6">
            <LeetCodeHeatmap
              calendarDays={data.calendarDays}
              streak={data.streak}
              totalActiveDays={data.totalActiveDays}
            />
          </div>
        )}

        {/* Recent Accepted Problems */}
        {data?.recentAccepted && data.recentAccepted.length > 0 && (
          <RecentAcceptedProblems problems={data.recentAccepted} />
        )}
      </div>

      {/* Footer Timestamp */}
      <div className="mt-6 pt-3 border-t border-border-subtle/60 flex items-center justify-between text-[10px] font-mono text-ink-muted">
        <span>Source: leetcode.com/graphql</span>
        <span>
          {lastFetched
            ? `Refreshed ${new Date(lastFetched).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
            : 'Static Fallback'}
        </span>
      </div>
    </div>
  );
};
