import { PersonalDetailItem } from '../types';

export interface FocusArea {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  keyAspects: string[];
}

export interface TechCategory {
  category: string;
  description: string;
  items: { name: string; verifiedIn: string }[];
}

export interface AboutData {
  name: string;
  role: string;
  greeting: string;
  editorialTagline: string;
  shortBio: string;
  story: {
    whatIBuild: string;
    problemSpaces: string;
    approach: string;
    exploring: string;
  };
  focusAreas: FocusArea[];
  techStack: TechCategory[];
  personalDetails: PersonalDetailItem[];
  principles: { title: string; description: string }[];
  fullBio: string[];
  skills: { category: string; items: string[] }[];
}

export const ABOUT_DATA: AboutData = {
  name: 'Manav Chaudhary',
  role: 'Software Engineer & Builder',
  greeting: 'welcome to my corner on the internet :)',
  editorialTagline:
    'Building reliable backend systems, local-first client tools, and tactile software where engineering rigor meets clean design.',
  shortBio:
    "Hey there! I'm Manav — a software engineer and builder with a burning desire to craft reliable, high-performance systems and tactile digital experiences. Whether architecting high-precision billing platforms, offline-first web apps, or native Windows utilities, I focus on software craft, system resilience, and clean design.",
  story: {
    whatIBuild:
      'I engineer backend systems, local-first client applications, and native desktop utilities. From multi-tenant SaaS billing engines processing high-volume metered usage to offline-first local databases and Win32 desktop shell hooks, I enjoy understanding how software behaves all the way from the user interface down to OS-level handles and database storage indexes.',
    problemSpaces:
      'I am drawn to problems that demand architectural discipline: financial calculations where IEEE 754 floating-point drift cannot be tolerated, client-side persistence that operates reliably without cloud lock-in, and ambient desktop utilities that integrate seamlessly with operating system shells without stealing focus or cluttering window switchers.',
    approach:
      'My engineering approach begins with mathematical correctness, deterministic state boundaries, and defensive testing. Once the foundation is unshakeable, I obsess over tactile polish: spring-based motion curves, generous typographic whitespace, and interfaces that feel physical, snappy, and respectful of user attention.',
    exploring:
      'Currently exploring distributed systems concepts, reactive client-side state engines, procedural web audio micro-interactions, and high-performance native desktop integrations.',
  },
  focusAreas: [
    {
      id: 'backend-systems',
      title: 'Backend Systems & Financial Precision',
      subtitle: 'Multi-Tenant SaaS & Ingestion Engines',
      description:
        'Architecting distributed backends with strict tenant data isolation, arbitrary-precision decimal arithmetic, database-enforced idempotency, and explainable spend alerting.',
      accentColor: '#3B82F6',
      keyAspects: [
        'Arbitrary-precision math with Decimal.js',
        'Database-enforced compound idempotency indexes',
        'Self-healing billing reconciliation pipelines',
        'Deterministic linear spend forecasting',
      ],
    },
    {
      id: 'local-first',
      title: 'Local-First Client Applications',
      subtitle: 'Zero-Cloud Offline Persistence',
      description:
        'Building client-side applications that store structured relational data directly in browser IndexedDB, guaranteeing sub-millisecond response times and complete privacy.',
      accentColor: '#10B981',
      keyAspects: [
        'IndexedDB multi-store persistence (idb v8)',
        'Atomic batch transactions preventing state drift',
        'Closed-form algebraic threshold equations',
        'Schema-validated client-side backup/restore',
      ],
    },
    {
      id: 'desktop-systems',
      title: 'Windows Desktop & Shell Interop',
      subtitle: 'Native Wallpaper Hooks & Ambient Tools',
      description:
        'Interfacing with low-level Win32 User32 APIs to build non-intrusive desktop utilities that anchor behind active windows onto the Windows desktop wallpaper layer.',
      accentColor: '#F59E0B',
      keyAspects: [
        'Win32 WorkerW desktop host discovery',
        'WS_EX_TOOLWINDOW and WS_EX_NOACTIVATE styles',
        'TaskbarCreated Explorer crash recovery hooks',
        'Atomic local cache serialization in %LOCALAPPDATA%',
      ],
    },
    {
      id: 'problem-solving',
      title: 'Algorithmic Problem Solving',
      subtitle: 'Mathematical Rigor & Consistency',
      description:
        'Applying continuous problem-solving discipline to algorithmic challenges, data structures, and mathematical modeling of real-world constraints.',
      accentColor: '#8B5CF6',
      keyAspects: [
        'Deriving closed-form mathematical solutions',
        'Defensive boundary and edge-case testing',
        'Consistency tracking and activity heatmaps',
        'Clean, interview-friendly code organization',
      ],
    },
  ],
  techStack: [
    {
      category: 'Languages & Core Runtimes',
      description: 'Primary programming languages and asynchronous runtimes used across production projects.',
      items: [
        { name: 'TypeScript', verifiedIn: 'Attendance Tracker & Portfolio' },
        { name: 'JavaScript (Node.js 24+ ESM)', verifiedIn: 'Meter Flow' },
        { name: 'C# 13 (.NET 10 LTS)', verifiedIn: 'LeetCode Desktop Widget' },
        { name: 'HTML5 & Modern CSS3', verifiedIn: 'All Web Projects' },
      ],
    },
    {
      category: 'Frontend & Client Architecture',
      description: 'Component architecture, modern bundling, reactive state, and client-side persistence.',
      items: [
        { name: 'React 19', verifiedIn: 'Attendance Tracker & Portfolio' },
        { name: 'Vite', verifiedIn: 'Attendance Tracker & Portfolio' },
        { name: 'Tailwind CSS', verifiedIn: 'Attendance Tracker & Portfolio' },
        { name: 'Motion for React', verifiedIn: 'Portfolio' },
        { name: 'IndexedDB (idb v8)', verifiedIn: 'Attendance Tracker' },
      ],
    },
    {
      category: 'Backend, Databases & APIs',
      description: 'Server frameworks, document databases, precision arithmetic, and API protocols.',
      items: [
        { name: 'Express.js 5', verifiedIn: 'Meter Flow' },
        { name: 'MongoDB Atlas & Mongoose 9', verifiedIn: 'Meter Flow' },
        { name: 'Decimal.js', verifiedIn: 'Meter Flow' },
        { name: 'GraphQL Client', verifiedIn: 'LeetCode Desktop Widget' },
        { name: 'JWT & RBAC Security', verifiedIn: 'Meter Flow' },
      ],
    },
    {
      category: 'Desktop Systems & Quality Tooling',
      description: 'Native window managers, automated testing frameworks, and developer workflows.',
      items: [
        { name: 'WPF & Win32 Shell Interop', verifiedIn: 'LeetCode Desktop Widget' },
        { name: 'node:test & Supertest', verifiedIn: 'Meter Flow' },
        { name: 'Vitest & Testing Library', verifiedIn: 'Attendance Tracker' },
        { name: 'xUnit', verifiedIn: 'LeetCode Desktop Widget' },
        { name: 'Git & GitHub', verifiedIn: 'All Repositories' },
      ],
    },
  ],
  personalDetails: [
    {
      label: 'Currently Building',
      value: 'Personal portfolio, tactile experiments sandbox, and systems micro-tools',
      note: 'Craft & polish',
    },
    {
      label: 'Currently Exploring',
      value: 'Distributed consensus algorithms, WebAssembly runtimes, and local-first CRDTs',
      note: 'Systems research',
    },
    {
      label: 'Favorite Work Environment',
      value: 'Neovim, Windows Terminal with PowerShell, and clean atomic Git commits',
      note: 'Workflow',
    },
    {
      label: 'Design Influences',
      value: 'Tactile physical hardware, Dieter Rams principles, and warm editorial typography',
      note: 'Aesthetics',
    },
  ],
  principles: [
    {
      title: 'Reliability & Precision',
      description: 'Zero tolerance for rounding bugs, silent state loss, or uncontrolled side effects. Always test for resilience.',
    },
    {
      title: 'Local-First & Fast',
      description: 'Respect user time and data privacy by prioritizing local persistence and sub-millisecond responsiveness.',
    },
    {
      title: 'Tactile Polish',
      description: 'Interfaces should feel physical, springy, and delightful without succumbing to unnecessary visual noise.',
    },
  ],
  fullBio: [
    "I believe great software emerges where solid engineering discipline meets thoughtful, human-centered interaction design. I love building things that feel snappy, resilient, and respectful of the user's attention.",
    'My recent work spans backend systems (multi-tenant SaaS billing engines with linear burn-rate predictive spend analytics in Node.js & MongoDB), modern local-first frontends (React 19 & IndexedDB), and low-level native desktop integrations (C#, WPF, and .NET 10 on Windows).',
    'When not writing code, I enjoy exploring interaction design, breaking down complex distributed systems papers, and building micro-experiments.',
  ],
  skills: [
    {
      category: 'Languages & Core',
      items: ['TypeScript', 'JavaScript (ESNext)', 'C# / .NET 10', 'HTML5 & Modern CSS', 'SQL'],
    },
    {
      category: 'Backend & Data',
      items: ['Node.js (v24+)', 'Express.js', 'MongoDB / Mongoose', 'REST APIs', 'Decimal.js Precision Math', 'JWT & RBAC'],
    },
    {
      category: 'Frontend & UI',
      items: ['React 19', 'Vite', 'Tailwind CSS', 'Motion for React', 'IndexedDB (idb)', 'Responsive Layouts'],
    },
    {
      category: 'Systems & Tooling',
      items: ['WPF & Win32 APIs', 'Git & GitHub', 'Vitest & Supertest', 'Linux & Windows Shell', 'Performance Profiling'],
    },
  ],
};
