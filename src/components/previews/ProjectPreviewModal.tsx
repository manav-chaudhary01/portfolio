import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../../types';
import { ArrowUpRight, X, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../icons/GithubIcon';
import { backdropVariants, previewCardVariants } from '../../animations/presets';
import { useDialogFocus } from '../../hooks/useDialogFocus';

interface ProjectPreviewModalProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Pixelwrld-inspired expanding project preview modal.
 * Fully accessible with initial focus, focus trapping, Escape dismissal,
 * outside click dismissal, and focus restoration to the invoking element.
 */
export const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({
  isOpen,
  project,
  onClose,
  triggerRef,
}) => {
  const { dialogRef, handleBackdropClick } = useDialogFocus<HTMLDivElement>({
    isOpen: isOpen && project !== null,
    onClose,
    triggerRef,
    closeOnOutsideClick: true,
  });

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Soft Blur Backdrop with outside click */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-ink-primary/25 backdrop-blur-md cursor-pointer"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          {/* Elevated Floating Preview Card */}
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            variants={previewCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-lg bg-surface border border-border-subtle rounded-modal p-6 sm:p-8 shadow-preview flex flex-col text-left focus:outline-none"
          >
            {/* Visual Showcase: Layered Tilted Preview Cards (Pixelwrld Motif) */}
            <div className="relative w-full h-32 sm:h-36 mb-6 rounded-2xl bg-canvas border border-border-subtle/80 flex items-center justify-center overflow-hidden select-none">
              {/* Background ambient glow */}
              <div
                className="absolute inset-0 opacity-20 blur-xl"
                style={{ backgroundColor: project.accentColor }}
              />

              {/* Tilted Card 1 (Back Left) */}
              <div
                className="absolute w-44 sm:w-48 h-24 bg-surface rounded-xl border border-border-card shadow-sm p-3 -rotate-6 -translate-x-8 -translate-y-1 transition-transform"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-border-subtle" />
                  <span className="w-2 h-2 rounded-full bg-border-subtle" />
                  <span className="w-12 h-2 rounded-full bg-surface-subtle" />
                </div>
                <div className="w-full h-2 rounded bg-surface-subtle mb-1.5" />
                <div className="w-3/4 h-2 rounded bg-surface-subtle" />
              </div>

              {/* Tilted Card 2 (Front Center Hero) */}
              <div
                className="relative z-10 w-48 sm:w-52 h-26 bg-surface rounded-xl border border-border-card shadow-tactile p-3 rotate-3 translate-x-2 transition-transform"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                      {project.title}
                    </span>
                  </div>
                  <span className="text-[9px] font-medium text-ink-muted bg-surface-subtle px-1.5 py-0.5 rounded">
                    {project.year}
                  </span>
                </div>
                <div className="w-full h-2 rounded bg-surface-subtle mb-1.5" />
                <div className="w-4/5 h-2 rounded bg-surface-subtle" />
              </div>
            </div>

            {/* Category & Close Button */}
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.accentColor }}
                  aria-hidden="true"
                />
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  {project.category}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-ink-muted hover:text-ink-primary p-1.5 rounded-full hover:bg-surface-subtle transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                aria-label="Close project preview"
              >
                <X size={18} />
              </button>
            </div>

            {/* Title & Summary */}
            <div className="mt-4">
              <h2 id="preview-title" className="font-editorial text-3xl sm:text-4xl text-ink-primary tracking-tight">
                {project.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-ink-secondary leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* Verified Technology Badges */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium text-ink-secondary bg-surface-subtle rounded-md border border-border-subtle"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions: Dedicated Editorial Case Study & Repository Link */}
            <div className="mt-7 pt-5 border-t border-border-subtle flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <Link
                to={`/work/${project.slug}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-pill bg-ink-primary text-surface text-sm font-medium hover:bg-ink-primary/90 transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2"
              >
                <span>Explore Case Study</span>
                <ArrowUpRight size={16} />
              </Link>

              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-pill bg-surface-subtle hover:bg-surface-hover text-ink-primary text-sm font-medium border border-border-subtle transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                >
                  <GithubIcon size={16} />
                  <span>{link.label}</span>
                  <ExternalLink size={14} className="text-ink-muted" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
