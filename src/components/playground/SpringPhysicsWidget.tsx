import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { RotateCcw } from 'lucide-react';

export const SpringPhysicsWidget: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [stiffness, setStiffness] = useState(250);
  const [damping, setDamping] = useState(15);
  const [triggerKey, setTriggerKey] = useState(0);

  const handlePulse = () => {
    setTriggerKey((k) => k + 1);
  };

  return (
    <div className="w-full bg-surface-subtle/70 rounded-2xl p-4 sm:p-5 border border-border-subtle/80 flex flex-col gap-4">
      {/* Visual Canvas */}
      <div className="h-28 sm:h-32 w-full bg-surface rounded-xl border border-border-card flex items-center justify-center relative overflow-hidden select-none">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-radial from-blue-400/10 via-transparent to-transparent pointer-events-none" />

        {/* Center resting line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px border-l border-dashed border-border-subtle pointer-events-none" />

        {/* Oscillating Bob */}
        <motion.div
          key={triggerKey}
          initial={prefersReducedMotion ? false : { x: -80, scale: 0.9 }}
          animate={{ x: 0, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: stiffness,
            damping: damping,
            mass: 1,
          }}
          className="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-surface flex items-center justify-center font-mono text-[10px] font-bold shadow-tactile cursor-grab active:cursor-grabbing"
        >
          <span>BOB</span>
        </motion.div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
        <div>
          <div className="flex justify-between text-ink-secondary mb-1">
            <span>Stiffness: {stiffness}</span>
          </div>
          <input
            type="range"
            min="50"
            max="600"
            step="10"
            value={stiffness}
            onChange={(e) => setStiffness(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
            aria-label="Spring stiffness slider"
          />
        </div>

        <div>
          <div className="flex justify-between text-ink-secondary mb-1">
            <span>Damping: {damping}</span>
          </div>
          <input
            type="range"
            min="5"
            max="40"
            step="1"
            value={damping}
            onChange={(e) => setDamping(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
            aria-label="Spring damping slider"
          />
        </div>
      </div>

      {/* Trigger Button */}
      <div className="flex items-center justify-between pt-2 border-t border-border-subtle/80">
        <span className="text-[11px] font-sans text-ink-muted">
          Adjust sliders & trigger displacement
        </span>
        <button
          type="button"
          onClick={handlePulse}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-ink-primary text-surface text-xs font-medium hover:bg-ink-primary/90 transition-all active:scale-95 shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
        >
          <RotateCcw size={12} />
          <span>Release Spring</span>
        </button>
      </div>
    </div>
  );
};
