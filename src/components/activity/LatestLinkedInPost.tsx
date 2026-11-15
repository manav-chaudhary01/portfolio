import React from 'react';
import { ProviderResponse, LinkedInPostData } from '../../types/activity';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { ActivitySkeleton } from './ActivitySkeleton';

interface LatestLinkedInPostProps {
  response: ProviderResponse<LinkedInPostData>;
}

export const LatestLinkedInPost: React.FC<LatestLinkedInPostProps> = ({ response }) => {
  const { status, data } = response;

  if (status === 'loading') {
    return <ActivitySkeleton title="Loading latest LinkedIn dispatch..." />;
  }

  // If no post configured, show a restrained, tasteful connection card
  if (!data || !data.text) {
    return (
      <div className="rounded-3xl border border-border-card bg-surface p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-100">
            in
          </div>
          <div>
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-muted block">
              Professional Network
            </span>
            <h4 className="font-editorial text-xl text-ink-primary">
              Connect on LinkedIn
            </h4>
            <p className="text-xs text-ink-secondary font-sans mt-0.5">
              Read professional essays, project releases, and engineering thoughts.
            </p>
          </div>
        </div>

        <a
          href="https://www.linkedin.com/in/manav-chaudhary13/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-ink-primary text-surface text-xs font-medium hover:bg-ink-primary/90 transition-all shadow-xs shrink-0"
        >
          <span>View Profile</span>
          <ArrowUpRight size={14} />
        </a>
      </div>
    );
  }

  const formatPublishDate = (isoString?: string) => {
    if (!isoString) return '';
    try {
      return new Date(isoString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="rounded-3xl border border-border-card bg-surface p-6 sm:p-7 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-100">
            in
          </div>
          <div>
            <span className="font-editorial text-lg text-ink-primary leading-tight block">
              Latest LinkedIn Dispatch
            </span>
            {data.publishedAt && (
              <span className="text-[10px] font-mono text-ink-muted block">
                {formatPublishDate(data.publishedAt)}
              </span>
            )}
          </div>
        </div>

        <a
          href={data.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-surface-subtle hover:bg-surface-hover text-xs font-medium text-ink-primary border border-border-subtle transition-all"
        >
          <span>Open Post</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Post Content Excerpt */}
      <div className="my-3 text-sm sm:text-base text-ink-secondary font-sans leading-relaxed">
        <p className="whitespace-pre-line">{data.text}</p>
      </div>

      {/* Optional Media Preview */}
      {data.imageUrl && (
        <div className="mt-4 rounded-2xl overflow-hidden border border-border-subtle max-h-56">
          <img
            src={data.imageUrl}
            alt="LinkedIn post visual"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-border-subtle/60 flex items-center justify-between text-[10px] font-mono text-ink-muted">
        <span>Verified Single Dispatch</span>
        <a
          href={data.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-secondary hover:text-ink-primary hover:underline"
        >
          Read full discussion on LinkedIn &rarr;
        </a>
      </div>
    </div>
  );
};
