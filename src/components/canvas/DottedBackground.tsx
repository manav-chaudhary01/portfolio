import React from 'react';

interface DottedBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Performant dotted canvas background foundation inspired by pixelwrld.co.
 * Renders a warm off-white surface with a subtle radial dot matrix.
 */
export const DottedBackground: React.FC<DottedBackgroundProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative min-h-screen w-full bg-canvas canvas-dot-grid overflow-x-hidden ${className}`}>
      {/* Optional ambient light vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 30%, transparent 60%, rgba(0, 0, 0, 0.03) 100%)',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 min-h-screen flex flex-col">{children}</div>
    </div>
  );
};
