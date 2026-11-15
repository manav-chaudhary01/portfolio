import React from 'react';
import { ABOUT_DATA } from '../../data/about';

export const AboutStory: React.FC = () => {
  const { story } = ABOUT_DATA;

  return (
    <section className="py-10 sm:py-14 border-t border-border-subtle/80">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-ink-muted">
          01 / Core Philosophy
        </span>
        <span className="font-handwriting text-lg text-ink-muted select-none">
          how I think ✦
        </span>
      </div>

      <h2 className="font-editorial text-3xl sm:text-4xl text-ink-primary tracking-tight mb-8">
        Engineering with craft, rigor, and intent.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-ink-secondary font-sans leading-relaxed text-sm sm:text-base">
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-primary mb-2">
              What I Build
            </h3>
            <p>{story.whatIBuild}</p>
          </div>

          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-primary mb-2">
              Problems That Interest Me
            </h3>
            <p>{story.problemSpaces}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-primary mb-2">
              How I Approach Software
            </h3>
            <p>{story.approach}</p>
          </div>

          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-primary mb-2">
              What I'm Exploring
            </h3>
            <p>{story.exploring}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
