import React from 'react';
import { TestingReport } from '../../types';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface TestingCardProps {
  testing: TestingReport;
  accentColor: string;
}

export const TestingCard: React.FC<TestingCardProps> = ({ testing, accentColor }) => {
  return (
    <div className="rounded-3xl border border-border-card bg-surface p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-surface shadow-xs shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            <ShieldCheck size={20} />
          </div>
          <div>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
              Quality Assurance Harness
            </span>
            <h3 className="font-editorial text-2xl text-ink-primary tracking-tight">
              {testing.framework}
            </h3>
          </div>
        </div>

        {testing.testCount !== undefined && (
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="px-4 py-2 rounded-2xl bg-surface-subtle border border-border-subtle text-center">
              <span className="block text-2xl font-bold font-mono text-ink-primary leading-none">
                {testing.testCount}
              </span>
              <span className="text-[10px] font-mono uppercase text-ink-muted mt-1 block">
                Passing Tests
              </span>
            </div>
            {testing.suiteCount !== undefined && (
              <div className="px-4 py-2 rounded-2xl bg-surface-subtle border border-border-subtle text-center">
                <span className="block text-2xl font-bold font-mono text-ink-primary leading-none">
                  {testing.suiteCount}
                </span>
                <span className="text-[10px] font-mono uppercase text-ink-muted mt-1 block">
                  Test Suites
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="mt-6 text-sm sm:text-base text-ink-secondary leading-relaxed font-sans">
        {testing.description}
      </p>

      {/* Verified Traits */}
      <div className="mt-6 pt-6 border-t border-border-subtle/80">
        <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-muted mb-3">
          Empirically Verified Reliability Behaviors
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {testing.verifiedTraits.map((trait, index) => (
            <div
              key={index}
              className="flex items-start gap-2.5 p-3 rounded-2xl bg-surface-subtle/40 border border-border-subtle/50 text-xs sm:text-sm text-ink-secondary font-sans"
            >
              <CheckCircle2
                size={16}
                className="shrink-0 mt-0.5 text-emerald-600"
              />
              <span>{trait}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
