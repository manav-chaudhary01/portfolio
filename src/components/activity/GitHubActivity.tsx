import React from 'react';
import { ProviderResponse, GitHubActivityData } from '../../types/activity';
import { GithubIcon } from '../icons/GithubIcon';
import { ExternalLink, CheckCircle2, Clock } from 'lucide-react';
import { GitHubHeatmap } from './GitHubHeatmap';
import { RecentActivity } from './RecentActivity';
import { ActivitySkeleton } from './ActivitySkeleton';
import { ActivityUnavailable } from './ActivityUnavailable';

interface GitHubActivityProps {
  response: ProviderResponse<GitHubActivityData>;
}

export const GitHubActivity: React.FC<GitHubActivityProps> = ({ response }) => {
  const { status, data, lastFetched, isStale, message } = response;

  if (status === 'loading') {
    return <ActivitySkeleton title="Loading GitHub telemetry..." />;
  }

  if (status === 'unavailable' && !data) {
    return (
      <div className="rounded-3xl border border-border-card bg-surface p-6 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <GithubIcon size={16} />
            <span className="text-xs font-mono font-semibold text-ink-primary">GitHub</span>
          </div>
        </div>
        <ActivityUnavailable
          provider="github"
          status="unavailable"
          message={message}
          profileUrl="https://github.com/manav-chaudhary01"
        />
      </div>
    );
  }

  const hasCalendar = Boolean(data?.weeks && data.weeks.length > 0);

  return (
    <div className="rounded-3xl border border-border-card bg-surface p-6 sm:p-7 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-surface-subtle flex items-center justify-center text-ink-primary">
              <GithubIcon size={15} />
            </div>
            <div>
              <span className="font-editorial text-lg text-ink-primary leading-tight block">
                GitHub Presence
              </span>
              <span className="text-[11px] font-mono text-ink-muted block">
                @{data?.username || 'manav-chaudhary01'}
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
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-ink-muted bg-surface-subtle px-2 py-0.5 rounded-full border border-border-subtle">
                Public Events
              </span>
            )}
            <a
              href={data?.profileUrl || 'https://github.com/manav-chaudhary01'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted hover:text-ink-primary transition-colors p-1"
              aria-label="View Manav on GitHub"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Heatmap Section */}
        {hasCalendar ? (
          <div className="mb-6">
            <GitHubHeatmap
              weeks={data!.weeks}
              months={data!.months}
              totalContributions={data!.totalContributions}
            />
          </div>
        ) : (
          <div className="mb-6 p-4 rounded-2xl bg-surface-subtle/50 border border-border-subtle text-xs text-ink-secondary font-sans leading-relaxed">
            <p className="font-medium text-ink-primary mb-1">
              Live Public Event Stream Active
            </p>
            <p className="text-[11px] text-ink-muted">
              Displaying recent public repository actions directly from GitHub REST API.
            </p>
          </div>
        )}

        {/* Recent Public Events */}
        {data?.recentEvents && data.recentEvents.length > 0 && (
          <RecentActivity events={data.recentEvents} />
        )}
      </div>

      {/* Footer Timestamp */}
      <div className="mt-6 pt-3 border-t border-border-subtle/60 flex items-center justify-between text-[10px] font-mono text-ink-muted">
        <span>Source: api.github.com</span>
        <span>
          {lastFetched
            ? `Refreshed ${new Date(lastFetched).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
            : 'Static Fallback'}
        </span>
      </div>
    </div>
  );
};
