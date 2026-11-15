import React from 'react';

interface ActivitySkeletonProps {
  title?: string;
  className?: string;
}

export const ActivitySkeleton: React.FC<ActivitySkeletonProps> = ({
  title = 'Loading activity...',
  className = '',
}) => {
  return (
    <div
      className={`rounded-3xl border border-border-card bg-surface p-6 sm:p-7 shadow-xs animate-pulse flex flex-col justify-between ${className}`}
      aria-busy="true"
      aria-label={title}
    >
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
          <div className="h-4 w-28 bg-surface-subtle rounded-md" />
          <div className="h-4 w-16 bg-surface-subtle rounded-md" />
        </div>

        <div className="h-6 w-44 bg-surface-subtle rounded-md mb-2" />
        <div className="h-3 w-64 bg-surface-subtle rounded-md mb-6" />

        <div className="h-28 w-full bg-surface-subtle/80 rounded-2xl mb-4" />
      </div>

      <div className="pt-3 border-t border-border-subtle/60 flex items-center justify-between">
        <div className="h-3 w-20 bg-surface-subtle rounded" />
        <div className="h-3 w-16 bg-surface-subtle rounded" />
      </div>
    </div>
  );
};
