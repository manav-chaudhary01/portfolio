import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { HandwrittenGreeting } from '../components/canvas/HandwrittenGreeting';
import { NavigationIsland } from '../components/navigation/NavigationIsland';
import { SocialDock } from '../components/footer/SocialDock';
import { WorkModal } from '../components/modals/WorkModal';
import { AboutModal } from '../components/modals/AboutModal';
import { PlaygroundModal } from '../components/modals/PlaygroundModal';
import { useProjectQuerySync } from '../hooks/useProjectQuerySync';
import { ABOUT_DATA } from '../data/about';
import { NavNodeId, ProjectSlug } from '../types';
import { ArrowUpRight, X, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../components/icons/GithubIcon';
import { backdropVariants, previewCardVariants } from '../animations/presets';

/**
 * Polished Minimal Homepage inspired by pixelwrld.co.
 * Integrates handcrafted 3D/illustrated navigation objects, spring physics,
 * soft blur focus transitions, expandable bottom dock, and URL-synchronized previews.
 */
export const HomePage: React.FC = () => {
  const { activeProject, openPreview, closePreview, isOpen: isProjectPreviewOpen } =
    useProjectQuerySync();

  const [activeModal, setActiveModal] = useState<NavNodeId | null>(null);
  const [isSocialDockOpen, setIsSocialDockOpen] = useState(false);

  // Handle clicking navigation objects on the homepage
  const handleSelectSection = (id: NavNodeId) => {
    if (id === 'work') {
      setActiveModal('work');
    } else if (id === 'about') {
      setActiveModal('about');
    } else if (id === 'playground') {
      setActiveModal('playground');
    } else if (id === 'contact') {
      setIsSocialDockOpen(true);
    }
  };

  const handleSelectProjectFromWork = (slug: ProjectSlug) => {
    setActiveModal(null);
    openPreview(slug);
  };

  const anyFocusActive = Boolean(activeModal || isProjectPreviewOpen || isSocialDockOpen);

  return (
    <div className="flex-1 flex flex-col justify-between items-center text-center relative w-full">
      {/* 1. Header with Handwritten Greeting */}
      <motion.header
        animate={{
          opacity: anyFocusActive ? 0.3 : 1,
          filter: anyFocusActive ? 'blur(3px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.25 }}
        className="w-full pt-4 pb-4 sm:pb-8 flex justify-center select-none"
      >
        <HandwrittenGreeting text={ABOUT_DATA.greeting} tiltAngle={-3.5} />
      </motion.header>

      {/* 2. Main Content Island: Handcrafted Navigation Objects & Intro Bio */}
      <main id="main-content" className="w-full flex flex-col items-center justify-center my-auto py-4 sm:py-8">
        <NavigationIsland
          activeSection={activeModal}
          onSelectSection={handleSelectSection}
        />

        {/* Centered Intro Statement (Pixelwrld Style) */}
        <motion.section
          aria-label="Personal summary"
          animate={{
            opacity: anyFocusActive ? 0.25 : 1,
            filter: anyFocusActive ? 'blur(4px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.25 }}
          className="max-w-xl mx-auto px-4 mt-6 sm:mt-10"
        >
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed font-sans font-normal text-center">
            {ABOUT_DATA.shortBio}
          </p>
        </motion.section>
      </main>

      {/* 3. Footer: Expandable Social Dock */}
      <SocialDock
        isOpen={isSocialDockOpen}
        onToggle={() => setIsSocialDockOpen((prev) => !prev)}
        onClose={() => setIsSocialDockOpen(false)}
      />

      {/* 4. Section Modals (Work, About, Playground) */}
      <WorkModal
        isOpen={activeModal === 'work'}
        onClose={() => setActiveModal(null)}
        onSelectProject={handleSelectProjectFromWork}
      />

      <AboutModal
        isOpen={activeModal === 'about'}
        onClose={() => setActiveModal(null)}
      />

      <PlaygroundModal
        isOpen={activeModal === 'playground'}
        onClose={() => setActiveModal(null)}
      />

      {/* 5. Pixelwrld-Inspired Expanding Project Preview Modal (Synchronized with URL ?project=slug) */}
      <AnimatePresence>
        {isProjectPreviewOpen && activeProject && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Soft Blur Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-ink-primary/25 backdrop-blur-md"
              onClick={closePreview}
              aria-hidden="true"
            />

            {/* Elevated Floating Preview Card */}
            <motion.div
              variants={previewCardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative z-10 w-full max-w-lg bg-surface border border-border-subtle rounded-modal p-6 sm:p-8 shadow-preview flex flex-col text-left"
            >
              {/* Category & Close Button */}
              <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: activeProject.accentColor }}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    {activeProject.category}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closePreview}
                  className="text-ink-muted hover:text-ink-primary p-1.5 rounded-full hover:bg-surface-subtle transition-colors cursor-pointer"
                  aria-label="Close project preview"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Title & Summary */}
              <div className="mt-5">
                <h2 id="preview-title" className="font-editorial text-3xl sm:text-4xl text-ink-primary tracking-tight">
                  {activeProject.title}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-ink-secondary leading-relaxed">
                  {activeProject.summary}
                </p>
              </div>

              {/* Verified Technology Badges */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {activeProject.technologies.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-medium text-ink-secondary bg-surface-subtle rounded-md border border-border-subtle"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Actions: Dedicated Editorial Case Study & Repository Link */}
              <div className="mt-8 pt-5 border-t border-border-subtle flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <Link
                  to={`/work/${activeProject.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-pill bg-ink-primary text-surface text-sm font-medium hover:bg-ink-primary/90 transition-colors shadow-xs"
                >
                  <span>Explore Case Study</span>
                  <ArrowUpRight size={16} />
                </Link>

                {activeProject.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-pill bg-surface-subtle hover:bg-surface-hover text-ink-primary text-sm font-medium border border-border-subtle transition-colors"
                  >
                    <GithubIcon size={16} />
                    <span>{link.label}</span>
                    <ExternalLink size={14} className="text-ink-muted" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
