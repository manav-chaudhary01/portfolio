import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ABOUT_DATA } from '../../data/about';
import { X, Sparkles, ArrowUpRight } from 'lucide-react';
import { backdropVariants, previewCardVariants } from '../../animations/presets';
import { useDialogFocus } from '../../hooks/useDialogFocus';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, triggerRef }) => {
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
          aria-labelledby="about-modal-title"
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
                <Sparkles size={16} className="text-accent-amber" />
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  About Me
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-ink-muted hover:text-ink-primary p-1.5 rounded-full hover:bg-surface-subtle transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                aria-label="Close about dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Narrative Content */}
            <div className="mt-5">
              <h2 id="about-modal-title" className="font-editorial text-3xl sm:text-4xl text-ink-primary tracking-tight">
                {ABOUT_DATA.name}
              </h2>
              <span className="font-handwriting text-xl text-accent-blue block mt-1">
                {ABOUT_DATA.role}
              </span>

              <div className="mt-5 space-y-4 text-sm sm:text-base text-ink-secondary leading-relaxed font-sans">
                {ABOUT_DATA.fullBio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Core Principles */}
            <div className="mt-8 pt-6 border-t border-border-subtle">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-4">
                Engineering Principles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ABOUT_DATA.principles.map((principle, idx) => (
                  <div key={idx} className="p-3 bg-surface-subtle/80 rounded-xl border border-border-subtle">
                    <span className="text-xs font-semibold text-ink-primary block mb-1">
                      {principle.title}
                    </span>
                    <span className="text-xs text-ink-secondary leading-snug block">
                      {principle.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Categorized Skills */}
            <div className="mt-8 pt-6 border-t border-border-subtle">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-4">
                Core Competencies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ABOUT_DATA.skills.map((skillGroup, idx) => (
                  <div key={idx} className="p-3 bg-surface-subtle/50 rounded-xl border border-border-subtle">
                    <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-2">
                      {skillGroup.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((item, itemIdx) => (
                        <span
                          key={itemIdx}
                          className="px-2 py-0.5 text-xs bg-surface text-ink-primary font-medium rounded-md border border-border-subtle shadow-2xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Link to Full About Page */}
            <div className="mt-8 pt-5 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-ink-muted">Want the complete story, toolkit & focus areas?</span>
              <Link
                to="/about"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-pill bg-ink-primary text-surface text-xs font-medium hover:bg-ink-primary/90 transition-all shadow-xs"
              >
                <span>Read Full Story</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
