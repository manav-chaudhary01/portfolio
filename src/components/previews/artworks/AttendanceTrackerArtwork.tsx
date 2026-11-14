import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

interface ArtworkProps {
  className?: string;
}

/**
 * Handcrafted multi-layered product artwork for Attendance Tracker.
 * Combines warm minimal client-side aesthetic, attendance calendar heatmap,
 * safe bunk threshold buffer badges, and an isometric 3D "85%" keycap.
 */
export const AttendanceTrackerArtwork: React.FC<ArtworkProps> = ({ className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`relative w-full h-44 sm:h-52 bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7] rounded-2xl border border-emerald-100 overflow-hidden flex items-center justify-center select-none ${className}`}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial from-emerald-400/15 via-transparent to-transparent pointer-events-none" />

      {/* Layer 1: Back Panel — Subject Roster & Safe Bunk Thresholds (Tilted Left) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 15, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="absolute w-56 sm:w-64 h-32 sm:h-36 bg-surface rounded-xl border border-border-card shadow-sm p-3 -translate-x-12 sm:-translate-x-16 -translate-y-2 pointer-events-none"
      >
        <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
          <span className="text-[10px] font-semibold text-ink-primary font-sans">
            Semester 5 Roster
          </span>
          <span className="text-[8px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            Min 75% Rule
          </span>
        </div>

        <div className="mt-2 space-y-1.5 text-[9px]">
          <div className="flex items-center justify-between">
            <span className="text-ink-secondary">Operating Systems</span>
            <span className="font-semibold text-emerald-600">86.2% (+3 Bunks)</span>
          </div>
          <div className="w-full bg-surface-subtle h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[86%] rounded-full" />
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <span className="text-ink-secondary">Computer Networks</span>
            <span className="font-semibold text-emerald-600">79.0% (+1 Bunk)</span>
          </div>
          <div className="w-full bg-surface-subtle h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[79%] rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Layer 2: Front Hero Panel — Attendance Heatmap Calendar & Real-Time Sync (Tilted Right) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 3.5 }}
        transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
        className="relative z-10 w-64 sm:w-72 h-34 sm:h-38 bg-surface/95 backdrop-blur-sm rounded-xl border border-emerald-200/80 shadow-tactile p-3 sm:p-3.5 translate-x-4 sm:translate-x-6 translate-y-1"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-wider font-semibold text-ink-muted block">
              Cumulative Status
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-base sm:text-lg font-bold font-sans text-ink-primary">
                85.4%
              </span>
              <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded">
                Safe
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200">
            IndexedDB Sync
          </span>
        </div>

        {/* Heatmap Matrix Visual */}
        <div className="mt-2.5 pt-2 border-t border-border-subtle">
          <div className="flex items-center justify-between text-[9px] mb-1.5 text-ink-secondary">
            <span>Recent Activity Grid</span>
            <span className="text-[8px] text-ink-muted">Mon — Fri</span>
          </div>

          {/* Mini 5x7 Calendar Heatmap Grid */}
          <div className="grid grid-cols-12 gap-1 w-full">
            {[
              2, 3, 3, 2, 3, 1, 3, 3, 2, 3, 3, 2,
              3, 2, 3, 3, 1, 3, 3, 2, 3, 3, 3, 2,
            ].map((level, i) => {
              const colors = [
                'bg-emerald-100',
                'bg-emerald-300',
                'bg-emerald-500',
                'bg-emerald-600',
              ];
              return (
                <div
                  key={i}
                  className={`h-2.5 rounded-[2px] ${colors[level]} transition-transform hover:scale-125`}
                  title={`Day activity level ${level}`}
                />
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Layer 3: Tactile 3D Extruded Keycap "85%" */}
      <motion.div
        initial={prefersReducedMotion ? false : { scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15, ease: 'backOut' }}
        className="absolute bottom-2 right-4 sm:right-8 z-20"
      >
        <svg width="48" height="42" viewBox="0 0 60 52" fill="none" className="drop-shadow-md">
          {/* 3D Base */}
          <path d="M 6 18 L 30 4 L 54 18 L 54 36 L 30 50 L 6 36 Z" fill="#047857" />
          <path d="M 30 50 L 54 36 L 54 18 L 30 32 Z" fill="#065F46" />
          <path d="M 6 36 L 30 50 L 30 32 L 6 18 Z" fill="#059669" />
          {/* Top Keycap Face */}
          <path d="M 6 18 L 30 4 L 54 18 L 30 32 Z" fill="#10B981" stroke="#A7F3D0" strokeWidth="1.2" />
          {/* Text on Keycap Face */}
          <text
            x="30"
            y="20"
            fill="#FFFFFF"
            fontSize="8"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="sans-serif"
            transform="rotate(-2 30 20)"
          >
            85%
          </text>
        </svg>
      </motion.div>
    </div>
  );
};
