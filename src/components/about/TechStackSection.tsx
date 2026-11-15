import React from 'react';
import { ABOUT_DATA } from '../../data/about';

export const TechStackSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 border-t border-border-subtle/80">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-ink-muted">
          03 / Verified Toolkit
        </span>
        <span className="font-handwriting text-lg text-ink-muted select-none">
          tested in real code
        </span>
      </div>

      <h2 className="font-editorial text-3xl sm:text-4xl text-ink-primary tracking-tight mb-2">
        Technologies & Core Systems
      </h2>
      <p className="text-sm text-ink-secondary font-sans mb-8">
        No arbitrary percentage meters. Every tool below is actively implemented and verified across real repositories.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ABOUT_DATA.techStack.map((group, gIdx) => (
          <div
            key={gIdx}
            className="rounded-3xl border border-border-card bg-surface p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="pb-3 border-b border-border-subtle mb-4">
                <h3 className="font-editorial text-2xl text-ink-primary">
                  {group.category}
                </h3>
                <p className="text-xs text-ink-muted mt-0.5 font-sans">
                  {group.description}
                </p>
              </div>

              <div className="space-y-3">
                {group.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-surface-subtle/50 border border-border-subtle/60 text-xs font-sans"
                  >
                    <span className="font-semibold text-ink-primary font-mono">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono text-ink-muted bg-surface px-2 py-0.5 rounded border border-border-subtle shrink-0">
                      {item.verifiedIn}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
