import React from 'react';
import { GitHubPublicEvent } from '../../types/activity';
import { GitCommit, GitPullRequest, FolderPlus, Star, Activity } from 'lucide-react';

interface RecentActivityProps {
  events: GitHubPublicEvent[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="py-3 text-center text-xs font-mono text-ink-muted">
        No recent public events recorded.
      </div>
    );
  }

  const renderIcon = (type: string) => {
    switch (type) {
      case 'PushEvent':
        return <GitCommit size={13} className="text-emerald-600" />;
      case 'PullRequestEvent':
        return <GitPullRequest size={13} className="text-blue-600" />;
      case 'CreateEvent':
        return <FolderPlus size={13} className="text-amber-600" />;
      case 'WatchEvent':
        return <Star size={13} className="text-yellow-600" />;
      default:
        return <Activity size={13} className="text-ink-muted" />;
    }
  };

  const formatRelativeDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const diffDays = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 30) return `${diffDays}d ago`;
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  return (
    <div className="space-y-2">
      <span className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-muted mb-2">
        Recent Public GitHub Activity
      </span>
      <div className="divide-y divide-border-subtle/60 rounded-2xl bg-surface-subtle/30 border border-border-subtle/60 overflow-hidden">
        {events.map((e) => (
          <div
            key={e.id}
            className="p-3 flex items-center justify-between gap-3 text-xs font-sans hover:bg-surface-subtle/60 transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-surface border border-border-subtle flex items-center justify-center shrink-0">
                {renderIcon(e.type)}
              </div>
              <div className="min-w-0">
                <a
                  href={e.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink-primary hover:text-accent-blue truncate block hover:underline font-mono"
                >
                  {e.repo}
                </a>
                <span className="text-[11px] text-ink-secondary truncate block">
                  {e.detail}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-ink-muted shrink-0">
              {formatRelativeDate(e.createdAt)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
