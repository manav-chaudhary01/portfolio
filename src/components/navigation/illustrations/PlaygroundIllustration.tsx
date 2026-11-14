import React from 'react';

interface IllustrationProps {
  className?: string;
  size?: number;
}

/**
 * Handcrafted isometric 3D Rubik's/geometry block illustration for "Playground".
 * Multi-faceted colorful faces (lime, cyan, magenta, orange) with crisp isometric
 * perspective and ambient floor shadow inspired by pixelwrld.co.
 */
export const PlaygroundIllustration: React.FC<IllustrationProps> = ({ size = 72, className = '' }) => {
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
        {/* Soft Ambient Floor Shadow */}
        <filter id="cube-shadow" x="12" y="62" width="76" height="34" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* Ambient Floor Shadow */}
      <ellipse cx="50" cy="79" rx="30" ry="10" fill="rgba(16, 185, 129, 0.22)" filter="url(#cube-shadow)" />

      {/* Cube Group with isometric projection */}
      <g transform="translate(50, 48)">
        {/* === TOP LAYER CUBES === */}
        {/* Cube 1 (Top Center: Vibrant Lime / Green) */}
        {/* Top Face */}
        <path d="M 0 -28 L 18 -18 L 0 -8 L -18 -18 Z" fill="#84CC16" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Left Face */}
        <path d="M -18 -18 L 0 -8 L 0 8 L -18 -2 Z" fill="#65A30D" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Right Face */}
        <path d="M 0 -8 L 18 -18 L 18 -2 L 0 8 Z" fill="#4D7C0F" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />

        {/* Cube 2 (Right Wing: Electric Magenta / Violet) */}
        {/* Top Face */}
        <path d="M 18 -18 L 36 -8 L 18 2 L 0 -8 Z" fill="#C084FC" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Right Face */}
        <path d="M 18 2 L 36 -8 L 36 8 L 18 18 Z" fill="#9333EA" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Left / Front seam */}
        <path d="M 0 -8 L 18 2 L 18 18 L 0 8 Z" fill="#A855F7" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />

        {/* Cube 3 (Left Front: Bright Cyan / Sky Blue) */}
        {/* Top Face */}
        <path d="M -18 -2 L 0 8 L -18 18 L -36 8 Z" fill="#38BDF8" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Left Face */}
        <path d="M -36 8 L -18 18 L -18 34 L -36 24 Z" fill="#0284C7" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Right / Front Face */}
        <path d="M -18 18 L 0 8 L 0 24 L -18 34 Z" fill="#0EA5E9" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />

        {/* Cube 4 (Bottom Right Front: Vibrant Warm Amber / Coral) */}
        {/* Top Face */}
        <path d="M 0 8 L 18 -2 L 36 8 L 18 18 Z" fill="#FBBF24" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Right Face */}
        <path d="M 18 18 L 36 8 L 36 24 L 18 34 Z" fill="#D97706" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Left Front Face */}
        <path d="M 0 8 L 18 18 L 18 34 L 0 24 Z" fill="#F59E0B" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    </svg>
  );
};
