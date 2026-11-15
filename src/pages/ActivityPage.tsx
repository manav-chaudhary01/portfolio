import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Grid, User } from 'lucide-react';
import { ElsewhereSection } from '../components/activity/ElsewhereSection';

export const ActivityPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="flex-1 flex flex-col w-full max-w-4xl mx-auto py-6 sm:py-10 animate-in fade-in duration-300">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between mb-8 sm:mb-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink-muted hover:text-ink-primary transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue py-1.5"
          aria-label="Return to home page"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          <span>Back to corner</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-surface border border-border-subtle shadow-xs text-xs font-medium text-ink-muted">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span>Live Telemetry</span>
          <span className="text-border-subtle">•</span>
          <span>Elsewhere</span>
        </div>
      </div>

      {/* Main Elsewhere Activity Section */}
      <ElsewhereSection id="activity-main" className="!border-t-0 !py-0" />

      {/* Cross-Page Bottom Navigation */}
      <nav
        aria-label="Cross-section navigation"
        className="mt-16 pt-10 border-t border-border-subtle/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
      >
        <Link
          to="/"
          className="flex-1 flex items-center gap-3 p-4 rounded-2xl bg-surface border border-border-card shadow-xs hover:border-border-subtle hover:shadow-sm transition-all duration-200 group text-left"
        >
          <div className="w-8 h-8 rounded-full bg-surface-subtle flex items-center justify-center shrink-0 group-hover:-translate-x-1 transition-transform">
            <Grid size={14} className="text-ink-secondary" />
          </div>
          <div className="min-w-0">
            <span className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
              Project Archive
            </span>
            <span className="font-editorial text-lg text-ink-primary truncate block">
              Selected Work
            </span>
          </div>
        </Link>

        <Link
          to="/about"
          className="flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl bg-surface border border-border-card shadow-xs hover:border-border-subtle hover:shadow-sm transition-all duration-200 group text-center"
        >
          <div className="w-8 h-8 rounded-full bg-surface-subtle flex items-center justify-center shrink-0">
            <User size={14} className="text-blue-500" />
          </div>
          <div className="min-w-0 text-left">
            <span className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
              Bio & Story
            </span>
            <span className="font-editorial text-lg text-ink-primary truncate block">
              About Manav
            </span>
          </div>
        </Link>

        <Link
          to="/playground"
          className="flex-1 flex items-center justify-end gap-3 p-4 rounded-2xl bg-surface border border-border-card shadow-xs hover:border-border-subtle hover:shadow-sm transition-all duration-200 group text-right"
        >
          <div className="min-w-0">
            <span className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
              Interactive Sandbox
            </span>
            <span className="font-editorial text-lg text-ink-primary truncate block">
              The Playground
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-surface-subtle flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
            <ArrowRight size={14} className="text-ink-secondary" />
          </div>
        </Link>
      </nav>
    </main>
  );
};
