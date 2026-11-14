import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { HandwrittenGreeting } from '../components/canvas/HandwrittenGreeting';
import { NavigationIsland } from '../components/navigation/NavigationIsland';
import { SocialDock } from '../components/footer/SocialDock';
import { WorkModal } from '../components/modals/WorkModal';
import { AboutModal } from '../components/modals/AboutModal';
import { PlaygroundModal } from '../components/modals/PlaygroundModal';
import { ProjectPreviewModal } from '../components/previews/ProjectPreviewModal';
import { useProjectQuerySync } from '../hooks/useProjectQuerySync';
import { ABOUT_DATA } from '../data/about';
import { NavNodeId, ProjectSlug } from '../types';

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

  // References to restore focus to invoking navigation controls
  const activeTriggerRef = useRef<HTMLElement | null>(null);

  // Handle clicking navigation objects on the homepage
  const handleSelectSection = (id: NavNodeId) => {
    activeTriggerRef.current = document.getElementById(`nav-tile-${id}`);

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

      {/* 4. Section Modals (Work, About, Playground) with Focus Trapping & Restoration */}
      <WorkModal
        isOpen={activeModal === 'work'}
        onClose={() => setActiveModal(null)}
        onSelectProject={handleSelectProjectFromWork}
        triggerRef={activeTriggerRef}
      />

      <AboutModal
        isOpen={activeModal === 'about'}
        onClose={() => setActiveModal(null)}
        triggerRef={activeTriggerRef}
      />

      <PlaygroundModal
        isOpen={activeModal === 'playground'}
        onClose={() => setActiveModal(null)}
        triggerRef={activeTriggerRef}
      />

      {/* 5. Pixelwrld-Inspired Expanding Project Preview Modal (Synchronized with URL ?project=slug) */}
      <ProjectPreviewModal
        isOpen={isProjectPreviewOpen}
        project={activeProject}
        onClose={closePreview}
        triggerRef={activeTriggerRef}
      />
    </div>
  );
};
