import { Project, ProjectSlug } from '../types';

export const PROJECTS: Record<ProjectSlug, Project> = {
  'meter-flow': {
    id: 'meter-flow',
    slug: 'meter-flow',
    title: 'Meter Flow',
    subtitle: 'Multi-Tenant SaaS Metered Billing Platform with Predictive Spend Alerts',
    tagline: 'High-precision usage billing and explainable linear burn-rate forecasting for modern cloud services.',
    category: 'Backend & Distributed Systems',
    year: '2026',
    role: 'Lead Architect & Backend Engineer',
    accentColor: '#3B82F6',
    badgeText: 'Billing Engine & Analytics',
    technologies: [
      'Node.js 24+',
      'Express.js 5',
      'MongoDB Atlas',
      'Mongoose 9',
      'Decimal.js',
      'JWT & RBAC',
      'node:test & Supertest',
    ],
    summary:
      'A multi-tenant SaaS backend engineered to monitor digital service consumption, calculate usage-based costs with arbitrary-precision arithmetic, and deliver explainable predictive burn-rate spend alerts.',
    description:
      'MeterFlow tackles the complexities of usage-based software pricing. Built on Node.js 24 and Express 5, it isolates tenant data across personal and organization workspaces, processes metered and hybrid pricing models idempotently, and provides early warning alerts before cloud spend overshoots monthly budgets.',
    highlights: [
      'Multi-tenant workspace isolation enforcing role-based permissions (owner, admin, member).',
      'Arbitrary-precision financial arithmetic powered by Decimal.js to eliminate floating-point rounding errors.',
      'Idempotent ingestion pipeline preventing duplicate billing for retried usage reports.',
      'Explainable linear burn-rate predictive spend alerts with configurable warning thresholds.',
      'Robust automated test suite featuring 163 unit and integration tests across 46 suites.',
    ],
    architecture: [
      {
        layer: 'Runtime & HTTP Layer',
        technology: 'Node.js 24+ / Express.js 5',
        description: 'Native ES modules, async pipeline error handling, Helmet security headers, and CORS control.',
      },
      {
        layer: 'Data Storage & Tenancy',
        technology: 'MongoDB Atlas & Mongoose 9',
        description: 'Document models for tenants, users, service catalogs, usage events, and billing records.',
      },
      {
        layer: 'Precision Engine',
        technology: 'Decimal.js',
        description: 'Deterministic monetary calculation for tiered, metered, and subscription line items.',
      },
      {
        layer: 'Forecasting Engine',
        technology: 'Linear Burn-Rate Forecaster',
        description: 'Projected monthly spend calculated from active billing period run-rates and anomaly bounds.',
      },
      {
        layer: 'Verification Suite',
        technology: 'node:test / supertest / mongodb-memory-server',
        description: 'In-memory isolated integration testing with zero external cloud dependencies.',
      },
    ],
    links: [
      {
        label: 'View Repository',
        url: 'https://github.com/manav-chaudhary01/meter-flow',
        type: 'github',
      },
    ],
    callouts: [
      {
        title: 'Precision Math Guarantee',
        note: 'Zero floating-point inaccuracies on currency calculations using Decimal.js.',
        arrowDirection: 'right',
      },
      {
        title: 'Zero-Dependency Tests',
        note: '163 tests running directly via native Node.js test runner.',
        arrowDirection: 'up',
      },
    ],
  },

  'attendance-tracker': {
    id: 'attendance-tracker',
    slug: 'attendance-tracker',
    title: 'Attendance Tracker',
    subtitle: 'Offline-First Personal Attendance Logging & Threshold Planner',
    tagline: 'Local-first student attendance analytics with instant threshold deficit forecasting.',
    category: 'Client-Side Web Application',
    year: '2026',
    role: 'Frontend Architect & UI Designer',
    accentColor: '#10B981',
    badgeText: 'Local-First & Offline Storage',
    technologies: [
      'React 19',
      'TypeScript 5',
      'Vite',
      'Tailwind CSS',
      'IndexedDB (idb v8)',
      'Lucide React',
      'Vitest & Testing Library',
    ],
    summary:
      'A client-first web application enabling students to record class attendance, track semester minimum thresholds, and model required attendance streaks without cloud dependencies.',
    description:
      'Designed around user privacy and frictionless speed, Attendance Tracker eliminates cloud lag and logins. By persisting relational lecture logs and subject metadata inside browser IndexedDB through the idb library, it guarantees offline reliability and instant sub-millisecond interaction times.',
    highlights: [
      'Local-first persistence using browser IndexedDB with zero mandatory cloud accounts or remote servers.',
      'Dynamic threshold calculations showing how many consecutive classes must be attended to stay safe.',
      'Sub-millisecond UI response times with optimistic local updates and reactive UI sync.',
      'Comprehensive backup system supporting encrypted JSON export and seamless restore.',
      'Responsive touch-optimized interface built with Tailwind CSS and accessible keyboard focus states.',
    ],
    architecture: [
      {
        layer: 'User Interface',
        technology: 'React 19 / TypeScript 5 / Tailwind CSS',
        description: 'Component architecture with strict typing, fluid layouts, and accessible touch targets.',
      },
      {
        layer: 'Client Database',
        technology: 'IndexedDB via idb v8',
        description: 'Indexed local object stores for subjects, timetables, and date-stamped attendance entries.',
      },
      {
        layer: 'Analytics Engine',
        technology: 'Threshold Calculator',
        description: 'Pure math utilities projecting attendance ratios, bunk buffers, and mandatory recovery streaks.',
      },
      {
        layer: 'Quality Assurance',
        technology: 'Vitest / React Testing Library / jsdom',
        description: 'Automated component rendering and user event testing ensuring zero regressions.',
      },
    ],
    links: [
      {
        label: 'View Repository',
        url: 'https://github.com/manav-chaudhary01/attendance-tracker',
        type: 'github',
      },
    ],
    callouts: [
      {
        title: 'Offline-First Guarantee',
        note: 'All data stays on device via IndexedDB. Works without internet.',
        arrowDirection: 'left',
      },
    ],
  },

  'leetcode-widget': {
    id: 'leetcode-widget',
    slug: 'leetcode-widget',
    title: 'LeetCode Desktop Widget',
    subtitle: 'Native Windows Wallpaper Widget for Problem-Solving Heatmaps & Streaks',
    tagline: 'Ambient coding telemetry integrated directly behind your desktop windows.',
    category: 'Windows Desktop Utility',
    year: '2026',
    role: 'Systems Developer',
    accentColor: '#F59E0B',
    badgeText: 'Native .NET 10 & Win32',
    technologies: [
      'C# 13',
      'WPF (Windows Presentation Foundation)',
      '.NET 10 LTS',
      'Win32 Shell APIs',
      'LeetCode GraphQL API',
      'System.Text.Json',
    ],
    summary:
      'A lightweight native Windows desktop widget that renders a full 53-week LeetCode submission heatmap, streak telemetry, and difficulty breakdowns directly onto the desktop wallpaper layer.',
    description:
      'Rather than floating awkwardly over active applications or cluttering the Alt+Tab switcher, LeetCode Desktop Widget hooks into the Windows desktop shell hierarchy via native Win32 APIs. It stays visible whenever the desktop is uncovered and refreshes in the background without stealing focus.',
    highlights: [
      'Wallpaper-layer integration residing behind active applications without appearing in Alt+Tab.',
      'Windows Shell resilience: survives explorer.exe restarts, resolution shifts, and multi-monitor hot-plugging.',
      'Full 53-week contribution calendar with 5 intensity levels, leap year support, and interactive tooltips.',
      'Instant offline launch powered by persistent local cache in %LOCALAPPDATA%.',
      'Privacy-first public GraphQL telemetry with zero credentials, tokens, or passwords requested.',
    ],
    architecture: [
      {
        layer: 'Native Framework',
        technology: 'C# / WPF on .NET 10 LTS',
        description: 'Native Windows rendering with low CPU utilization and compact memory footprint.',
      },
      {
        layer: 'Shell Integration',
        technology: 'Win32 User32 APIs (SetParent / WorkerW)',
        description: 'Attaches widget window to the desktop wallpaper layer behind active applications.',
      },
      {
        layer: 'Telemetry & API',
        technology: 'GraphQL Client / System.Text.Json',
        description: 'Batched queries against LeetCode public GraphQL endpoints with 60-minute background sync.',
      },
      {
        layer: 'Persistence & Cache',
        technology: 'Local File System (%LOCALAPPDATA%)',
        description: 'JSON-serialized configuration and heatmap cache for instantaneous zero-latency cold starts.',
      },
    ],
    links: [
      {
        label: 'View Repository',
        url: 'https://github.com/manav-chaudhary01/leetcode-widget',
        type: 'github',
      },
    ],
    callouts: [
      {
        title: 'Explorer Resilience',
        note: 'Detects Windows Shell crashes and automatically re-anchors to WorkerW.',
        arrowDirection: 'up',
      },
      {
        title: 'Zero Distraction',
        note: 'Does not steal mouse focus or pollute Alt+Tab window switcher.',
        arrowDirection: 'right',
      },
    ],
  },
};

export const PROJECT_LIST = Object.values(PROJECTS);
