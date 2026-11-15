import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectSlug } from '../../types';
import { PROJECT_LIST } from '../../data/projects';
import { ArrowLeft, ArrowRight, Grid } from 'lucide-react';

interface ProjectNavigationProps {
  currentSlug: ProjectSlug;
}

export const ProjectNavigation: React.FC<ProjectNavigationProps> = ({ currentSlug }) => {
  const currentIndex = PROJECT_LIST.findIndex((p) => p.slug === currentSlug);

  // Compute circular prev/next
  const prevProject =
    currentIndex > 0
      ? PROJECT_LIST[currentIndex - 1]
      : PROJECT_LIST[PROJECT_LIST.length - 1];

  const nextProject =
    currentIndex < PROJECT_LIST.length - 1
      ? PROJECT_LIST[currentIndex + 1]
      : PROJECT_LIST[0];

  return (
    <nav
      aria-label="Case study navigation"
      className="mt-16 pt-10 border-t border-border-subtle/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
    >
      {/* Previous Project */}
      <Link
        to={`/work/${prevProject.slug}`}
        className="flex-1 flex items-center gap-3 p-4 rounded-2xl bg-surface border border-border-card shadow-xs hover:border-border-subtle hover:shadow-sm transition-all duration-200 group text-left"
      >
        <div className="w-8 h-8 rounded-full bg-surface-subtle flex items-center justify-center shrink-0 group-hover:-translate-x-1 transition-transform">
          <ArrowLeft size={16} className="text-ink-secondary" />
        </div>
        <div className="min-w-0">
          <span className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
            Previous Project
          </span>
          <span className="font-editorial text-lg text-ink-primary truncate block">
            {prevProject.title}
          </span>
        </div>
      </Link>

      {/* Center: Back to Work Overview */}
      <Link
        to="/"
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-surface-subtle hover:bg-surface-hover text-xs font-semibold uppercase tracking-wider text-ink-secondary hover:text-ink-primary transition-colors border border-border-subtle"
        aria-label="Return to corner overview"
      >
        <Grid size={14} />
        <span>All Work</span>
      </Link>

      {/* Next Project */}
      <Link
        to={`/work/${nextProject.slug}`}
        className="flex-1 flex items-center justify-end gap-3 p-4 rounded-2xl bg-surface border border-border-card shadow-xs hover:border-border-subtle hover:shadow-sm transition-all duration-200 group text-right"
      >
        <div className="min-w-0">
          <span className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
            Next Project
          </span>
          <span className="font-editorial text-lg text-ink-primary truncate block">
            {nextProject.title}
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-surface-subtle flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
          <ArrowRight size={16} className="text-ink-secondary" />
        </div>
      </Link>
    </nav>
  );
};
