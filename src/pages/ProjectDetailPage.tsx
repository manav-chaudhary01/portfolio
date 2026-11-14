import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { ProjectSlug } from '../types';
import { ArrowLeft, ExternalLink, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../components/icons/GithubIcon';

/**
 * Portal-inspired editorial project deep-dive page (/work/:slug).
 * Renders large editorial typography, generous whitespace, verified architecture matrix,
 * circular category feature badges, and handwritten callouts.
 */
export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const project = slug && slug in PROJECTS ? PROJECTS[slug as ProjectSlug] : null;

  if (!project) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
        <h1 className="font-editorial text-4xl text-ink-primary mb-4">Project Not Found</h1>
        <p className="text-ink-secondary mb-8">The requested project could not be located.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-ink-primary text-surface text-sm font-medium hover:bg-ink-primary/90 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Return to Homepage</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="flex-1 flex flex-col w-full max-w-3xl mx-auto py-8 sm:py-12 animate-in fade-in duration-300">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-muted hover:text-ink-primary transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to corner</span>
        </Link>
      </div>

      {/* Editorial Header (Portal Style) */}
      <header className="mb-10 pb-8 border-b border-border-subtle">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-3.5 h-3.5 rounded-full"
            style={{ backgroundColor: project.accentColor }}
            aria-hidden="true"
          />
          <span className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
            {project.category} • {project.year}
          </span>
        </div>

        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-ink-primary tracking-tight leading-none mb-6">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-ink-secondary font-sans leading-relaxed">
          {project.subtitle}
        </p>

        {/* Project Meta Bar */}
        <div className="mt-8 pt-6 border-t border-border-subtle/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div>
            <span className="block text-[11px] uppercase font-semibold text-ink-muted tracking-wider">Role</span>
            <span className="text-sm font-medium text-ink-primary mt-1 block">{project.role}</span>
          </div>
          <div>
            <span className="block text-[11px] uppercase font-semibold text-ink-muted tracking-wider">Timeline</span>
            <span className="text-sm font-medium text-ink-primary mt-1 block">{project.year}</span>
          </div>
          <div>
            <span className="block text-[11px] uppercase font-semibold text-ink-muted tracking-wider">Focus</span>
            <span className="text-sm font-medium text-ink-primary mt-1 block">{project.badgeText}</span>
          </div>
          <div>
            <span className="block text-[11px] uppercase font-semibold text-ink-muted tracking-wider">Repository</span>
            <div className="mt-1">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline"
                >
                  <span>GitHub</span>
                  <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Editorial Narrative */}
      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-4">
          Overview & System Design
        </h2>
        <p className="text-base sm:text-lg text-ink-secondary leading-relaxed font-sans mb-6">
          {project.description}
        </p>

        {/* Handwritten Callout Note (Portal Style) */}
        {project.callouts && project.callouts.length > 0 && (
          <div className="my-8 p-5 bg-surface-subtle/80 rounded-2xl border border-border-subtle relative">
            <div className="flex items-start gap-3">
              <span className="font-handwriting text-2xl text-accent-blue leading-none select-none">
                ✎ Note:
              </span>
              <div>
                <span className="font-sans font-medium text-ink-primary text-sm block">
                  {project.callouts[0].title}
                </span>
                <span className="font-handwriting text-lg text-ink-secondary leading-snug block mt-0.5">
                  {project.callouts[0].note}
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Verified Key Highlights with Circular Badges */}
      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-6">
          Key Capabilities & Implementation Details
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {project.highlights.map((highlight, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-2xl bg-surface border border-border-subtle shadow-xs"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-surface font-semibold text-xs"
                style={{ backgroundColor: project.accentColor }}
              >
                <CheckCircle2 size={16} />
              </div>
              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                {highlight}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Architecture Breakdown Matrix */}
      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-6">
          Technical Architecture Breakdown
        </h2>
        <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-xs">
          <div className="divide-y divide-border-subtle">
            {project.architecture.map((layer, index) => (
              <div key={index} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                <div className="w-full sm:w-1/3 shrink-0">
                  <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider block">
                    {layer.layer}
                  </span>
                  <span className="text-sm font-semibold text-ink-primary mt-1 block">
                    {layer.technology}
                  </span>
                </div>
                <div className="w-full sm:w-2/3">
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {layer.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="mt-8 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Return to Homepage</span>
        </Link>

        {project.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-ink-primary text-surface text-sm font-medium hover:bg-ink-primary/90 transition-colors shadow-xs"
          >
            <GithubIcon size={16} />
            <span>{link.label}</span>
            <ExternalLink size={14} />
          </a>
        ))}
      </footer>
    </article>
  );
};
