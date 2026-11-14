import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

interface ArtworkProps {
  className?: string;
}

/**
 * Handcrafted multi-layered product artwork for LeetCode Desktop Widget.
 * Combines native Windows 11 desktop wallpaper aesthetic, dark WPF widget layout,
 * complete 53-week submission heatmap matrix, and an isometric 3D "Win+D" keycap.
 */
export const LeetCodeWidgetArtwork: React.FC<ArtworkProps> = ({ className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`relative w-full h-44 sm:h-52 bg-gradient-to-b from-[#1C1E24] to-[#121316] rounded-2xl border border-neutral-800 overflow-hidden flex items-center justify-center select-none ${className}`}
    >
      {/* Ambient desktop wallpaper gradient glow */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Layer 1: Back Panel — Windows Wallpaper Layer & Explorer Integration (Tilted Left) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 15, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -5 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="absolute w-56 sm:w-64 h-32 sm:h-36 bg-[#161B22] rounded-xl border border-[#30363D] shadow-sm p-3 -translate-x-12 sm:-translate-x-16 -translate-y-2 pointer-events-none"
      >
        <div className="flex items-center justify-between pb-1.5 border-b border-[#30363D]/80">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-[10px] font-semibold text-[#C9D1D9] font-mono">
              WorkerW (Desktop)
            </span>
          </div>
          <span className="text-[8px] font-mono text-[#8B949E] bg-[#21262D] px-1.5 py-0.5 rounded">
            C# / .NET 10
          </span>
        </div>

        <div className="mt-2 space-y-1.5 text-[9px] text-[#8B949E] font-mono">
          <div className="flex justify-between">
            <span>Shell Resilience:</span>
            <span className="text-[#3FB950]">explorer.exe hooked</span>
          </div>
          <div className="flex justify-between">
            <span>Cache Status:</span>
            <span className="text-[#58A6FF]">%LOCALAPPDATA%</span>
          </div>
          <div className="flex justify-between">
            <span>Sync Interval:</span>
            <span className="text-[#C9D1D9]">60m periodic</span>
          </div>
        </div>
      </motion.div>

      {/* Layer 2: Front Hero Panel — Native Dark WPF LeetCode Widget (Tilted Right) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
        className="relative z-10 w-64 sm:w-72 h-34 sm:h-38 bg-[#0D1117]/95 backdrop-blur-sm rounded-xl border border-[#30363D] shadow-tactile p-3 sm:p-3.5 translate-x-4 sm:translate-x-6 translate-y-1"
      >
        {/* Widget Header */}
        <div className="flex items-center justify-between pb-1.5 border-b border-[#30363D]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#238636]" title="Active Wallpaper Layer" />
            <span className="text-[10px] font-bold text-[#8B949E] tracking-wider font-mono">
              LEETCODE
            </span>
            <span className="text-[10px] text-[#58A6FF] font-mono">@manav</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] font-mono text-amber-400">
            <span>48🔥</span>
            <span className="text-[#8B949E]">streak</span>
          </div>
        </div>

        {/* Solved Statistics Badges */}
        <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono">
          <span className="text-[#8B949E]">Solved: <strong className="text-[#C9D1D9]">624</strong></span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#00B8A3]">240 E</span>
            <span className="text-[#FFC01E]">310 M</span>
            <span className="text-[#FF375F]">74 H</span>
          </div>
        </div>

        {/* 53-Week Heatmap Matrix (Authentic 5 Levels) */}
        <div className="mt-2 pt-1.5 border-t border-[#30363D]">
          <div
            className="grid gap-[2.5px] w-full"
            style={{ gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }}
          >
            {[
              0, 1, 3, 4, 2, 3, 4, 3, 2, 4, 3, 4, 1, 3,
              1, 3, 4, 2, 3, 4, 4, 2, 3, 4, 3, 4, 2, 4,
            ].map((level, i) => {
              const shades = [
                '#161B22', // 0: None
                '#0E4429', // 1: Low
                '#006D32', // 2: Medium
                '#26A641', // 3: High
                '#39D353', // 4: Peak
              ];
              return (
                <div
                  key={i}
                  className="h-2 rounded-[1.5px] transition-transform hover:scale-125"
                  style={{ backgroundColor: shades[level] }}
                  title={`Level ${level}`}
                />
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Layer 3: Tactile 3D Extruded Keycap "Win+D" */}
      <motion.div
        initial={prefersReducedMotion ? false : { scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15, ease: 'backOut' }}
        className="absolute bottom-2 right-4 sm:right-8 z-20"
      >
        <svg width="48" height="42" viewBox="0 0 60 52" fill="none" className="drop-shadow-md">
          {/* 3D Base */}
          <path d="M 6 18 L 30 4 L 54 18 L 54 36 L 30 50 L 6 36 Z" fill="#B45309" />
          <path d="M 30 50 L 54 36 L 54 18 L 30 32 Z" fill="#92400E" />
          <path d="M 6 36 L 30 50 L 30 32 L 6 18 Z" fill="#D97706" />
          {/* Top Keycap Face */}
          <path d="M 6 18 L 30 4 L 54 18 L 30 32 Z" fill="#F59E0B" stroke="#FDE68A" strokeWidth="1.2" />
          {/* Text on Keycap Face */}
          <text
            x="30"
            y="20"
            fill="#FFFFFF"
            fontSize="7"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="monospace"
            transform="rotate(-2 30 20)"
          >
            Win+D
          </text>
        </svg>
      </motion.div>
    </div>
  );
};
