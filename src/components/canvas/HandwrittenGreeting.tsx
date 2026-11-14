import React from 'react';

interface HandwrittenGreetingProps {
  text?: string;
  className?: string;
  tiltAngle?: number;
}

/**
 * Handwritten greeting inspired by pixelwrld.co.
 * Rendered using Caveat font with intentional tilt and relaxed line-height.
 */
export const HandwrittenGreeting: React.FC<HandwrittenGreetingProps> = ({
  text = 'Welcome to my corner on the internet :)',
  className = '',
  tiltAngle = -3.5,
}) => {
  return (
    <div
      className={`inline-block select-none text-center transition-transform duration-300 ${className}`}
      style={{ transform: `rotate(${tiltAngle}deg)` }}
      aria-label={text}
    >
      <span className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-[#524F49] tracking-wide leading-tight">
        {text}
      </span>
    </div>
  );
};
