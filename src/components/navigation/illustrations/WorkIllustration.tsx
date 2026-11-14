import React from 'react';

interface IllustrationProps {
  className?: string;
  size?: number;
}

/**
 * Handcrafted multi-layered isometric Project Portal illustration.
 * Represents "Work" with stacked application planes, glowing accent accents,
 * and ambient isometric drop shadows.
 */
export const WorkIllustration: React.FC<IllustrationProps> = ({ size = 72, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none transition-transform duration-300 ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Soft Ambient Shadow */}
        <filter id="work-shadow" x="10" y="55" width="80" height="40" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        {/* Gradients for tactile depth */}
        <linearGradient id="work-tile-bg" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="work-screen-grad" x1="25" y1="25" x2="75" y2="75" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EFF6FF" />
          <stop offset="1" stopColor="#DBEAFE" />
        </linearGradient>
        <linearGradient id="work-accent-disc" x1="40" y1="40" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>

      {/* Ambient Floor Shadow */}
      <ellipse cx="50" cy="78" rx="32" ry="10" fill="rgba(37, 99, 235, 0.22)" filter="url(#work-shadow)" />

      {/* Main Base Tile (Rounded Square with 3D Depth) */}
      <rect x="18" y="20" width="64" height="64" rx="20" fill="#1E40AF" />
      <rect x="18" y="16" width="64" height="64" rx="20" fill="url(#work-tile-bg)" stroke="#93C5FD" strokeWidth="1.5" />

      {/* Glossy Top Edge Highlight */}
      <path
        d="M 32 17.5 L 68 17.5 C 78 17.5 80 23 80 23"
        stroke="rgba(255, 255, 255, 0.45)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Inner Recessed Portal Screen */}
      <rect
        x="26"
        y="24"
        width="48"
        height="48"
        rx="14"
        fill="url(#work-screen-grad)"
        stroke="rgba(255, 255, 255, 0.8)"
        strokeWidth="1.2"
      />

      {/* Center Tactile Star / Disc Icon (Pixelwrld Portal motif) */}
      <circle cx="50" cy="48" r="14" fill="url(#work-accent-disc)" />
      
      {/* Dynamic 4-Point Star Sparkle inside disc */}
      <path
        d="M 50 40 Q 50 48 58 48 Q 50 48 50 56 Q 50 48 42 48 Q 50 48 50 40 Z"
        fill="#FFFFFF"
      />

      {/* Subtle indicator dots */}
      <circle cx="33" cy="31" r="2" fill="#3B82F6" opacity="0.6" />
      <circle cx="39" cy="31" r="2" fill="#93C5FD" opacity="0.6" />
    </svg>
  );
};
