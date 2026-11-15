import React from 'react';
import { FeatureShowcaseItem } from '../../types';
import { Check } from 'lucide-react';

interface FeatureShowcaseProps {
  features: FeatureShowcaseItem[];
  accentColor: string;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  features,
  accentColor,
}) => {
  return (
    <div className="space-y-10 sm:space-y-12">
      {features.map((feature, index) => (
        <div
          key={index}
          className="rounded-3xl border border-border-card bg-surface p-6 sm:p-8 shadow-xs"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-border-subtle">
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
                {feature.subtitle}
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-ink-primary tracking-tight mt-0.5">
                {feature.title}
              </h3>
            </div>
            {feature.badge && (
              <span
                className="self-start sm:self-auto text-xs font-semibold px-3 py-1 rounded-pill text-surface shadow-xs"
                style={{ backgroundColor: accentColor }}
              >
                {feature.badge}
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed font-sans mb-6">
            {feature.description}
          </p>

          {/* Verified Code Excerpt Block */}
          {feature.codeSnippet && (
            <div className="my-6 rounded-2xl overflow-hidden border border-neutral-800 bg-[#161B22] text-[#E6EDF3] shadow-md">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0D1117] border-b border-neutral-800 text-xs font-mono text-neutral-400">
                <span className="truncate">{feature.codeSnippet.filename}</span>
                <span className="uppercase text-[10px] tracking-wider text-neutral-500">
                  {feature.codeSnippet.language}
                </span>
              </div>
              <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
                <pre>
                  <code>{feature.codeSnippet.code}</code>
                </pre>
              </div>
              {feature.codeSnippet.caption && (
                <div className="px-4 py-2 bg-[#0D1117]/60 border-t border-neutral-800 text-[11px] font-sans text-neutral-400">
                  {feature.codeSnippet.caption}
                </div>
              )}
            </div>
          )}

          {/* Key Takeaways */}
          <div className="mt-6 pt-4 border-t border-border-subtle/80">
            <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-muted mb-3">
              Verified Implementation Highlights
            </span>
            <ul className="space-y-2">
              {feature.keyTakeaways.map((takeaway, tIndex) => (
                <li
                  key={tIndex}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-secondary font-sans"
                >
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-surface text-[10px]"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Check size={10} strokeWidth={3} />
                  </div>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
