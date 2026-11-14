import React from 'react';
import { DottedBackground } from '../canvas/DottedBackground';

interface ShellProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Centered responsive layout shell providing structural landmarks,
 * accessibility skip link, and canvas dot container.
 */
export const Shell: React.FC<ShellProps> = ({ children, className = '' }) => {
  return (
    <DottedBackground>
      {/* Accessible skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink-primary focus:text-surface focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <div className={`flex-1 flex flex-col justify-between w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16 md:py-20 ${className}`}>
        {children}
      </div>
    </DottedBackground>
  );
};
