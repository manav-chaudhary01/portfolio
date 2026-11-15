import React from 'react';
import { ABOUT_DATA } from '../../data/about';
import { Check } from 'lucide-react';

export const FocusAreas: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 border-t border-border-subtle/80">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-ink-muted">
          02 / Areas of Focus
        </span>
        <span className="font-handwriting text-lg text-ink-muted select-none">
          where I spend time
        </span>
      </div>

      <h2 className="font-editorial text-3xl sm:text-4xl text-ink-primary tracking-tight mb-8">
        Current Systems & Domain Explorations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {ABOUT_DATA.focusAreas.map((area) => (
          <div
            key={area.id}
            className="rounded-3xl border border-border-card bg-surface p-6 sm:p-7 shadow-xs hover:border-border-subtle transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-border-subtle">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
                  {area.subtitle}
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: area.accentColor }}
                  aria-hidden="true"
                />
              </div>

              <h3 className="font-editorial text-2xl text-ink-primary tracking-tight mb-2">
                {area.title}
              </h3>

              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans mb-5">
                {area.description}
              </p>
            </div>

            <div className="pt-4 border-t border-border-subtle/70">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-ink-muted mb-2">
                Key Principles & Tools
              </span>
              <ul className="space-y-1.5">
                {area.keyAspects.map((aspect, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-xs font-sans text-ink-primary"
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 text-surface text-[8px]"
                      style={{ backgroundColor: area.accentColor }}
                    >
                      <Check size={8} strokeWidth={3} />
                    </div>
                    <span>{aspect}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
