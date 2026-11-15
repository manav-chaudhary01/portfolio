import React, { useState } from 'react';
import { GitHubHeatmapWeek, GitHubHeatmapMonth, ContributionLevel } from '../../types/activity';

interface GitHubHeatmapProps {
  weeks: GitHubHeatmapWeek[];
  months: GitHubHeatmapMonth[];
  totalContributions: number;
}

const LEVEL_COLORS: Record<ContributionLevel, string> = {
  0: 'bg-[#EBEDF0] border-transparent',
  1: 'bg-[#9BE9A8] border-emerald-300',
  2: 'bg-[#40C463] border-emerald-500',
  3: 'bg-[#30A14E] border-emerald-700',
  4: 'bg-[#216E39] border-emerald-900',
};

export const GitHubHeatmap: React.FC<GitHubHeatmapProps> = ({
  weeks,
  months,
  totalContributions,
}) => {
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // If no weeks provided, render fallback empty grid
  if (!weeks || weeks.length === 0) {
    return (
      <div className="w-full py-8 text-center text-xs font-mono text-ink-muted">
        No contribution calendar data available.
      </div>
    );
  }

  return (
    <div className="w-full relative select-none">
      {/* Scrollable Container with soft fade edges */}
      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border-subtle">
        <div className="min-w-[680px] p-2 bg-surface-subtle/40 rounded-2xl border border-border-subtle/60">
          {/* Month Labels Header */}
          <div className="flex text-[10px] font-mono text-ink-muted mb-1.5 pl-6">
            {months.map((m, idx) => (
              <span
                key={idx}
                style={{ width: `${Math.max(28, m.totalWeeks * 12.5)}px` }}
                className="truncate block"
              >
                {m.name}
              </span>
            ))}
          </div>

          {/* Grid with Weekday Labels on Left */}
          <div className="flex items-start gap-1">
            {/* Weekday indicators (Mon, Wed, Fri) */}
            <div className="flex flex-col justify-between h-[88px] text-[9px] font-mono text-ink-muted pr-1.5 pt-0.5 leading-none">
              <span></span>
              <span>Mon</span>
              <span></span>
              <span>Wed</span>
              <span></span>
              <span>Fri</span>
              <span></span>
            </div>

            {/* Weeks columns */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.days.map((day, dIdx) => (
                    <button
                      key={dIdx}
                      type="button"
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredDay({
                          date: day.date,
                          count: day.count,
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                        });
                      }}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-[10px] h-[10px] rounded-[2px] transition-transform hover:scale-125 focus:scale-125 focus:outline-none ${
                        LEVEL_COLORS[day.level]
                      }`}
                      aria-label={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Bar: Total & Legend */}
          <div className="mt-3 pt-2 border-t border-border-subtle/50 flex items-center justify-between text-[10px] font-mono text-ink-muted">
            <span>{totalContributions} contributions in the last year</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((lvl) => (
                <span
                  key={lvl}
                  className={`w-2.5 h-2.5 rounded-[2px] ${LEVEL_COLORS[lvl as ContributionLevel]}`}
                  aria-hidden="true"
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredDay && (
        <div
          role="tooltip"
          className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full mb-1.5 px-2.5 py-1 bg-ink-primary text-surface text-[10px] font-mono rounded-lg shadow-lg whitespace-nowrap"
          style={{
            left: hoveredDay.x,
            top: hoveredDay.y - 6,
          }}
        >
          <span className="font-semibold">
            {hoveredDay.count} contribution{hoveredDay.count === 1 ? '' : 's'}
          </span>{' '}
          on {hoveredDay.date}
        </div>
      )}
    </div>
  );
};
