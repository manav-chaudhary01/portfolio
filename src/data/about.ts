export interface AboutData {
  name: string;
  role: string;
  greeting: string;
  shortBio: string;
  fullBio: string[];
  principles: { title: string; description: string }[];
  skills: { category: string; items: string[] }[];
}

export const ABOUT_DATA: AboutData = {
  name: 'Manav Chaudhary',
  role: 'Software Engineer & Builder',
  greeting: 'welcome to my corner on the internet :)',
  shortBio:
    "Hey there! I'm Manav — a software engineer and builder with a burning desire to craft reliable, high-performance systems and tactile digital experiences. Whether architecting high-precision billing platforms, offline-first web apps, or native Windows utilities, I focus on software craft, system resilience, and clean design.",
  fullBio: [
    "I believe great software emerges where solid engineering discipline meets thoughtful, human-centered interaction design. I love building things that feel snappy, resilient, and respectful of the user's attention.",
    'My recent work spans backend systems (multi-tenant SaaS billing engines with linear burn-rate predictive spend analytics in Node.js & MongoDB), modern local-first frontends (React 19 & IndexedDB), and low-level native desktop integrations (C#, WPF, and .NET 10 on Windows).',
    'When not writing code, I enjoy exploring interaction design, breaking down complex distributed systems papers, and building micro-experiments.',
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
