import React from 'react';

interface IllustrationProps {
  className?: string;
  size?: number;
}

/**
 * Handcrafted tactile split-color smiley face illustration for "Contact / Reach Out".
 * Dual-tone split (off-white / spring green) with beveled depth and friendly smile
 * directly inspired by pixelwrld.co.
 */
export const ContactIllustration: React.FC<IllustrationProps> = ({ size = 72, className = '' }) => {
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
        <filter id="contact-shadow" x="12" y="60" width="76" height="36" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <linearGradient id="white-half" x1="25" y1="20" x2="50" y2="75" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E2E8F0" />
        </linearGradient>
        <linearGradient id="green-half" x1="50" y1="20" x2="80" y2="75" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ADE80" />
          <stop offset="1" stopColor="#22C55E" />
        </linearGradient>
      </defs>

      {/* Ambient Floor Shadow */}
      <ellipse cx="50" cy="80" rx="30" ry="9" fill="rgba(34, 197, 94, 0.22)" filter="url(#contact-shadow)" />

      {/* Base 3D Depth Rim */}
      <path
        d="M 50 18 A 32 32 0 0 1 82 50 C 82 68 68 84 50 84 C 32 84 18 68 18 50 A 32 32 0 0 1 50 18 Z"
        fill="#15803D"
      />

      {/* Main Face Container (shifted 3px up for 3D extrusion) */}
      <g transform="translate(0, -3)">
        {/* Left White Half */}
        <path
          d="M 50 18 A 32 32 0 0 0 18 50 C 18 67.6 32.4 82 50 82 Z"
          fill="url(#white-half)"
          stroke="#0F172A"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* Right Green Half */}
        <path
          d="M 50 18 A 32 32 0 0 1 82 50 C 82 67.6 67.6 82 50 82 Z"
          fill="url(#green-half)"
          stroke="#0F172A"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* Center Dividing Seam */}
        <line x1="50" y1="18" x2="50" y2="82" stroke="#0F172A" strokeWidth="1.6" />

        {/* Left Eye */}
        <ellipse cx="38" cy="46" rx="2.5" ry="4" fill="#0F172A" />

        {/* Right Eye */}
        <ellipse cx="62" cy="46" rx="2.5" ry="4" fill="#0F172A" />

        {/* Friendly Curved Smile across center */}
        <path
          d="M 37 57 Q 50 70 63 57"
          stroke="#0F172A"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Glossy Curved Highlight on Left Cheek */}
        <path
          d="M 24 36 A 28 28 0 0 1 44 22"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
