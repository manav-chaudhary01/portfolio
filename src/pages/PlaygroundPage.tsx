import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Grid, User, Sparkles } from 'lucide-react';
import { PLAYGROUND_EXPERIMENTS } from '../data/playground';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ExperimentCard } from '../components/playground/ExperimentCard';

export const PlaygroundPage: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

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
          <Sparkles size={12} className="text-accent-amber" />
          <span>Interactive Sandbox</span>
          <span className="text-border-subtle">•</span>
          <span>{PLAYGROUND_EXPERIMENTS.length} Entries</span>
        </div>
      </div>

      {/* Editorial Hero */}
      <header className="mb-10 sm:mb-14">
        <div className="mb-3">
          <span className="font-handwriting text-2xl text-accent-amber select-none">
            experiments & curiosities ✦
          </span>
        </div>

        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-editorial text-4xl sm:text-6xl md:text-7xl text-ink-primary tracking-tight leading-[1.05] mb-4 text-balance"
        >
          The Playground
        </motion.h1>

        <p className="text-lg sm:text-2xl text-ink-secondary font-sans font-normal leading-relaxed text-balance max-w-2xl">
          Small experiments, strange ideas, and things worth building just to see if they work.
        </p>
      </header>

      {/* Experiment Grid */}
      <section aria-label="Experiment collection" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PLAYGROUND_EXPERIMENTS.map((experiment) => (
          <ExperimentCard key={experiment.slug} experiment={experiment} />
        ))}
      </section>

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
          to="/contact"
          className="flex-1 flex items-center justify-end gap-3 p-4 rounded-2xl bg-surface border border-border-card shadow-xs hover:border-border-subtle hover:shadow-sm transition-all duration-200 group text-right"
        >
          <div className="min-w-0">
            <span className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
              Get in Touch
            </span>
            <span className="font-editorial text-lg text-ink-primary truncate block">
              Say Hello
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
