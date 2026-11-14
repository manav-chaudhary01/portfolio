import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

interface ArtworkProps {
  className?: string;
}

/**
 * Handcrafted multi-layered product artwork for Meter Flow.
 * Combines financial SaaS aesthetic, billing dashboard KPI cards,
 * linear burn-rate forecasting graph, and an isometric 3D "Bill" keycap.
 */
export const MeterFlowArtwork: React.FC<ArtworkProps> = ({ className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`relative w-full h-44 sm:h-52 bg-gradient-to-b from-[#F0F5FF] to-[#E5EDFA] rounded-2xl border border-blue-100 overflow-hidden flex items-center justify-center select-none ${className}`}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial from-blue-400/15 via-transparent to-transparent pointer-events-none" />

      {/* Layer 1: Back Panel — Multi-tenant Workspace & Service Catalog (Tilted Left) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 15, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -5 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="absolute w-56 sm:w-64 h-32 sm:h-36 bg-surface rounded-xl border border-border-card shadow-sm p-3 -translate-x-12 sm:-translate-x-16 -translate-y-2 pointer-events-none"
      >
        {/* Workspace Selector Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span className="text-[10px] font-semibold text-ink-primary font-sans">
              Production Workspace
            </span>
          </div>
          <span className="text-[8px] font-medium text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
            Owner
          </span>
        </div>

        {/* Catalog Items */}
        <div className="mt-2 space-y-1.5">
          <div className="flex items-center justify-between text-[9px] text-ink-secondary">
            <span>Inference API (metered)</span>
            <span className="font-mono text-ink-primary font-medium">$0.0024/req</span>
          </div>
          <div className="w-full bg-surface-subtle h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-3/4 rounded-full" />
          </div>
          <div className="flex items-center justify-between text-[9px] text-ink-secondary pt-0.5">
            <span>Vector Index Storage</span>
            <span className="font-mono text-ink-primary font-medium">$0.15/GB</span>
          </div>
          <div className="w-full bg-surface-subtle h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-400 h-full w-1/2 rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Layer 2: Front Hero Panel — Financial KPI & Linear Burn-Rate Forecast (Tilted Right) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
        className="relative z-10 w-64 sm:w-72 h-34 sm:h-38 bg-surface/95 backdrop-blur-sm rounded-xl border border-blue-200/80 shadow-tactile p-3 sm:p-3.5 translate-x-4 sm:translate-x-6 translate-y-1"
      >
        {/* Metric Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-wider font-semibold text-ink-muted block">
              MTD Invoiced Spend
            </span>
            <span className="text-base sm:text-lg font-bold font-sans text-ink-primary tracking-tight">
              $1,428.50
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold text-blue-700 bg-blue-100/70 border border-blue-200">
            Decimal.js Math
          </span>
        </div>

        {/* Burn Rate Forecast Visual / Chart */}
        <div className="mt-2 pt-2 border-t border-border-subtle">
          <div className="flex items-center justify-between text-[9px] mb-1">
            <span className="text-ink-secondary">Predictive Burn-Rate:</span>
            <span className="font-semibold text-blue-600">82% of Monthly Budget</span>
          </div>

          <svg viewBox="0 0 200 40" className="w-full h-8 overflow-visible">
            {/* Budget Limit line */}
            <line x1="0" y1="8" x2="200" y2="8" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <text x="160" y="6" fill="#EF4444" fontSize="7" fontWeight="bold">Cap $1,750</text>
            
            {/* Actual Spend Area */}
            <path
              d="M 0 35 L 30 32 L 60 28 L 90 26 L 120 20 L 140 16 L 140 38 L 0 38 Z"
              fill="rgba(59, 130, 246, 0.12)"
            />
            {/* Spend Curve */}
            <path
              d="M 0 35 L 30 32 L 60 28 L 90 26 L 120 20 L 140 16"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Linear Forecast Projection */}
            <path
              d="M 140 16 L 170 12 L 200 9"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              strokeLinecap="round"
            />
            {/* Current point */}
            <circle cx="140" cy="16" r="3" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
          </svg>
        </div>
      </motion.div>

      {/* Layer 3: Tactile 3D Extruded Keycap "Forecast" (Pixelwrld Motif) */}
      <motion.div
        initial={prefersReducedMotion ? false : { scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15, ease: 'backOut' }}
        className="absolute bottom-2 right-4 sm:right-8 z-20"
      >
        <svg width="48" height="42" viewBox="0 0 60 52" fill="none" className="drop-shadow-md">
          {/* 3D Base / Extrusion */}
          <path d="M 6 18 L 30 4 L 54 18 L 54 36 L 30 50 L 6 36 Z" fill="#1D4ED8" />
          <path d="M 30 50 L 54 36 L 54 18 L 30 32 Z" fill="#1E40AF" />
          <path d="M 6 36 L 30 50 L 30 32 L 6 18 Z" fill="#2563EB" />
          {/* Top Keycap Face */}
          <path d="M 6 18 L 30 4 L 54 18 L 30 32 Z" fill="#3B82F6" stroke="#93C5FD" strokeWidth="1.2" />
          {/* Text on Keycap Face */}
          <text
            x="30"
            y="20"
            fill="#FFFFFF"
            fontSize="8"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="sans-serif"
            transform="rotate(-2 30 20)"
          >
            BILL
          </text>
        </svg>
      </motion.div>
    </div>
  );
};
