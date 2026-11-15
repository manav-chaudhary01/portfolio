import React, { useState } from 'react';
import { LeetCodeCalendarDay, ContributionLevel } from '../../types/activity';

interface LeetCodeHeatmapProps {
  calendarDays: LeetCodeCalendarDay[];
  streak: number;
  totalActiveDays: number;
}

const LEETCODE_LEVEL_COLORS: Record<ContributionLevel, string> = {
  0: 'bg-[#EBEDF0] border-transparent',
  1: 'bg-[#FED7AA] border-amber-300',
  2: 'bg-[#FDBA74] border-amber-400',
  3: 'bg-[#F97316] border-amber-600',
  4: 'bg-[#C2410C] border-amber-800',
};

export const LeetCodeHeatmap: React.FC<LeetCodeHeatmapProps> = ({
  calendarDays,
  streak,
  totalActiveDays,
}) => {
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  if (!calendarDays || calendarDays.length === 0) {
    return (
      <div className="w-full py-6 text-center text-xs font-mono text-ink-muted">
        No submission calendar history recorded.
      </div>
    );
  }

  // Group into columns of 7 days (weeks)
  const days = calendarDays.slice(-182); // Show past ~26 weeks
  const weeks: LeetCodeCalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="w-full relative select-none">
      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border-subtle">
        <div className="min-w-[440px] p-2 bg-surface-subtle/40 rounded-2xl border border-border-subtle/60">
          <div className="flex gap-[3px]">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px]">
                {week.map((day, dIdx) => (
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
                      LEETCODE_LEVEL_COLORS[day.level]
                    }`}
                    aria-label={`${day.count} submissions on ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-border-subtle/50 flex items-center justify-between text-[10px] font-mono text-ink-muted">
            <span>
              {streak}d streak • {totalActiveDays} active days
            </span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((lvl) => (
                <span
                  key={lvl}
                  className={`w-2.5 h-2.5 rounded-[2px] ${LEETCODE_LEVEL_COLORS[lvl as ContributionLevel]}`}
                  aria-hidden="true"
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

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
            {hoveredDay.count} submission{hoveredDay.count === 1 ? '' : 's'}
          </span>{' '}
          on {hoveredDay.date}
        </div>
      )}
    </div>
  );
};
