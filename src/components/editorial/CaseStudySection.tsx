import React from 'react';

interface CaseStudySectionProps {
  id?: string;
  tag: string;
  title: string;
  note?: string;
  children: React.ReactNode;
  className?: string;
}

export const CaseStudySection: React.FC<CaseStudySectionProps> = ({
  id,
  tag,
  title,
  note,
  children,
  className = '',
}) => {
  return (
    <section id={id} className={`py-10 sm:py-14 border-t border-border-subtle/80 ${className}`}>
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-ink-muted">
            {tag}
          </span>
          {note && (
            <span className="font-handwriting text-lg text-ink-muted hidden sm:inline select-none">
              {note}
            </span>
          )}
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl text-ink-primary tracking-tight leading-tight">
          {title}
        </h2>
      </div>

      {/* Section Body */}
      <div>{children}</div>
    </section>
  );
};
