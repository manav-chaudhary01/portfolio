import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { springTactile } from '../../animations/presets';

interface NavTileProps {
  id: string;
  label: string;
  illustration: React.ReactNode;
  tilt?: number;
  onClick: () => void;
  isDimmed?: boolean;
  isFocused?: boolean;
  ariaLabel?: string;
  ariaExpanded?: boolean;
}

/**
 * Coherent semantic interactive control inspired by pixelwrld.co.
 * Unifies the illustrated 3D tile and the rounded pill label into a single
 * accessible button with tactile spring physics, dynamic tilt, and sibling dimming.
 */
export const NavTile: React.FC<NavTileProps> = ({
  id,
  label,
  illustration,
  tilt = 0,
  onClick,
  isDimmed = false,
  isFocused = false,
  ariaLabel,
  ariaExpanded = false,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      id={`nav-tile-${id}`}
      onClick={onClick}
      aria-label={ariaLabel || label}
      aria-haspopup="dialog"
      aria-expanded={ariaExpanded}
      initial={false}
      animate={{
        opacity: isDimmed ? 0.2 : 1,
        filter: isDimmed ? 'blur(6px)' : 'blur(0px)',
        scale: isDimmed ? 0.94 : isFocused ? 1.05 : 1,
      }}
      transition={springTactile}
      className="flex flex-col items-center group cursor-pointer select-none bg-transparent border-0 p-0 m-0 focus:outline-none focus-visible:outline-none"
    >
      {/* Tactile Illustrated Tile Container */}
      <motion.div
        animate={{
          rotate: prefersReducedMotion ? 0 : tilt,
        }}
        whileHover={
          prefersReducedMotion || isDimmed
            ? undefined
            : {
                y: -8,
                scale: 1.06,
                rotate: tilt * 1.5,
                transition: springTactile,
              }
        }
        whileTap={
          prefersReducedMotion || isDimmed
            ? undefined
            : {
                y: -2,
                scale: 0.96,
                transition: { duration: 0.08 },
              }
        }
        className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl sm:rounded-3xl bg-surface/90 border border-border-card shadow-tactile group-hover:shadow-tactile-hover group-focus-visible:ring-2 group-focus-visible:ring-accent-blue group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-canvas flex items-center justify-center transition-all duration-200"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center pointer-events-none">
          {illustration}
        </div>
      </motion.div>

      {/* Small Rounded Light-Grey Pill Label */}
      <span className="mt-3 px-3 py-1 text-xs font-medium text-ink-secondary bg-surface-subtle border border-border-subtle rounded-pill shadow-xs group-hover:bg-surface-hover group-hover:text-ink-primary group-focus-visible:bg-surface-hover group-focus-visible:text-ink-primary transition-colors">
        {label}
      </span>
    </motion.button>
  );
};
