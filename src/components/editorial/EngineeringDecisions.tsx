import React from 'react';
import { EngineeringDecision } from '../../types';

interface EngineeringDecisionsProps {
  decisions: EngineeringDecision[];
  accentColor: string;
}

export const EngineeringDecisions: React.FC<EngineeringDecisionsProps> = ({
  decisions,
  accentColor,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:gap-8">
      {decisions.map((item, index) => (
        <div
          key={index}
          className="rounded-3xl border border-border-card bg-surface p-6 sm:p-8 shadow-xs hover:border-border-subtle transition-all duration-200"
        >
          {/* Decision Header */}
          <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-border-subtle">
            <div className="flex items-center gap-3">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: accentColor }}
                aria-hidden="true"
              />
              <h3 className="font-editorial text-2xl sm:text-3xl text-ink-primary tracking-tight">
                {item.title}
              </h3>
            </div>
            <span className="font-mono text-xs text-ink-muted shrink-0">
              0{index + 1}
            </span>
          </div>

          {/* Core Decision Summary */}
          <div className="mb-6 p-4 rounded-2xl bg-surface-subtle/60 border border-border-subtle/50">
            <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-muted mb-1">
              Core Architectural Decision
            </span>
            <p className="text-sm sm:text-base font-medium text-ink-primary font-sans leading-snug">
              {item.decision}
            </p>
          </div>

          {/* Three-Column Deep-Dive Breakdown (Reason -> Implementation -> Tradeoff) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left">
            <div>
              <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-muted mb-1">
                The Why (Reason)
              </span>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
                {item.reason}
              </p>
            </div>

            <div>
              <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-muted mb-1">
                Implementation Detail
              </span>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
                {item.implementation}
              </p>
            </div>

            <div>
              <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-700/80 mb-1">
                Trade-off Evaluated
              </span>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
                {item.tradeoff}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
