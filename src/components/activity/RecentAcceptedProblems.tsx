import React from 'react';
import { LeetCodeAcceptedProblem } from '../../types/activity';
import { ExternalLink, CheckCircle } from 'lucide-react';

interface RecentAcceptedProblemsProps {
  problems: LeetCodeAcceptedProblem[];
}

export const RecentAcceptedProblems: React.FC<RecentAcceptedProblemsProps> = ({ problems }) => {
  if (!problems || problems.length === 0) {
    return (
      <div className="py-3 text-center text-xs font-mono text-ink-muted">
        No recent accepted problems available.
      </div>
    );
  }

  const formatRelativeDate = (timestamp: number) => {
    try {
      const date = new Date(timestamp * 1000);
      const diffDays = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 30) return `${diffDays}d ago`;
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  const getDifficultyBadge = (difficulty?: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Medium':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Hard':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      default:
        return 'text-ink-muted bg-surface-subtle border-border-subtle';
    }
  };

  return (
    <div className="space-y-2">
      <span className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-muted mb-2">
        Recent Accepted Submissions
      </span>
      <div className="divide-y divide-border-subtle/60 rounded-2xl bg-surface-subtle/30 border border-border-subtle/60 overflow-hidden">
        {problems.map((p) => (
          <div
            key={p.id}
            className="p-3 flex items-center justify-between gap-3 text-xs font-sans hover:bg-surface-subtle/60 transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <CheckCircle size={14} className="text-emerald-600 shrink-0" />
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink-primary hover:text-amber-600 truncate block hover:underline font-sans"
              >
                {p.title}
              </a>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {p.difficulty && (
                <span
                  className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded border ${getDifficultyBadge(
                    p.difficulty
                  )}`}
                >
                  {p.difficulty}
                </span>
              )}
              <span className="text-[10px] font-mono text-ink-muted">
                {formatRelativeDate(p.timestamp)}
              </span>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted hover:text-ink-primary transition-colors p-0.5"
                aria-label={`Open problem ${p.title} on LeetCode`}
              >
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
