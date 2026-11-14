import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECT_LIST } from '../../data/projects';
import { ProjectSlug } from '../../types';
import { X, Briefcase, ArrowUpRight } from 'lucide-react';
import { backdropVariants, previewCardVariants } from '../../animations/presets';
import { useDialogFocus } from '../../hooks/useDialogFocus';

interface WorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (slug: ProjectSlug) => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export const WorkModal: React.FC<WorkModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  triggerRef,
}) => {
  const { dialogRef, handleBackdropClick } = useDialogFocus<HTMLDivElement>({
    isOpen,
    onClose,
    triggerRef,
    closeOnOutsideClick: true,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="work-modal-title"
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

          {/* Modal Container */}
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            variants={previewCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-xl max-h-[85vh] overflow-y-auto bg-surface border border-border-subtle rounded-modal p-6 sm:p-8 shadow-preview text-left flex flex-col focus:outline-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-accent-blue" />
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Featured Work
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-ink-muted hover:text-ink-primary p-1.5 rounded-full hover:bg-surface-subtle transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                aria-label="Close work dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Title & Introduction */}
            <div className="mt-5 mb-6">
              <h2 id="work-modal-title" className="font-editorial text-3xl sm:text-4xl text-ink-primary tracking-tight">
                Selected Engineering Projects
              </h2>
              <p className="mt-2 text-sm text-ink-secondary leading-relaxed font-sans">
                Select a project to explore its interactive preview, technical architecture, and implementation details.
              </p>
            </div>

            {/* Project List Items */}
            <div className="space-y-3.5">
              {PROJECT_LIST.map((project) => (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectProject(project.slug);
                  }}
                  className="w-full p-4 rounded-2xl bg-surface-subtle/80 hover:bg-surface-subtle border border-border-subtle hover:border-ink-muted/30 transition-all duration-200 flex items-start justify-between text-left group cursor-pointer shadow-2xs hover:shadow-tactile hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                >
                  <div className="flex items-start gap-3.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 mt-1"
                      style={{ backgroundColor: project.accentColor }}
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-base font-semibold text-ink-primary group-hover:text-accent-blue transition-colors flex items-center gap-1.5">
                        {project.title}
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                      <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mt-1">
                        {project.subtitle}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[11px] font-medium text-ink-muted bg-surface rounded-md border border-border-subtle"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
