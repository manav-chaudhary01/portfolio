import React from 'react';

interface IllustrationProps {
  className?: string;
  size?: number;
}

/**
 * Handcrafted tactile Avatar portrait illustration for "About".
 * Warm, friendly aesthetic featuring clean silhouette, subtle lighting,
 * and circular badge depth inspired by pixelwrld.co.
 */
export const AboutIllustration: React.FC<IllustrationProps> = ({ size = 72, className = '' }) => {
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
        <filter id="about-shadow" x="12" y="58" width="76" height="38" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <linearGradient id="avatar-bg" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2A2825" />
          <stop offset="1" stopColor="#141312" />
        </linearGradient>
        <linearGradient id="skin-tone" x1="40" y1="35" x2="60" y2="65" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E0AC69" />
          <stop offset="1" stopColor="#C68B45" />
        </linearGradient>
      </defs>

      {/* Ambient Floor Shadow */}
      <ellipse cx="50" cy="78" rx="30" ry="9" fill="rgba(20, 19, 18, 0.25)" filter="url(#about-shadow)" />

      {/* Base 3D Depth Rim */}
      <circle cx="50" cy="51" r="34" fill="#0D0C0B" />

      {/* Circular Avatar Badge Container */}
      <circle
        cx="50"
        cy="48"
        r="34"
        fill="url(#avatar-bg)"
        stroke="#423E3A"
        strokeWidth="1.5"
      />

      {/* Light edge rim highlight */}
      <path
        d="M 28 32 A 32 32 0 0 1 72 32"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Mask to clip silhouette inside circle */}
      <mask id="avatar-clip">
        <circle cx="50" cy="48" r="33" fill="#FFFFFF" />
      </mask>

      <g mask="url(#avatar-clip)">
        {/* Dark Shirt / Shoulders */}
        <path
          d="M 22 84 C 22 68 34 62 50 62 C 66 62 78 68 78 84 Z"
          fill="#35312C"
          stroke="#47423B"
          strokeWidth="1.5"
        />

        {/* Neck */}
        <rect x="44" y="52" width="12" height="14" rx="4" fill="#C68B45" />

        {/* Head / Face */}
        <ellipse cx="50" cy="42" rx="14" ry="16" fill="url(#skin-tone)" />

        {/* Styled Hair */}
        <path
          d="M 36 38 C 34 30 40 24 50 24 C 60 24 66 30 64 38 C 62 30 56 26 50 26 C 44 26 38 30 36 38 Z"
          fill="#1F1D1B"
        />
        <path
          d="M 37 36 C 36 33 42 27 52 27 C 62 27 64 34 63 36 C 58 31 43 31 37 36 Z"
          fill="#141312"
        />

        {/* Minimal friendly eyes & smile */}
        <circle cx="45" cy="42" r="1.5" fill="#262320" />
        <circle cx="55" cy="42" r="1.5" fill="#262320" />
        <path
          d="M 46 48 Q 50 51 54 48"
          stroke="#262320"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
};
