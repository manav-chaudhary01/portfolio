import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ContactVisualProps {
  className?: string;
}

export const ContactVisual: React.FC<ContactVisualProps> = ({ className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`relative w-full h-48 sm:h-56 bg-gradient-to-b from-[#FAF8F5] via-[#F5EFE6] to-[#ECE3D4] rounded-3xl border border-border-card overflow-hidden flex items-center justify-center select-none shadow-preview p-6 ${className}`}
    >
      <div className="absolute inset-0 bg-radial from-amber-400/10 via-transparent to-transparent pointer-events-none" />

      {/* Layer 1: Tactile Envelope (Tilted -4°) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 15, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -4 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-64 sm:w-72 h-36 sm:h-40 bg-surface rounded-2xl border border-border-card shadow-tactile p-4 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
          <span className="font-mono text-[9px] uppercase tracking-wider text-ink-muted">
            DIRECT DISPATCH // INBOX
          </span>
          <span className="font-handwriting text-sm text-accent-blue">open for chat</span>
        </div>

        <div className="space-y-1.5 py-1">
          <div className="w-32 h-2 rounded bg-surface-subtle" />
          <div className="w-48 h-2 rounded bg-surface-subtle/80" />
          <div className="w-24 h-2 rounded bg-surface-subtle/60" />
        </div>

        <div className="pt-2 border-t border-border-subtle/60 flex items-center justify-between">
          <span className="font-mono text-[9px] text-ink-muted">RECIPIENT: MANAV</span>
          <span className="font-mono text-[9px] text-emerald-600 font-medium">
            RESPONSE TIME &lt; 24H
          </span>
        </div>
      </motion.div>

      {/* Layer 2: 3D Wax Seal Badge */}
      <motion.div
        initial={prefersReducedMotion ? false : { scale: 0.7, rotate: 10 }}
        animate={{ scale: 1, rotate: 6 }}
        transition={{ duration: 0.6, delay: 0.15, type: 'spring', stiffness: 220 }}
        className="absolute bottom-4 right-8 sm:right-16 z-20 pointer-events-none"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 border-2 border-amber-300/40 shadow-tactile flex items-center justify-center text-amber-100 font-editorial text-xl sm:text-2xl font-bold">
          <span>M</span>
        </div>
      </motion.div>
    </div>
  );
};
