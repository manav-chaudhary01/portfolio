import React, { useRef, useState } from 'react';

export const MagneticDotsWidget: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const rows = 4;
  const cols = 9;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-36 sm:h-40 bg-surface-subtle/70 rounded-2xl p-4 border border-border-subtle/80 flex flex-col justify-between select-none relative overflow-hidden"
    >
      <div className="flex items-center justify-between pb-2 border-b border-border-subtle text-[10px] font-mono text-ink-muted">
        <span>MAGNETIC DOT FIELD</span>
        <span>HOVER CURSOR</span>
      </div>

      <div className="flex-1 grid grid-cols-9 gap-2 items-center justify-items-center py-2">
        {Array.from({ length: rows * cols }).map((_, i) => {
          const colIndex = i % cols;
          const rowIndex = Math.floor(i / cols);

          // Approximate grid coordinates
          const dotX = (colIndex + 0.5) * (260 / cols);
          const dotY = (rowIndex + 0.5) * (70 / rows);

          let scale = 1;
          let color = '#CBD5E1';

          if (mousePos) {
            const dx = mousePos.x - dotX;
            const dy = mousePos.y - dotY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 60) {
              scale = 1 + (1 - dist / 60) * 1.8;
              color = '#10B981';
            }
          }

          return (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-transform duration-150 ease-out"
              style={{
                backgroundColor: color,
                transform: `scale(${scale})`,
              }}
            />
          );
        })}
      </div>

      <span className="text-[10px] font-mono text-ink-muted text-center">
        Proximity displacement: 60px radius
      </span>
    </div>
  );
};
