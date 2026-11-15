import React from 'react';
import { ABOUT_DATA } from '../../data/about';

export const PersonalDetailsSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 border-t border-border-subtle/80">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-ink-muted">
          04 / Current Context
        </span>
        <span className="font-handwriting text-lg text-ink-muted select-none">
          the human side
        </span>
      </div>

      <h2 className="font-editorial text-3xl sm:text-4xl text-ink-primary tracking-tight mb-8">
        Personal Details & Working Preferences
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ABOUT_DATA.personalDetails.map((detail, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-surface border border-border-card shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-subtle">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
                  {detail.label}
                </span>
                {detail.note && (
                  <span className="font-handwriting text-sm text-accent-blue">
                    {detail.note}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-ink-primary font-sans leading-relaxed">
                {detail.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
