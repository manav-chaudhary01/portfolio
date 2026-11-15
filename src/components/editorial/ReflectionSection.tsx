import React from 'react';
import { Lightbulb, Scale, Compass } from 'lucide-react';

interface ReflectionProps {
  learnings: string[];
  tradeoffs: string[];
  futureRoadmap: string[];
  accentColor: string;
}

export const ReflectionSection: React.FC<ReflectionProps> = ({
  learnings,
  tradeoffs,
  futureRoadmap,
  accentColor,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Architectural Learnings */}
      <div className="rounded-3xl border border-border-card bg-surface p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-4 text-ink-primary">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-surface text-xs"
              style={{ backgroundColor: accentColor }}
            >
              <Lightbulb size={16} />
            </div>
            <h3 className="font-editorial text-xl text-ink-primary">
              Core Lessons
            </h3>
          </div>
          <ul className="space-y-3">
            {learnings.map((learning, index) => (
              <li
                key={index}
                className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans"
              >
                • {learning}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Engineering Trade-offs */}
      <div className="rounded-3xl border border-border-card bg-surface p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-4 text-ink-primary">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-amber-500 text-surface text-xs">
              <Scale size={16} />
            </div>
            <h3 className="font-editorial text-xl text-ink-primary">
              Accepted Trade-offs
            </h3>
          </div>
          <ul className="space-y-3">
            {tradeoffs.map((tradeoff, index) => (
              <li
                key={index}
                className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans"
              >
                • {tradeoff}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Future Roadmap */}
      <div className="rounded-3xl border border-border-card bg-surface p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-4 text-ink-primary">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-ink-primary text-surface text-xs">
              <Compass size={16} />
            </div>
            <h3 className="font-editorial text-xl text-ink-primary">
              Future Scope
            </h3>
          </div>
          <ul className="space-y-3">
            {futureRoadmap.map((item, index) => (
              <li
                key={index}
                className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans"
              >
                • {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
