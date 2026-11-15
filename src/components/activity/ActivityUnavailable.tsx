import React from 'react';
import { ExternalLink, Info, AlertCircle } from 'lucide-react';

interface ActivityUnavailableProps {
  provider: 'github' | 'leetcode' | 'linkedin';
  status: 'unavailable' | 'not-configured' | 'stale';
  message?: string;
  profileUrl: string;
  className?: string;
}

export const ActivityUnavailable: React.FC<ActivityUnavailableProps> = ({
  provider,
  status,
  message,
  profileUrl,
  className = '',
}) => {
  const providerLabel =
    provider === 'github' ? 'GitHub' : provider === 'leetcode' ? 'LeetCode' : 'LinkedIn';

  const isNotConfigured = status === 'not-configured';

  return (
    <div
      className={`rounded-2xl bg-surface-subtle/60 border border-border-subtle p-5 text-left flex flex-col justify-between gap-4 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-surface border border-border-subtle flex items-center justify-center shrink-0 text-ink-muted">
          {isNotConfigured ? <Info size={16} /> : <AlertCircle size={16} />}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-ink-primary font-sans">
            {isNotConfigured
              ? `${providerLabel} Live Sync Not Configured`
              : `${providerLabel} Live Telemetry Temporarily Unavailable`}
          </h4>
          <p className="text-xs text-ink-secondary leading-relaxed font-sans mt-1">
            {message ||
              `Unable to synchronize live public metrics from ${providerLabel}. Real-time statistics may be unavailable or rate-limited.`}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-border-subtle/80 flex items-center justify-between">
        <span className="text-[10px] font-mono text-ink-muted">
          {isNotConfigured ? 'SETUP REQUIRED' : 'OFFLINE MODE'}
        </span>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-primary hover:text-accent-blue transition-colors"
        >
          <span>Visit {providerLabel} Directly</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
};
