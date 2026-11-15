import React from 'react';
import { ArchitectureDataFlowStep } from '../../types';

interface ArchitectureFlowProps {
  title: string;
  subtitle: string;
  steps: ArchitectureDataFlowStep[];
  accentColor: string;
}

export const ArchitectureFlow: React.FC<ArchitectureFlowProps> = ({
  title,
  subtitle,
  steps,
  accentColor,
}) => {
  return (
    <div className="rounded-3xl border border-border-card bg-surface p-6 sm:p-8 shadow-xs">
      <div className="mb-6 pb-4 border-b border-border-subtle">
        <h3 className="text-base sm:text-lg font-semibold text-ink-primary font-sans">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted mt-0.5 font-sans">
          {subtitle}
        </p>
      </div>

      <div className="relative space-y-6 sm:space-y-8">
        {/* Continuous vertical connector line on desktop */}
        <div
          className="hidden sm:block absolute left-5 top-4 bottom-8 w-0.5 bg-border-subtle"
          aria-hidden="true"
        />

        {steps.map((item, index) => (
          <div key={index} className="relative flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
            {/* Step Indicator Badge */}
            <div className="flex items-center gap-3 sm:flex-col sm:gap-0 sm:shrink-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold text-surface shadow-xs z-10 shrink-0"
                style={{ backgroundColor: accentColor }}
              >
                {item.step}
              </div>
              <span className="sm:hidden text-xs font-mono font-semibold uppercase tracking-wider text-ink-muted">
                {item.component}
              </span>
            </div>

            {/* Step Detail Card */}
            <div className="flex-1 bg-surface-subtle/50 rounded-2xl p-4 sm:p-5 border border-border-subtle/60">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <h4 className="text-sm sm:text-base font-semibold text-ink-primary font-sans">
                  {item.title}
                </h4>
                <span className="hidden sm:inline-block text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-muted bg-surface px-2 py-0.5 rounded border border-border-subtle">
                  {item.component}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
