import { PlaygroundExperiment, PlaygroundItem } from '../types';

export const PLAYGROUND_EXPERIMENTS: PlaygroundExperiment[] = [
  {
    slug: 'spring-physics',
    title: 'Spring Dynamics & Inertia',
    description:
      'Interactive tactile physics simulator exploring mass, stiffness, and critical damping coefficients with real-time spring oscillation curves.',
    category: 'Motion & Physics',
    status: 'live',
    date: '2026',
    badge: 'Interactive',
    layoutSpan: 'wide',
    accentColor: '#3B82F6',
    interactiveType: 'spring-physics',
  },
  {
    slug: 'magnetic-dots',
    title: 'Generative Dot Matrix',
    description:
      'Proximity-aware dot canvas reacting to pointer distance, velocity vectors, and tactile magnetic displacement.',
    category: 'Canvas & Math',
    status: 'live',
    date: '2026',
    badge: 'Interactive',
    layoutSpan: 'normal',
    accentColor: '#10B981',
    interactiveType: 'magnetic-dots',
  },
  {
    slug: 'audio-clicks',
    title: 'Synthesized Micro-Clicks',
    description:
      'Web Audio API procedural sound engine generating tactile mechanical key switches, tactile snaps, and spring clicks with zero audio file assets.',
    category: 'Web Audio API',
    status: 'live',
    date: '2026',
    badge: 'Web Audio',
    layoutSpan: 'normal',
    accentColor: '#F59E0B',
    interactiveType: 'audio-clicks',
  },
  {
    slug: 'recovery-curve',
    title: 'Threshold Recovery Asymptote',
    description:
      'Visual interactive exploration of the asymptotic equation x = ceil((pH - A)/(1 - p)), demonstrating why 100% recovery becomes mathematically impossible.',
    category: 'Applied Mathematics',
    status: 'in-progress',
    date: '2026',
    badge: 'In Progress',
    layoutSpan: 'wide',
    accentColor: '#10B981',
    interactiveType: 'recovery-curve',
  },
  {
    slug: 'shell-hierarchy',
    title: 'WorkerW Shell Tree Inspector',
    description:
      'Interactive diagram tracing the Windows Desktop Shell hierarchy from Progman message 0x052C down to WorkerW and SHELLDLL_DefView.',
    category: 'Systems & OS',
    status: 'concept',
    date: '2026',
    badge: 'Coming Soon',
    layoutSpan: 'normal',
    accentColor: '#8B5CF6',
    interactiveType: 'shell-hierarchy',
  },
];

// Re-export PLAYGROUND_ITEMS for backward compatibility with existing modals
export const PLAYGROUND_ITEMS: PlaygroundItem[] = PLAYGROUND_EXPERIMENTS.map((exp) => ({
  id: exp.slug,
  title: exp.title,
  description: exp.description,
  tag: exp.category,
  componentName: exp.interactiveType || 'Playground',
}));
