import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, RefreshCw, Wand2, ArrowUpRight } from 'lucide-react';
import { backdropVariants, previewCardVariants, springTactile } from '../../animations/presets';
import { PLAYGROUND_ITEMS } from '../../data/playground';
import { useDialogFocus } from '../../hooks/useDialogFocus';

interface PlaygroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export const PlaygroundModal: React.FC<PlaygroundModalProps> = ({
  isOpen,
  onClose,
  triggerRef,
}) => {
  const [bounceCount, setBounceCount] = useState(0);

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
          aria-labelledby="playground-modal-title"
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
                <Wand2 size={16} className="text-accent-purple" />
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Interactive Playground
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-ink-muted hover:text-ink-primary p-1.5 rounded-full hover:bg-surface-subtle transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                aria-label="Close playground dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Title & Introduction */}
            <div className="mt-5">
              <h2 id="playground-modal-title" className="font-editorial text-3xl sm:text-4xl text-ink-primary tracking-tight">
                Micro-Experiments & Toys
              </h2>
              <p className="mt-2 text-sm sm:text-base text-ink-secondary leading-relaxed font-sans">
                A sandbox for exploring tactile physics, physics-driven spring dynamics, and creative front-end interactions.
              </p>
            </div>

            {/* Interactive Spring Toy Component */}
            <div className="mt-6 p-6 rounded-2xl bg-canvas border border-border-subtle flex flex-col items-center justify-center text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
                Physics Demo: Drag or Tap Orb
              </span>

              {/* Draggable & Bouncy Spring Orb */}
              <motion.div
                drag
                dragConstraints={{ left: -100, right: 100, top: -40, bottom: 40 }}
                dragElastic={0.4}
                whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
                whileHover={{ scale: 1.08, cursor: 'grab' }}
                whileTap={{ scale: 0.94 }}
                transition={springTactile}
                onClick={() => setBounceCount((c) => c + 1)}
                className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-accent-purple via-accent-blue to-accent-green shadow-tactile-hover flex items-center justify-center text-surface cursor-grab select-none my-4"
              >
                <Play size={24} className="fill-surface" />
              </motion.div>

              <div className="flex items-center gap-2 text-xs text-ink-muted mt-2">
                <span>Tactile Bounces: <strong>{bounceCount}</strong></span>
                {bounceCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setBounceCount(0)}
                    className="p-1 hover:text-ink-primary transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                    aria-label="Reset bounce counter"
                  >
                    <RefreshCw size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Catalog of Micro Experiments */}
            <div className="mt-6 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Upcoming Experiments
              </h3>
              {PLAYGROUND_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-surface-subtle/70 border border-border-subtle flex items-start justify-between gap-4"
                >
                  <div>
                    <span className="text-sm font-semibold text-ink-primary block">
                      {item.title}
                    </span>
                    <span className="text-xs text-ink-secondary leading-relaxed block mt-0.5">
                      {item.description}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-purple bg-accent-purple/10 rounded-md shrink-0 border border-accent-purple/20">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Link to Full Playground Page */}
            <div className="mt-8 pt-5 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-ink-muted">Want to try physics sliders & procedural audio?</span>
              <Link
                to="/playground"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-pill bg-ink-primary text-surface text-xs font-medium hover:bg-ink-primary/90 transition-all shadow-xs"
              >
                <span>Open Full Playground</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
