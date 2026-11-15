import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AboutVisualProps {
  className?: string;
}

export const AboutVisual: React.FC<AboutVisualProps> = ({ className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`relative w-full h-64 sm:h-80 md:h-96 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#EAE3D5] rounded-3xl border border-border-card overflow-hidden flex items-center justify-center select-none shadow-preview p-6 ${className}`}
    >
      {/* Warm ambient lighting */}
      <div className="absolute inset-0 bg-radial from-amber-400/10 via-transparent to-transparent pointer-events-none" />

      {/* Layer 1: Isometric Engineer's Grid Notebook (Tilted -6°) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 15, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute w-64 sm:w-80 h-44 sm:h-56 bg-surface rounded-2xl border border-border-subtle shadow-tactile p-4 sm:p-5 -translate-x-8 sm:-translate-x-12 -translate-y-3 pointer-events-none"
      >
        {/* Notebook Wire Spine */}
        <div className="absolute left-2.5 top-3 bottom-3 flex flex-col justify-between">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="w-2.5 h-2 rounded-full bg-border-subtle" />
          ))}
        </div>

        {/* Notebook Content Grid */}
        <div className="ml-5 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
            <span className="font-mono text-[9px] uppercase tracking-wider text-ink-muted">
              SYSTEM ARCHITECTURE // NOTES
            </span>
            <span className="font-handwriting text-sm text-accent-blue">craft & rigor</span>
          </div>

          <div className="space-y-2 py-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-[10px] text-ink-secondary">
                deterministic decimal arithmetic
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="font-mono text-[10px] text-ink-secondary">
                local-first indexeddb atomic batches
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="font-mono text-[10px] text-ink-secondary">
                win32 wallpaper shell integration
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-border-subtle/60 flex items-center justify-between">
            <span className="font-mono text-[8px] text-ink-muted">REVISION 2026.11</span>
            <span className="font-handwriting text-xs text-ink-secondary">build to last ✦</span>
          </div>
        </div>
      </motion.div>

      {/* Layer 2: Tactile Physical Spec Sheet (Tilted +4°) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 15, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 4 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="relative z-10 w-60 sm:w-72 h-40 sm:h-52 bg-surface/95 rounded-2xl border border-border-card shadow-tactile p-4 sm:p-5 translate-x-6 sm:translate-x-12 translate-y-2 pointer-events-none backdrop-blur-xs"
      >
        <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-ink-primary" />
            <span className="font-sans font-semibold text-[11px] text-ink-primary">
              Manav Chaudhary
            </span>
          </div>
          <span className="text-[9px] font-mono text-ink-muted bg-surface-subtle px-1.5 py-0.5 rounded">
            Engineer
          </span>
        </div>

        <div className="py-2.5 space-y-2">
          <div className="flex justify-between text-[10px] font-mono">
            <span className="text-ink-muted">Focus</span>
            <span className="text-ink-primary font-medium">Systems & Local-First</span>
          </div>
          <div className="flex justify-between text-[10px] font-mono">
            <span className="text-ink-muted">Core Stack</span>
            <span className="text-ink-primary font-medium">Node · React · C# · TS</span>
          </div>
          <div className="flex justify-between text-[10px] font-mono">
            <span className="text-ink-muted">Aesthetic</span>
            <span className="text-ink-primary font-medium">Tactile & Editorial</span>
          </div>
        </div>

        <div className="pt-2 border-t border-border-subtle flex items-center justify-between">
          <span className="font-mono text-[9px] text-emerald-600 font-medium">
            ● Active in Corner
          </span>
          <span className="font-mono text-[9px] text-ink-muted">2026</span>
        </div>
      </motion.div>

      {/* Layer 3: 3D Extruded Mechanical Keycap */}
      <motion.div
        initial={prefersReducedMotion ? false : { scale: 0.8, rotate: -12 }}
        animate={{ scale: 1, rotate: -8 }}
        transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 200 }}
        className="absolute bottom-4 sm:bottom-6 right-6 sm:right-12 z-20 pointer-events-none"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-stone-100 to-stone-300 border-t-2 border-l-2 border-white border-b-4 border-r-4 border-stone-500 shadow-tactile flex flex-col items-center justify-center -rotate-6">
          <span className="font-mono text-[10px] sm:text-xs font-bold text-stone-700 tracking-wider">
            BUILD
          </span>
          <span className="w-5 h-0.5 bg-stone-400 rounded-full mt-0.5" />
        </div>
      </motion.div>
    </div>
  );
};
