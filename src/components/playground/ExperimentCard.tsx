import React from 'react';
import { PlaygroundExperiment } from '../../types';
import { SpringPhysicsWidget } from './SpringPhysicsWidget';
import { MagneticDotsWidget } from './MagneticDotsWidget';
import { AudioClicksWidget } from './AudioClicksWidget';
import { Sparkles, Clock, Compass } from 'lucide-react';

interface ExperimentCardProps {
  experiment: PlaygroundExperiment;
}

export const ExperimentCard: React.FC<ExperimentCardProps> = ({ experiment }) => {
  const isWide = experiment.layoutSpan === 'wide';

  const renderInteractiveWidget = () => {
    switch (experiment.interactiveType) {
      case 'spring-physics':
        return <SpringPhysicsWidget />;
      case 'magnetic-dots':
        return <MagneticDotsWidget />;
      case 'audio-clicks':
        return <AudioClicksWidget />;
      case 'recovery-curve':
        return (
          <div className="w-full h-32 sm:h-36 bg-surface-subtle/70 rounded-2xl p-4 border border-border-subtle flex flex-col justify-between">
            <div className="flex justify-between items-center text-[10px] font-mono text-ink-muted">
              <span>ASYMPTOTIC CURVATURE</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                PROTOTYPING
              </span>
            </div>
            {/* SVG asymptotic curve */}
            <svg viewBox="0 0 300 70" className="w-full h-16 stroke-current text-emerald-600">
              <path
                d="M 10 60 Q 180 55 240 30 T 290 5"
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line x1="10" y1="65" x2="290" y2="65" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
              <line x1="290" y1="5" x2="290" y2="65" stroke="rgba(0,0,0,0.15)" strokeDasharray="3,3" />
            </svg>
            <div className="flex justify-between text-[9px] font-mono text-ink-muted">
              <span>x = ceil((pH - A) / (1 - p))</span>
              <span>lim(p→1.0) = ∞</span>
            </div>
          </div>
        );
      case 'shell-hierarchy':
        return (
          <div className="w-full h-32 sm:h-36 bg-surface-subtle/70 rounded-2xl p-4 border border-border-subtle flex flex-col justify-between">
            <div className="flex justify-between items-center text-[10px] font-mono text-ink-muted">
              <span>WIN32 HIERARCHY</span>
              <span className="text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                RESEARCH DRAFT
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono py-1">
              <span className="p-1.5 rounded bg-surface border border-border-subtle">Progman</span>
              <span className="text-ink-muted">→ 0x052C →</span>
              <span className="p-1.5 rounded bg-surface border border-purple-300 text-purple-700 font-bold">WorkerW</span>
              <span className="text-ink-muted">behind</span>
              <span className="p-1.5 rounded bg-surface border border-border-subtle">SHELLDLL</span>
            </div>
            <span className="text-[9px] font-mono text-ink-muted text-center">
              Parent window handle discovery & zero-focus extended styles
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  const renderStatusBadge = () => {
    switch (experiment.status) {
      case 'live':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-medium">
            <Sparkles size={10} />
            <span>Interactive</span>
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-mono font-medium">
            <Clock size={10} />
            <span>In Progress</span>
          </span>
        );
      case 'concept':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-mono font-medium">
            <Compass size={10} />
            <span>Concept</span>
          </span>
        );
    }
  };

  return (
    <div
      className={`rounded-3xl border border-border-card bg-surface p-6 sm:p-7 shadow-xs hover:border-border-subtle transition-all duration-200 flex flex-col justify-between ${
        isWide ? 'col-span-1 md:col-span-2' : 'col-span-1'
      }`}
    >
      <div>
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: experiment.accentColor }}
              aria-hidden="true"
            />
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
              {experiment.category}
            </span>
          </div>
          {renderStatusBadge()}
        </div>

        {/* Title & Description */}
        <h3 className="font-editorial text-2xl sm:text-3xl text-ink-primary tracking-tight mb-2">
          {experiment.title}
        </h3>
        <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans mb-6">
          {experiment.description}
        </p>
      </div>

      {/* Interactive Canvas / Widget */}
      <div className="mt-auto pt-2">{renderInteractiveWidget()}</div>
    </div>
  );
};
