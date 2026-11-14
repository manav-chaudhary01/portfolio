import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProjectSlug } from '../types';
import { PROJECTS } from '../data/projects';

/**
 * Hook to synchronize project preview modals with the URL search query (?project=slug)
 * Supports browser history navigation (Back/Forward) and direct URL loading.
 */
export function useProjectQuerySync() {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawSlug = searchParams.get('project');
  // Validate that the slug is a genuine registered project
  const activeSlug: ProjectSlug | null =
    rawSlug && rawSlug in PROJECTS ? (rawSlug as ProjectSlug) : null;

  const openPreview = useCallback(
    (slug: ProjectSlug) => {
      setSearchParams({ project: slug }, { replace: false });
    },
    [setSearchParams]
  );

  const closePreview = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('project');
        return next;
      },
      { replace: false }
    );
  }, [setSearchParams]);

  return {
    activeSlug,
    activeProject: activeSlug ? PROJECTS[activeSlug] : null,
    openPreview,
    closePreview,
    isOpen: activeSlug !== null,
  };
}
