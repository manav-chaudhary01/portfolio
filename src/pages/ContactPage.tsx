import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Grid, User, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../components/icons/GithubIcon';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ContactVisual } from '../components/contact/ContactVisual';
import { CopyEmailButton } from '../components/contact/CopyEmailButton';

export const ContactPage: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const primaryEmail = 'manav.chaudhary1303@gmail.com';

  return (
    <main className="flex-1 flex flex-col w-full max-w-3xl mx-auto py-6 sm:py-10 animate-in fade-in duration-300">
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
          <span>Available for Opportunities</span>
          <span className="text-border-subtle">•</span>
          <span>2026</span>
        </div>
      </div>

      {/* Editorial Hero */}
      <header className="mb-10 sm:mb-12">
        <div className="mb-3">
          <span className="font-handwriting text-2xl text-accent-blue select-none">
            say hello ✎
          </span>
        </div>

        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-editorial text-4xl sm:text-6xl md:text-7xl text-ink-primary tracking-tight leading-[1.05] mb-4 text-balance"
        >
          Let's talk.
        </motion.h1>

        <p className="text-lg sm:text-2xl text-ink-secondary font-sans font-normal leading-relaxed text-balance max-w-2xl mb-8">
          If you want to talk about a software engineering role, collaboration, distributed systems project, or interesting idea — I'd love to hear from you.
        </p>

        {/* Contact Visual */}
        <ContactVisual />
      </header>

      {/* Primary Email Method with Copy Interaction */}
      <section aria-label="Direct email contact" className="mb-8">
        <CopyEmailButton email={primaryEmail} />
      </section>

      {/* Verified Secondary Links Grid */}
      <section aria-label="Professional and code links" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {/* GitHub */}
        <a
          href="https://github.com/manav-chaudhary01"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-2xl bg-surface border border-border-card shadow-xs hover:border-border-subtle hover:shadow-sm transition-all duration-200 group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-3">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
              Source Code
            </span>
            <ExternalLink size={12} className="text-ink-muted group-hover:text-ink-primary transition-colors" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-subtle flex items-center justify-center shrink-0">
              <GithubIcon size={16} />
            </div>
            <div>
              <span className="font-editorial text-lg text-ink-primary block leading-tight">
                GitHub
              </span>
              <span className="text-xs text-ink-muted font-mono block">
                @manav-chaudhary01
              </span>
            </div>
          </div>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/manav-chaudhary"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-2xl bg-surface border border-border-card shadow-xs hover:border-border-subtle hover:shadow-sm transition-all duration-200 group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-3">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
              Professional
            </span>
            <ExternalLink size={12} className="text-ink-muted group-hover:text-ink-primary transition-colors" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-xs font-bold">
              in
            </div>
            <div>
              <span className="font-editorial text-lg text-ink-primary block leading-tight">
                LinkedIn
              </span>
              <span className="text-xs text-ink-muted font-mono block">
                /in/manav-chaudhary
              </span>
            </div>
          </div>
        </a>

        {/* Résumé */}
        <a
          href="#resume"
          className="p-5 rounded-2xl bg-surface border border-border-card shadow-xs hover:border-border-subtle hover:shadow-sm transition-all duration-200 group flex flex-col justify-between"
          aria-label="View or download résumé"
        >
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-3">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
              Curriculum Vitae
            </span>
            <FileText size={12} className="text-ink-muted group-hover:text-ink-primary transition-colors" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-subtle flex items-center justify-center shrink-0 text-ink-secondary">
              <FileText size={16} />
            </div>
            <div>
              <span className="font-editorial text-lg text-ink-primary block leading-tight">
                Résumé
              </span>
              <span className="text-xs text-ink-muted font-mono block">
                PDF Document
              </span>
            </div>
          </div>
        </a>
      </section>

      {/* Response Expectation Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-subtle/70 border border-border-subtle/80 flex items-center gap-3">
        <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
        <p className="text-xs sm:text-sm text-ink-secondary font-sans leading-relaxed">
          I typically reply to emails within 24–48 hours. When reaching out about an engineering role or technical project, please include relevant links or problem context.
        </p>
      </div>

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
