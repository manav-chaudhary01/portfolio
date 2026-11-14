import { PlaygroundItem } from '../types';

export const PLAYGROUND_ITEMS: PlaygroundItem[] = [
  {
    id: 'spring-physics',
    title: 'Spring Dynamics & Inertia',
    description: 'Interactive tactile physics simulator exploring mass, stiffness, and critical damping curves.',
    tag: 'Motion & Physics',
    componentName: 'SpringPlayground',
  },
  {
    id: 'dot-canvas',
    title: 'Generative Dot Field',
    description: 'Proximity-aware magnetic dot matrix reacting to cursor velocity and pointer distance.',
    tag: 'Canvas & Math',
    componentName: 'DotFieldPlayground',
  },
  {
    id: 'haptic-audio',
    title: 'Synthesized Micro-Clicks',
    description: 'Web Audio API procedural sound effects emulating mechanical key switches and tactile snaps.',
    tag: 'Web Audio API',
    componentName: 'AudioPlayground',
  },
];
