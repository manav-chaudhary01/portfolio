import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HandwrittenGreeting } from '../components/canvas/HandwrittenGreeting';
import { useProjectQuerySync } from '../hooks/useProjectQuerySync';
import { PROJECT_LIST } from '../data/projects';
import { ABOUT_DATA } from '../data/about';
import { SOCIAL_LINKS } from '../data/socialLinks';
import { ArrowUpRight, X, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../components/icons/GithubIcon';

/**
 * HomePage foundation for Phase 2 scaffolding.
 * Establishes minimal composition, greeting, project navigation placeholders,
 * intro bio, and URL query synchronization (?project=slug).
 */
export const HomePage: React.FC = () => {
  const { activeSlug, activeProject, openPreview, closePreview, isOpen } = useProjectQuerySync();
  const [isSocialDockOpen, setIsSocialDockOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col justify-between items-center text-center relative">
      {/* 1. Header / Handwritten Greeting */}
      <header className="w-full pt-4 pb-8 sm:pb-12 flex justify-center">
        <HandwrittenGreeting text={ABOUT_DATA.greeting} tiltAngle={-3.5} />
      </header>

      {/* 2. Main Center Section: Tactile Navigation Island Foundation */}
      <main id="main-content" className="w-full flex flex-col items-center justify-center my-auto py-8">
        {/* Navigation Grid Foundation */}
        <section
          aria-label="Portfolio sections"
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 md:gap-10 w-full max-w-2xl mb-12"
        >
          {PROJECT_LIST.map((project, idx) => {
            const tilts = [-1.5, 1.2, -1.0];
            const tilt = tilts[idx % tilts.length];

            return (
              <div key={project.slug} className="flex flex-col items-center group">
                <button
                  type="button"
                  onClick={() => openPreview(project.slug)}
                  style={{ transform: `rotate(${tilt}deg)` }}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-surface border border-border-card shadow-tactile hover:shadow-tactile-hover hover:-translate-y-2 transition-all duration-300 flex items-center justify-center cursor-pointer group-hover:border-ink-muted/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                  aria-haspopup="dialog"
                  aria-expanded={activeSlug === project.slug}
                  aria-label={`Preview ${project.title}`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-surface font-semibold text-sm shadow-sm transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: project.accentColor }}
                  >
                    {project.title
                      .split(' ')
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                </button>

                {/* Tactile Pill Label */}
                <span className="mt-3 px-3 py-1 text-xs font-medium text-ink-secondary bg-surface-subtle border border-border-subtle rounded-pill shadow-xs group-hover:bg-surface-hover transition-colors">
                  {project.title}
                </span>
              </div>
            );
          })}

          {/* About / Contact placeholder tile */}
          <div className="flex flex-col items-center group">
            <button
              type="button"
              onClick={() => setIsSocialDockOpen(true)}
              style={{ transform: 'rotate(1.5deg)' }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-surface border border-border-card shadow-tactile hover:shadow-tactile-hover hover:-translate-y-2 transition-all duration-300 flex items-center justify-center cursor-pointer group-hover:border-ink-muted/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
              aria-label="Connect with Manav"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2D2A26] flex items-center justify-center text-surface font-semibold text-sm shadow-sm transition-transform duration-300 group-hover:scale-105">
                M
              </div>
            </button>
            <span className="mt-3 px-3 py-1 text-xs font-medium text-ink-secondary bg-surface-subtle border border-border-subtle rounded-pill shadow-xs group-hover:bg-surface-hover transition-colors">
              Contact
            </span>
          </div>
        </section>

        {/* Intro Bio Statement (Pixelwrld Style) */}
        <section aria-label="Personal introduction" className="max-w-xl mx-auto px-4">
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed font-sans font-normal text-center">
            {ABOUT_DATA.shortBio}
          </p>
        </section>
      </main>

      {/* 3. Footer / Expandable Social Dock Foundation */}
      <footer className="w-full pt-8 pb-4 flex flex-col items-center">
        {!isSocialDockOpen ? (
          <button
            type="button"
            onClick={() => setIsSocialDockOpen(true)}
            className="px-4 py-2 bg-surface border border-border-subtle rounded-pill shadow-sm hover:shadow-tactile hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-ink-secondary hover:text-ink-primary flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
            aria-label="Open contact and social links"
            aria-expanded="false"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ink-muted"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-ink-muted"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-ink-muted"></span>
          </button>
        ) : (
          <div
            role="dialog"
            aria-label="Social and contact links"
            className="w-full max-w-md p-4 bg-surface border border-border-subtle rounded-3xl shadow-dock flex flex-col items-center animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between w-full mb-3 px-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Get In Touch
              </span>
              <button
                type="button"
                onClick={() => setIsSocialDockOpen(false)}
                className="text-ink-muted hover:text-ink-primary p-1 rounded-full hover:bg-surface-subtle"
                aria-label="Close contact dock"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center justify-around w-full py-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.isExternal ? '_blank' : undefined}
                  rel={link.isExternal ? 'noopener noreferrer' : undefined}
                  className="flex flex-col items-center gap-1.5 group p-2 rounded-xl hover:bg-surface-subtle transition-colors"
                  aria-label={link.ariaLabel}
                >
                  <div className="w-10 h-10 rounded-full bg-surface-subtle group-hover:bg-ink-primary group-hover:text-surface text-ink-primary flex items-center justify-center transition-colors shadow-xs">
                    {link.icon === 'github' ? (
                      <GithubIcon size={18} />
                    ) : (
                      <ArrowUpRight size={18} />
                    )}
                  </div>
                  <span className="text-xs font-medium text-ink-secondary group-hover:text-ink-primary">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
            <div className="text-[11px] text-ink-muted mt-2">
              All Rights Reserved • Manav {new Date().getFullYear()}
            </div>
          </div>
        )}
      </footer>

      {/* 4. Pixelwrld-Inspired Project Preview Modal Layer */}
      {isOpen && activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title} preview`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop Blur & Dimming */}
          <div
            className="fixed inset-0 bg-ink-primary/20 backdrop-blur-md transition-opacity duration-300"
            onClick={closePreview}
            aria-hidden="true"
          />

          {/* Elevated Floating Preview Card */}
          <div className="relative z-10 w-full max-w-lg bg-surface border border-border-subtle rounded-modal p-6 sm:p-8 shadow-preview animate-in fade-in zoom-in-95 duration-250 flex flex-col text-left">
            <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: activeProject.accentColor }}
                />
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  {activeProject.category}
                </span>
              </div>
              <button
                type="button"
                onClick={closePreview}
                className="text-ink-muted hover:text-ink-primary p-1.5 rounded-full hover:bg-surface-subtle transition-colors cursor-pointer"
                aria-label="Close project preview"
              >
                <X size={18} />
              </button>
            </div>

            {/* Title & Tagline */}
            <div className="mt-5">
              <h2 className="font-editorial text-3xl sm:text-4xl text-ink-primary tracking-tight">
                {activeProject.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-ink-secondary leading-relaxed">
                {activeProject.summary}
              </p>
            </div>

            {/* Verified Technology Badges */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {activeProject.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium text-ink-secondary bg-surface-subtle rounded-md border border-border-subtle"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions: Dedicated Editorial Case Study & Repository Link */}
            <div className="mt-8 pt-5 border-t border-border-subtle flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <Link
                to={`/work/${activeProject.slug}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-pill bg-ink-primary text-surface text-sm font-medium hover:bg-ink-primary/90 transition-colors shadow-xs"
              >
                <span>Explore Case Study</span>
                <ArrowUpRight size={16} />
              </Link>

              {activeProject.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-pill bg-surface-subtle hover:bg-surface-hover text-ink-primary text-sm font-medium border border-border-subtle transition-colors"
                >
                  <GithubIcon size={16} />
                  <span>{link.label}</span>
                  <ExternalLink size={14} className="text-ink-muted" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
