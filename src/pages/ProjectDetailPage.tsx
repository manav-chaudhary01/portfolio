import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { ProjectSlug } from '../types';
import { ArrowLeft } from 'lucide-react';
import { CaseStudyHero } from '../components/editorial/CaseStudyHero';
import { CaseStudySection } from '../components/editorial/CaseStudySection';
import { ArchitectureFlow } from '../components/editorial/ArchitectureFlow';
import { EngineeringDecisions } from '../components/editorial/EngineeringDecisions';
import { FeatureShowcase } from '../components/editorial/FeatureShowcase';
import { TestingCard } from '../components/editorial/TestingCard';
import { ReflectionSection } from '../components/editorial/ReflectionSection';
import { ProjectNavigation } from '../components/editorial/ProjectNavigation';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

/**
 * Dedicated editorial project case study page (/work/:slug).
 * Inspired by Portal's product storytelling and editorial clarity,
 * grounded strictly in audited project codebases.
 */
export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Scroll to top whenever the active project slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  const project = slug && slug in PROJECTS ? PROJECTS[slug as ProjectSlug] : null;

  useDocumentTitle(
    project ? `${project.title} — Case Study` : 'Project Not Found',
    project ? project.subtitle : undefined
  );

  if (!project || !project.caseStudy) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center py-24 text-center">
        <h1 className="font-editorial text-4xl sm:text-5xl text-ink-primary mb-4">
          Case Study Not Found
        </h1>
        <p className="text-sm sm:text-base text-ink-secondary mb-8 font-sans max-w-md">
          The requested project case study could not be located or has not yet been published.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-ink-primary text-surface text-sm font-medium hover:bg-ink-primary/90 transition-colors shadow-xs"
        >
          <ArrowLeft size={16} />
          <span>Return to Homepage</span>
        </Link>
      </main>
    );
  }

  const { caseStudy } = project;

  return (
    <main className="flex-1 flex flex-col w-full max-w-4xl mx-auto py-6 sm:py-10 animate-in fade-in duration-300">
      {/* 1. Hero Section */}
      <CaseStudyHero project={project} />

      {/* 2. Problem Definition */}
      <CaseStudySection
        id="problem"
        tag="01 / The Problem"
        title="Context & Core Engineering Challenge"
        note="The Reality"
      >
        <p className="text-base sm:text-lg text-ink-secondary leading-relaxed font-sans mb-8">
          {caseStudy.problem.overview}
        </p>

        {/* Friction Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {caseStudy.problem.painPoints.map((point, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-surface border border-border-card shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-start gap-3">
                <span
                  className="w-2 h-2 rounded-full shrink-0 mt-2"
                  style={{ backgroundColor: project.accentColor }}
                  aria-hidden="true"
                />
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
                  {point}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Challenge Callout */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-subtle/80 border border-border-subtle relative">
          <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-muted mb-2">
            Primary Engineering Objective
          </span>
          <p className="text-sm sm:text-base font-medium text-ink-primary font-sans leading-relaxed">
            {caseStudy.problem.technicalChallenge}
          </p>
        </div>
      </CaseStudySection>

      {/* 3. Architectural Approach */}
      <CaseStudySection
        id="approach"
        tag="02 / Architectural Approach"
        title="High-Level Strategy & Design Tenets"
        note="Principles"
      >
        <p className="text-base sm:text-lg text-ink-secondary leading-relaxed font-sans mb-8">
          {caseStudy.approach.summary}
        </p>

        {/* Core Tenets Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {caseStudy.approach.coreTenets.map((tenet, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-surface border border-border-card shadow-xs flex items-start gap-3.5"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-mono text-[10px] font-bold text-surface shadow-2xs mt-0.5"
                style={{ backgroundColor: project.accentColor }}
              >
                {index + 1}
              </div>
              <p className="text-xs sm:text-sm font-medium text-ink-primary font-sans leading-snug">
                {tenet}
              </p>
            </div>
          ))}
        </div>

        {/* Verified Layer Matrix */}
        <div className="rounded-3xl border border-border-card bg-surface overflow-hidden shadow-xs">
          <div className="px-6 py-4 bg-surface-subtle/50 border-b border-border-subtle flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-muted">
              System Layer Decomposition
            </span>
            <span className="text-xs font-mono text-ink-muted">
              {project.architecture.length} Verified Modules
            </span>
          </div>
          <div className="divide-y divide-border-subtle">
            {project.architecture.map((layer, index) => (
              <div
                key={index}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 hover:bg-surface-subtle/30 transition-colors"
              >
                <div className="w-full sm:w-1/3 shrink-0">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted block">
                    {layer.layer}
                  </span>
                  <span className="text-sm font-semibold text-ink-primary font-sans mt-0.5 block">
                    {layer.technology}
                  </span>
                </div>
                <div className="w-full sm:w-2/3">
                  <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
                    {layer.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CaseStudySection>

      {/* 4. Data Flow & Pipeline */}
      <CaseStudySection
        id="data-flow"
        tag="03 / System Data Flow"
        title="Runtime Execution & Boundary Traversal"
        note="Under the hood"
      >
        <ArchitectureFlow
          title={caseStudy.architectureFlow.title}
          subtitle={caseStudy.architectureFlow.subtitle}
          steps={caseStudy.architectureFlow.steps}
          accentColor={project.accentColor}
        />
      </CaseStudySection>

      {/* 5. Key Engineering Decisions */}
      <CaseStudySection
        id="decisions"
        tag="04 / Engineering Decisions"
        title="Deliberate Architectural Choices & Trade-offs"
        note="Engineering judgment"
      >
        <p className="text-sm sm:text-base text-ink-secondary leading-relaxed font-sans mb-8">
          Real-world software engineering is a series of trade-offs. Rather than defaulting to generic conventions, each critical architectural choice was made with deliberate reasoning and measured trade-offs:
        </p>

        <EngineeringDecisions
          decisions={caseStudy.engineeringDecisions}
          accentColor={project.accentColor}
        />
      </CaseStudySection>

      {/* 6. Feature & Implementation Showcase */}
      <CaseStudySection
        id="features"
        tag="05 / Implementation Deep Dive"
        title="Flagship Capabilities & Verified Code Excerpts"
        note="Code in action"
      >
        <FeatureShowcase
          features={caseStudy.featureShowcases}
          accentColor={project.accentColor}
        />
      </CaseStudySection>

      {/* 7. Testing & Reliability */}
      <CaseStudySection
        id="testing"
        tag="06 / Verification & Testing"
        title="Empirical Reliability & Test Coverage"
        note="Verified safe"
      >
        <TestingCard
          testing={caseStudy.testing}
          accentColor={project.accentColor}
        />
      </CaseStudySection>

      {/* 8. Reflection & Retrospective */}
      <CaseStudySection
        id="reflection"
        tag="07 / Engineering Retrospective"
        title="Reflections, Lessons & Future Roadmap"
        note="Retrospective"
      >
        <ReflectionSection
          learnings={caseStudy.reflection.learnings}
          tradeoffs={caseStudy.reflection.tradeoffs}
          futureRoadmap={caseStudy.reflection.futureRoadmap}
          accentColor={project.accentColor}
        />
      </CaseStudySection>

      {/* 9. Project Links & Pagination Navigation */}
      <ProjectNavigation currentSlug={project.slug} />
    </main>
  );
};
