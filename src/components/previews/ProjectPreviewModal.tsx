import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Project, ProjectSlug } from '../../types';
import { ArrowUpRight, X, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../icons/GithubIcon';
import { backdropVariants, previewCardVariants } from '../../animations/presets';
import { useDialogFocus } from '../../hooks/useDialogFocus';
import { MeterFlowArtwork } from './artworks/MeterFlowArtwork';
import { AttendanceTrackerArtwork } from './artworks/AttendanceTrackerArtwork';
import { LeetCodeWidgetArtwork } from './artworks/LeetCodeWidgetArtwork';

interface ProjectPreviewModalProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Pixelwrld-inspired expanding project preview modal.
 * Combines dynamic multi-layered project artworks, tactile 3D elements,
 * spring-based expansion, and strict accessibility.
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

  const renderArtwork = (slug: ProjectSlug) => {
    switch (slug) {
      case 'meter-flow':
        return <MeterFlowArtwork />;
      case 'attendance-tracker':
        return <AttendanceTrackerArtwork />;
      case 'leetcode-widget':
        return <LeetCodeWidgetArtwork />;
      default:
        return null;
    }
  };

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
            {/* Visual Showcase: Project-Specific Multi-Layered Artwork */}
            <div className="mb-6 overflow-hidden rounded-2xl">
              {renderArtwork(project.slug)}
            </div>

            {/* Category & Close Button Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.accentColor }}
                  aria-hidden="true"
                />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
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

            {/* Title & Concise Summary */}
            <div className="mt-4">
              <div className="flex items-baseline justify-between gap-2">
                <h2 id="preview-title" className="font-editorial text-3xl sm:text-4xl text-ink-primary tracking-tight">
                  {project.title}
                </h2>
                <span className="text-xs font-mono text-ink-muted shrink-0">
                  {project.year}
                </span>
              </div>
              <p className="mt-2 text-sm sm:text-base text-ink-secondary leading-relaxed font-sans font-normal">
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
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-pill bg-ink-primary text-surface text-sm font-medium hover:bg-ink-primary/90 transition-all duration-200 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 hover:scale-[1.02] active:scale-[0.98]"
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
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-pill bg-surface-subtle hover:bg-surface-hover text-ink-primary text-sm font-medium border border-border-subtle transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue hover:scale-[1.02] active:scale-[0.98]"
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
