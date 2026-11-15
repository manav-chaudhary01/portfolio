import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const NotFoundPage: React.FC = () => {
  useDocumentTitle('404 Page Not Found — Manav Chaudhary', 'The requested page could not be found.');

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
      <span className="font-handwriting text-3xl text-ink-muted mb-2 select-none">
        oops! looks like you wandered off...
      </span>
      <h1 className="font-editorial text-5xl text-ink-primary mb-4">404 — Page Not Found</h1>
      <p className="text-ink-secondary mb-8 max-w-sm">
        The page you are looking for does not exist in this corner of the internet.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-ink-primary text-surface text-sm font-medium hover:bg-ink-primary/90 transition-colors shadow-xs"
      >
        <ArrowLeft size={16} />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
};
