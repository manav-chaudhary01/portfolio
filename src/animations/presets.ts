import { Transition, Variants } from 'motion/react';

/**
 * Standard tactile spring for hover lifts, button presses, and micro-interactions
 */
export const springTactile: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 26,
  mass: 0.8,
};

/**
 * Smooth, elegant spring for large modal expansions and layout shifts
 */
export const springModal: Transition = {
  type: 'spring',
  stiffness: 320,
  damping: 28,
  mass: 1,
};

/**
 * Gentle spring for idle floats and subtle badge shifts
 */
export const springSubtle: Transition = {
  type: 'spring',
  stiffness: 140,
  damping: 18,
};

/**
 * Accessible cross-fade fallback for reduced-motion preferences
 */
export const accessibleTransition: Transition = {
  duration: 0.15,
  ease: 'easeInOut',
};

/**
 * Backdrop blur and dimming variants (Pixelwrld focus transition)
 */
export const backdropVariants: Variants = {
  hidden: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(12px)',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
};

/**
 * Expanding preview card variants
 */
export const previewCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.94,
    transition: { duration: 0.15 },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springModal,
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.96,
    transition: { duration: 0.18, ease: 'easeInOut' },
  },
};

/**
 * Tactile navigation tile hover variants
 */
export const tileVariants: Variants = {
  idle: {
    y: 0,
    scale: 1,
    rotate: 0,
    transition: springTactile,
  },
  hover: (tilt = 1.5) => ({
    y: -8,
    scale: 1.05,
    rotate: tilt,
    transition: springTactile,
  }),
  tap: {
    y: -2,
    scale: 0.97,
    transition: { duration: 0.1 },
  },
  dimmed: {
    opacity: 0.18,
    filter: 'blur(6px)',
    scale: 0.95,
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
  focused: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: springModal,
  },
};

/**
 * Bottom expandable social dock variants
 */
export const dockVariants: Variants = {
  collapsed: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  expanded: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: springModal,
  },
};
