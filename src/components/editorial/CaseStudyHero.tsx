import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Project, ProjectSlug } from '../../types';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../icons/GithubIcon';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MeterFlowArtwork } from '../previews/artworks/MeterFlowArtwork';
import { AttendanceTrackerArtwork } from '../previews/artworks/AttendanceTrackerArtwork';
import { LeetCodeWidgetArtwork } from '../previews/artworks/LeetCodeWidgetArtwork';

interface CaseStudyHeroProps {
  project: Project;
}

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({ project }) => {
  const prefersReducedMotion = useReducedMotion();

  const renderArtwork = (slug: ProjectSlug) => {
    switch (slug) {
      case 'meter-flow':
        return <MeterFlowArtwork className="!h-64 sm:!h-80 md:!h-96" />;
      case 'attendance-tracker':
        return <AttendanceTrackerArtwork className="!h-64 sm:!h-80 md:!h-96" />;
      case 'leetcode-widget':
        return <LeetCodeWidgetArtwork className="!h-64 sm:!h-80 md:!h-96" />;
      default:
        return null;
    }
  };

  return (
    <header className="relative w-full mb-12 sm:mb-16">
      {/* Top Navigation Row: Back Link */}
      <div className="flex items-center justify-between mb-8 sm:mb-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink-muted hover:text-ink-primary transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue py-1.5"
          aria-label="Return to home page"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          <span>Back to corner</span>
        </Link>

        {/* Small Year & Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-surface border border-border-subtle shadow-xs text-xs font-medium text-ink-muted">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: project.accentColor }}
            aria-hidden="true"
          />
          <span>{project.category}</span>
          <span className="text-border-subtle">•</span>
          <span>{project.year}</span>
        </div>
      </div>

      {/* Main Title & Editorial Positioning Statement */}
      <div className="max-w-3xl">
        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-editorial text-4xl sm:text-6xl md:text-7xl text-ink-primary tracking-tight leading-[1.05] mb-6 text-balance"
        >
          {project.title}
        </motion.h1>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="text-lg sm:text-2xl text-ink-secondary font-sans font-normal leading-relaxed text-balance"
        >
          {project.subtitle}
        </motion.p>
      </div>

      {/* Verified Metadata Ribbon */}
      <div className="mt-8 pt-6 border-t border-border-subtle/80 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-left">
        <div>
          <span className="block text-[11px] uppercase font-semibold text-ink-muted tracking-wider">
            Role
          </span>
          <span className="text-sm font-medium text-ink-primary mt-1 block">
            {project.role}
          </span>
        </div>
        <div>
          <span className="block text-[11px] uppercase font-semibold text-ink-muted tracking-wider">
            Focus
          </span>
          <span className="text-sm font-medium text-ink-primary mt-1 block">
            {project.badgeText}
          </span>
        </div>
        <div>
          <span className="block text-[11px] uppercase font-semibold text-ink-muted tracking-wider">
            Timeline
          </span>
          <span className="text-sm font-medium text-ink-primary mt-1 block">
            {project.year}
          </span>
        </div>
        <div>
          <span className="block text-[11px] uppercase font-semibold text-ink-muted tracking-wider">
            Repository
          </span>
          <div className="mt-1">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-primary hover:text-accent-blue transition-colors group"
              >
                <GithubIcon size={14} />
                <span>GitHub Source</span>
                <ExternalLink
                  size={12}
                  className="text-ink-muted group-hover:text-accent-blue transition-colors"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Large Hero Visual: Multi-Layered Tactile Artwork */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        className="mt-10 sm:mt-12 rounded-3xl overflow-hidden border border-border-card shadow-preview bg-surface p-2 sm:p-3"
      >
        {renderArtwork(project.slug)}
      </motion.div>
    </header>
  );
};
