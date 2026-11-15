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
      'MeterFlow tackles the financial and architectural complexities of usage-based software pricing. Built on Node.js 24 and Express 5, it isolates tenant data across personal and organization workspaces, processes metered, subscription, and hybrid pricing models idempotently, and provides deterministic early warning alerts before cloud spend overshoots monthly budgets.',
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
    caseStudy: {
      problem: {
        overview:
          'Modern cloud and AI infrastructure is increasingly priced on granular, high-frequency consumption (token generation, API throughput, execution seconds). Without rigorous engineering guardrails, engineering teams suffer from sudden invoice shocks, while billing systems face calculation drift and race conditions during high-volume ingestion.',
        painPoints: [
          'IEEE 754 floating-point inaccuracies accumulate penny-level errors across millions of micro-transactions.',
          'Network retries and distributed event ingestion cause accidental double-billing if idempotency is not strictly enforced at the database level.',
          'SaaS organizations lack early spend warning systems, learning of budget overshoots only when receiving finalized month-end invoices.',
          'Multi-tenant platforms risk cross-organizational data leakage when users participate in both personal and enterprise workspaces.',
        ],
        technicalChallenge:
          'Designing a billing platform that combines strict organizational data isolation, zero-drift decimal arithmetic, database-enforced ingestion idempotency, and explainable linear forecasting without heavy external third-party SaaS dependencies.',
      },
      approach: {
        summary:
          'MeterFlow was engineered as a modular, backend-first platform with clear separation between tenant identity, ingestion, precision calculation, and predictive alerting. Rather than relying on floating-point arithmetic or opaque black-box machine learning models, the architecture is built around mathematical determinism and self-healing reconciliation.',
        coreTenets: [
          'Workspace-level data isolation strictly enforced on every database query via req.user.tenantId.',
          'Pure calculation services isolated from database I/O to guarantee testability and predictable rounding.',
          'Compound unique database indexes providing bulletproof idempotency without transient cache dependencies.',
          'Transparent, explainable linear burn-rate forecasting with strict data-window guardrails.',
        ],
      },
      architectureFlow: {
        title: 'End-to-End Ingestion & Billing Pipeline',
        subtitle: 'From incoming telemetry to verified invoice generation and predictive budget evaluation.',
        steps: [
          {
            step: '01',
            title: 'Gateway & Authentication',
            component: 'Express 5 + JWT Middleware',
            detail:
              'Requests pass through Helmet security headers and CORS protection. JWT tokens are verified, active workspace membership is validated, and caller permissions (owner, admin, member) are enforced.',
          },
          {
            step: '02',
            title: 'Idempotent Ingestion',
            component: 'Usage Controller & MongoDB Indexes',
            detail:
              'Raw usage events are checked against compound unique indexes ({ tenantId: 1, idempotencyKey: 1 }). Conflicting payloads return 409 Conflict, while identical replays return 200 OK without re-charging.',
          },
          {
            step: '03',
            title: 'Arbitrary-Precision Billing',
            component: 'billingCalculator.js (Decimal.js)',
            detail:
              'Calculates metered quantities, subscription intervals, and hybrid line items with Decimal.js using ROUND_HALF_UP financial rounding, eliminating floating-point drift.',
          },
          {
            step: '04',
            title: 'Invoice Reconciliation',
            component: 'Billing Record Model & Linker',
            detail:
              'Generates immutable BillingRecord invoices with unique period constraints ({ tenantId, billingPeriodStart, billingPeriodEnd, currency }) and links unbilled usage records.',
          },
          {
            step: '05',
            title: 'Forecasting & Spend Alerts',
            component: 'spendForecaster.js & alertEvaluator.js',
            detail:
              'Measures realized spend from finalized invoices, evaluates multi-threshold alerts (e.g. 50%, 80%, 100%), and extrapolates period burn-rate with a 24-hour minimum data guardrail.',
          },
        ],
      },
      engineeringDecisions: [
        {
          title: 'Arbitrary-Precision Arithmetic with Decimal.js',
          decision: 'Enforce Decimal.js for all monetary and rate calculations instead of native JavaScript numbers.',
          reason:
            'Standard JavaScript numbers use IEEE 754 double-precision floats, where simple operations like 0.1 + 0.2 yield 0.30000000000000004. In usage billing with micro-rates (e.g., $0.0024 per API call), floating-point drift compounds into accounting discrepancies.',
          implementation:
            'All line items, subtotals, tax rates, and spend aggregates are evaluated inside pure calculation functions using Decimal instances, serializing to MongoDB as Decimal128.',
          tradeoff:
            'Slightly higher memory and CPU overhead compared to native float operations, which is negligible compared to the critical requirement of financial correctness.',
        },
        {
          title: 'Database-Enforced Compound Unique Idempotency',
          decision:
            'Rely on MongoDB compound unique indexes ({ tenantId: 1, idempotencyKey: 1 }) rather than an in-memory cache like Redis.',
          reason:
            'If an API consumer experiences a network timeout and retries an ingestion request, memory-based deduplication caches can suffer from cache eviction or fail during server restarts, causing duplicate billing.',
          implementation:
            'The ingestion endpoint attempts to insert the usage record. If a duplicate key error (code 11000) occurs, it fetches the existing record and compares payloads: identical payloads return 200 OK with an idempotentReplay flag; mismatched payloads return 409 Conflict.',
          tradeoff:
            'Increases index maintenance overhead on high-throughput inserts, but ensures zero duplicate billing records under distributed failures.',
        },
        {
          title: 'Self-Healing Invoice Usage Reconciliation',
          decision:
            'Implement auto-healing reconciliation queries during bill generation and detail retrieval.',
          reason:
            'If an invoice generation job is interrupted after writing the invoice header but before all usage record foreign keys are updated, records could remain orphaned and be billed twice in the next cycle.',
          implementation:
            'The retrieval endpoint (GET /api/billing/:id/usage) and generation pipeline verify that all usage events falling within the invoice period boundaries are stamped with the billingRecordId, auto-repairing any orphaned records on the fly.',
          tradeoff:
            'Adds a lightweight reconciliation check on invoice retrieval, avoiding the need for heavy multi-document distributed transactions on standalone databases.',
        },
        {
          title: 'Explainable Linear Burn-Rate with Minimum Data Guardrail',
          decision:
            'Use deterministic linear run-rate extrapolation with a mandatory 24-hour minimum elapsed data guardrail.',
          reason:
            'Complex machine learning models are unpredictable when historical data is sparse. Furthermore, extrapolating monthly spend within the first few hours of a billing cycle causes alarming, false spikes.',
          implementation:
            'The forecasting service calculates daily burn rate: (ActualSpend / DaysElapsed) * DaysRemaining. If evaluating within the first 24 hours of a billing period, it explicitly returns hasSufficientData: false with explanatory notes.',
          tradeoff:
            'Does not capture nonlinear weekly seasonality (e.g., lower weekend usage), but provides 100% transparent, auditable projections that customers can easily verify.',
        },
      ],
      featureShowcases: [
        {
          title: 'High-Precision Billing Engine',
          subtitle: 'Pure calculation service with zero floating-point accumulation',
          description:
            'The billing engine decouples mathematical calculations from database queries. It accepts plain service configurations and usage tallies, converting all rates and quantities into Decimal instances and applying strict ROUND_HALF_UP rounding rules.',
          badge: 'Financial Correctness',
          codeSnippet: {
            filename: 'backend/src/services/billingCalculator.js',
            language: 'javascript',
            code: `// Deterministic usage line-item calculation using Decimal.js
export function calculateUsageLineItem(service, quantity, currency) {
  const decQuantity = new Decimal(quantity || 0);
  const decUnitPrice = new Decimal(service.unitPrice?.toString() || '0');
  
  // Calculate total: quantity * unitPrice
  const rawTotal = decQuantity.times(decUnitPrice);
  const total = rawTotal.toDecimalPlaces(2, Decimal.ROUND_HALF_UP);

  return {
    serviceId: service._id,
    serviceName: service.name,
    type: 'metered',
    quantity: decQuantity.toNumber(),
    unit: service.unit,
    unitPrice: decUnitPrice.toString(),
    total: total.toString(),
    currency: currency || service.currency
  };
}`,
            caption: 'Meter Flow pure calculation engine isolating arbitrary-precision logic.',
          },
          keyTakeaways: [
            'Converts all currency inputs to Decimal.js before evaluating mathematical operations.',
            'Enforces standard Decimal.ROUND_HALF_UP rounding to exactly 2 decimal places.',
            'Produces predictable, auditable line items for metered, subscription, and hybrid services.',
          ],
        },
        {
          title: 'Explainable Predictive Spend Alerts',
          subtitle: 'Guarded run-rate extrapolation with multi-threshold evaluation',
          description:
            'Evaluates actual realized spend against workspace budgets. Thresholds (e.g., 50%, 80%, 100%, 120%) are checked in sorted order so rapid spend spikes trigger all crossed alert levels deterministically.',
          badge: 'Predictive Alerting',
          codeSnippet: {
            filename: 'backend/src/services/spendForecaster.js',
            language: 'javascript',
            code: `// Linear burn-rate forecasting with minimum elapsed time guardrail
export function forecastSpend({ actualSpend, startDate, endDate, asOfDate = new Date() }) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const asOf = new Date(asOfDate);

  const totalPeriodDays = Math.max(1, (end - start) / (1000 * 60 * 60 * 24));
  const elapsedDays = Math.max(0, (asOf - start) / (1000 * 60 * 60 * 24));

  // Minimum 24-hour guardrail to prevent erratic day-one projections
  if (elapsedDays < 1) {
    return {
      hasSufficientData: false,
      forecastSpend: actualSpend,
      explanation: 'Insufficient data: at least 24 hours of billing period history required.'
    };
  }

  const burnRate = new Decimal(actualSpend).dividedBy(elapsedDays);
  const remainingDays = Math.max(0, totalPeriodDays - elapsedDays);
  const projectedRemaining = burnRate.times(remainingDays);
  const forecastTotal = new Decimal(actualSpend).plus(projectedRemaining);

  return {
    hasSufficientData: true,
    dailyBurnRate: burnRate.toFixed(2),
    forecastSpend: forecastTotal.toFixed(2),
    projectedRemaining: projectedRemaining.toFixed(2)
  };
}`,
            caption: 'Linear forecasting algorithm with guarded data-window constraints.',
          },
          keyTakeaways: [
            'Requires at least 24 hours of elapsed period time before generating projections.',
            'Distinguishes between reached warning thresholds (< 100%) and exceeded alarms (>= 100%).',
            'Provides transparent, explainable daily burn rates that customers can audit manually.',
          ],
        },
      ],
      testing: {
        framework: 'node:test (native) + Supertest + mongodb-memory-server',
        testCount: 163,
        suiteCount: 46,
        description:
          'The entire test suite runs offline using an embedded in-memory MongoDB runner with zero external cloud dependencies. Tests cover unit calculations, API routes, multi-tenant boundary isolation, RBAC privilege anti-escalation, and a 15-step end-to-end integration workflow.',
        verifiedTraits: [
          '163 automated tests passing consistently across 46 test suites.',
          'Tenant isolation verification: queries attempting cross-workspace access reliably return 404/403.',
          'Database idempotency verification under simulated concurrent duplicate replay requests.',
          'Privilege escalation tests verifying that auto-heal cannot grant unauthorized owner access.',
        ],
      },
      reflection: {
        learnings: [
          'Financial and usage billing systems cannot tolerate floating-point math; establishing arbitrary-precision conventions from day one is essential.',
          'Designing for idempotency at the storage layer simplifies distributed resilience significantly more than building complex retry orchestrators on the client.',
          'Explainable, deterministic linear models frequently build higher user trust than opaque statistical forecasts that cannot be calculated by hand.',
        ],
        tradeoffs: [
          'Scoped to single-currency invoicing per document; multi-currency consolidation with real-time FX rates was deferred to maintain simplicity.',
          'Relied on compound unique indexes and application-level reconciliation instead of heavy MongoDB replica set distributed transactions.',
        ],
        futureRoadmap: [
          'Webhook notification dispatchers for Slack and PagerDuty when budget thresholds are breached.',
          'Payment processor integration (Stripe/Adyen) for automatic payment collection upon invoice finalization.',
          'Time-series forecasting module to account for weekend dips and seasonal usage cycles.',
        ],
      },
    },
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
      'Designed around user privacy and frictionless speed, Attendance Tracker eliminates cloud lag, logins, and third-party data tracking. By persisting relational lecture logs and subject metadata inside browser IndexedDB through the idb library, it guarantees offline reliability, zero server costs, and instant sub-millisecond interaction times.',
    highlights: [
      'Local-first persistence using browser IndexedDB with zero mandatory cloud accounts or remote servers.',
      'Dynamic threshold calculations showing how many consecutive classes must be attended to stay safe.',
      'Sub-millisecond UI response times with optimistic local updates and reactive UI sync.',
      'Comprehensive backup system supporting JSON export and schema-validated restore.',
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
        description: 'Indexed local object stores for semesters, subjects, attendance_records, and settings.',
      },
      {
        layer: 'Analytics Engine',
        technology: 'Threshold & Bunk Math',
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
      {
        title: 'Anti-Rounding Guard',
        note: 'Never rounds up below-target percentages to prevent false safety.',
        arrowDirection: 'up',
      },
    ],
    caseStudy: {
      problem: {
        overview:
          'University students face strict mandatory attendance regulations (typically 75% or 80%) where falling below threshold results in severe penalties, including debarment from semester examinations. Existing mobile apps frequently suffer from intrusive ads, mandatory cloud logins, confusing UI, and mathematically misleading rounding.',
        painPoints: [
          'Many tracking apps calculate unweighted average-of-averages across subjects, distorting true cumulative semester attendance.',
          'Standard percentage rounding (e.g., 74.8% displayed as 75.0%) gives students a false sense of security, causing unexpected exam debarment.',
          'Cloud-dependent solutions introduce network latency, require unnecessary account signups, and risk losing personal academic records when services shut down.',
          'Students lack clear, actionable answers to two fundamental questions: "How many consecutive classes must I attend to recover?" and "How many classes can I safely skip?"',
        ],
        technicalChallenge:
          'Building a high-performance, local-first web application that operates completely offline, executes exact closed-form algebraic threshold equations, guarantees atomic multi-store IndexedDB persistence, and delivers a tactile, responsive user experience.',
      },
      approach: {
        summary:
          'Attendance Tracker was architected as an offline-first single-page application built with React 19 and TypeScript. The application stores all data locally in the browser via IndexedDB using the idb library, executing all aggregations, streak calculations, and eligibility models instantly on the client.',
        coreTenets: [
          '100% Client-Side execution with zero backend infrastructure, zero accounts, and complete privacy.',
          'Mathematical precision with closed-form algebraic formulas for recovery streaks and safe bunk allowances.',
          'Single atomic IndexedDB transactions preventing count drift between raw logs and subject totals.',
          'Anti-misleading rounding policy: percentages strictly below target are truncated, never rounded up.',
        ],
      },
      architectureFlow: {
        title: 'Client-Side Data & Calculation Pipeline',
        subtitle: 'From user interaction to atomic persistence and reactive dashboard visualizers.',
        steps: [
          {
            step: '01',
            title: 'User Input & Quick Logger',
            component: 'Daily Logger (React 19)',
            detail:
              'Captures single or multi-period class attendance using local calendar dates (YYYY-MM-DD), avoiding timezone/UTC day-shift discrepancies.',
          },
          {
            step: '02',
            title: 'Mathematical Modeling',
            component: 'calculations.ts (Pure Functions)',
            detail:
              'Computes recovery classes x = ceil((pH - A)/(1 - p)), safe bunks b = floor(A/p - H), and weighted semester overall (sum A / sum H).',
          },
          {
            step: '03',
            title: 'Anti-Rounding Guard',
            component: 'formatAttendancePercentage',
            detail:
              'If attendance is strictly below the target threshold, formatting truncates decimals to prevent 74.9% from rounding up to 75.0%.',
          },
          {
            step: '04',
            title: 'Atomic IndexedDB Transaction',
            component: 'storage.saveAttendanceBatch (idb v8)',
            detail:
              'Persists daily logs to attendance_records and updates subject totals in subjects inside a single readwrite transaction to prevent count drift.',
          },
          {
            step: '05',
            title: 'Heatmap & Analytics Grid',
            component: 'AttendanceHeatmap (53 Weeks × 7 Days)',
            detail:
              'Renders yearly attendance intensity using 4 forest-green levels, with a zero-assumption policy leaving untracked dates neutral.',
          },
        ],
      },
      engineeringDecisions: [
        {
          title: '100% Local-First Architecture via IndexedDB',
          decision:
            'Store all semester records, subject configurations, and daily logs in browser IndexedDB via the idb v8 library.',
          reason:
            'Attendance logging is an everyday, personal task. Requiring an external database or network connection introduces latency and unnecessary privacy exposure. IndexedDB provides structured, queryable client storage with multi-megabyte capacity.',
          implementation:
            'Defined four object stores (semesters, subjects, attendance_records, settings) with compound indexes (by-subject-date) for rapid filtering and queries.',
          tradeoff:
            'Data is tied to the specific browser profile. Mitigated by building an export/import backup feature that generates schema-validated JSON files for cross-device migration.',
        },
        {
          title: 'Single Atomic Transactions for Batch Updates',
          decision:
            'Wrap daily record insertions and subject aggregate count updates in a single IndexedDB transaction.',
          reason:
            'If raw daily records are inserted but subject aggregate counters fail or are aborted, the subject progress bar will drift away from the attendance history ledger.',
          implementation:
            'The saveAttendanceBatch method opens a single readwrite transaction across both attendance_records and subjects stores, ensuring all-or-nothing consistency.',
          tradeoff:
            'Slightly more complex storage helper logic than independent key-value writes, but completely eliminates data desynchronization bugs.',
        },
        {
          title: 'Anti-Misleading Percentage Formatting',
          decision:
            'Implement a guarded formatting function that truncates floored values when attendance is strictly below the target percentage.',
          reason:
            'Standard JavaScript toFixed(1) rounds numbers according to standard rounding rules. For example, 74.95% becomes "75.0%". In college attendance policies, 74.95% is below 75% and results in exam debarment. A display rounding error can cause academic failure.',
          implementation:
            'If the raw fraction is less than the target threshold minus an epsilon (1e-10), the formatter floors the value to the requested decimal precision so it never presents the target figure.',
          tradeoff:
            'Requires passing the target threshold into formatting helpers, but prevents critical real-world academic misunderstandings.',
        },
        {
          title: 'Zero-Assumption Heatmap Policy',
          decision:
            'Never infer that a class was held or missed merely because a calendar date has no logged records.',
          reason:
            'College schedules fluctuate with holidays, exams, semester breaks, and cancelled lectures. Assuming an unrecorded date was missed corrupts metrics; assuming it was attended creates false optimism.',
          implementation:
            'The 53-week heatmap distinguishes between unrecorded days (neutral grey), explicit no-class days, full attendance (green intensity levels), and partial attendance.',
          tradeoff:
            'Students must explicitly record days to populate the calendar grid, ensuring that all visual metrics remain 100% authentic.',
        },
      ],
      featureShowcases: [
        {
          title: 'Closed-Form Threshold Recovery & Safe Bunk Equations',
          subtitle: 'Pure algebraic solutions for academic planning',
          description:
            'Instead of using iterative simulations, the calculation module evaluates exact closed-form algebraic equations to determine the minimum consecutive classes needed to recover from a deficit, or the maximum safe bunks remaining.',
          badge: 'Algebraic Precision',
          codeSnippet: {
            filename: 'src/features/attendance/calculations.ts',
            language: 'typescript',
            code: `// Calculate minimum consecutive future classes needed to reach target percentage 'p'
// Inequality: (A + x) / (H + x) >= p  ==>  x >= (p * H - A) / (1 - p)
export function calculateClassesToRecover(
  classesHeld: number,
  classesAttended: number,
  targetPercentage: number
): number | null {
  validateCounts(classesHeld, classesAttended);
  validateTarget(targetPercentage);

  const p = targetPercentage / 100;
  if (targetPercentage === 0 || classesHeld === 0) return 0;
  if (classesAttended / classesHeld >= p - EPSILON) return 0;

  // Mathematically impossible to recover to 100% if even 1 class was missed
  if (targetPercentage === 100) return null;

  const rawX = (p * classesHeld - classesAttended) / (1 - p);
  let candidate = Math.max(0, Math.ceil(rawX - EPSILON));

  // Numerical precision safety check
  while ((classesAttended + candidate) / (classesHeld + candidate) < p - EPSILON) {
    candidate++;
  }
  return candidate;
}`,
            caption: 'Closed-form recovery calculation with floating-point boundary verification.',
          },
          keyTakeaways: [
            'Direct mathematical derivation x = ceil((p * H - A) / (1 - p)) replaces costly iterative loops.',
            'Explicitly handles mathematical impossibilities, such as aiming for 100% after an absence.',
            'Precision safety loops protect against subtle IEEE 754 floating-point inaccuracies.',
          ],
        },
        {
          title: 'Anti-Misleading Rounding Guard',
          subtitle: 'Guarding students against false compliance illusions',
          description:
            'Protects students from rounding illusions by strictly preventing values below target from being rounded up to the passing threshold.',
          badge: 'Defensive UI',
          codeSnippet: {
            filename: 'src/features/attendance/calculations.ts',
            language: 'typescript',
            code: `export function formatAttendancePercentage(
  percentage: number | null,
  options: { precision?: number; target?: number } = {}
): string {
  if (percentage === null) return '—';
  const precision = options.precision ?? 1;
  const formatted = percentage.toFixed(precision);

  // Guard against misleading rounding across the target threshold
  if (options.target !== undefined && percentage < options.target - EPSILON) {
    const roundedValue = parseFloat(formatted);
    if (roundedValue >= options.target) {
      // Truncate to prevent false eligibility display
      const factor = Math.pow(10, precision);
      const floored = (Math.floor(percentage * factor) / factor).toFixed(precision);
      return \`\${floored}%\`;
    }
  }

  return \`\${formatted}%\`;
}`,
            caption: 'Floored truncation guard protecting academic threshold integrity.',
          },
          keyTakeaways: [
            'Detects when standard toFixed() rounding would cross the passing threshold from below.',
            'Enforces floored decimal truncation so 74.9% never masquerades as 75.0%.',
            'Ensures absolute alignment between user interface and institutional academic policy.',
          ],
        },
      ],
      testing: {
        framework: 'Vitest + React Testing Library + jsdom',
        description:
          'Comprehensive automated unit and component testing validating mathematical calculations, edge-case conditions, schema validation, and user interface workflows.',
        verifiedTraits: [
          'Edge-case testing: 0 classes held, exact threshold matches, 0% target, and 100% unachievable targets.',
          'Database mock verification ensuring atomic rollback when batch operations fail.',
          'Component rendering tests verifying keyboard navigation, dialog focus, and accessible labels.',
        ],
      },
      reflection: {
        learnings: [
          'Local-first applications require as much rigor in data modeling and migrations as cloud applications.',
          'Mathematical formulas must be protected against edge-case division-by-zero and floating-point boundary rounding.',
          'Eliminating backend servers enables instant sub-millisecond interaction speeds and 100% uptime.',
        ],
        tradeoffs: [
          'Without cloud sync, data is tied to the device browser; mitigated by providing complete JSON export/import.',
          'Requires users to manually back up their data when switching between devices.',
        ],
        futureRoadmap: [
          'Optional peer-to-peer device sync using WebRTC or local network discovery.',
          'Web Share Target API integration for capturing timetables directly from photos or PDFs.',
          'Progressive Web App (PWA) manifest and service worker for home screen installability.',
        ],
      },
    },
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
      'Rather than floating awkwardly over active applications or cluttering the Alt+Tab window switcher, LeetCode Desktop Widget hooks into the Windows desktop shell hierarchy via native Win32 APIs. It stays visible whenever the desktop is uncovered and refreshes in the background without stealing focus or requiring account credentials.',
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
    caseStudy: {
      problem: {
        overview:
          'Software engineers practicing algorithmic problem-solving value ambient awareness of their daily consistency and streaks. However, checking progress via browser tabs creates continuous context switching, while conventional desktop widgets float over code editors, steal input focus, and clutter Alt+Tab navigation.',
        painPoints: [
          'Floating overlay widgets obscure IDE code, terminal outputs, and browser documentation during active development.',
          'Standard desktop utilities steal focus on click, interrupting keyboard-driven coding workflows.',
          'Many community widgets demand account credentials or session cookies, creating severe security and privacy liabilities.',
          'Naïve desktop hooks crash or become permanently hidden when Windows Explorer restarts or monitor displays change.',
        ],
        technicalChallenge:
          'Engineering a native Windows desktop utility that anchors seamlessly behind application windows onto the desktop wallpaper layer, survives Windows Shell restarts without crashing, and fetches public telemetry without storing credentials or causing rate-limiting.',
      },
      approach: {
        summary:
          'LeetCode Desktop Widget was built using C# 13 and WPF on .NET 10. The application directly interoperates with the Windows Shell via Win32 User32 APIs, discovering the hidden WorkerW wallpaper host and parenting itself directly behind the desktop icon list. Background synchronization runs non-intrusively, with all telemetry cached locally for instant startup.',
        coreTenets: [
          'Native wallpaper embedding via WorkerW parenting, ensuring the widget never obscures open windows.',
          'Extended window styles (WS_EX_TOOLWINDOW and WS_EX_NOACTIVATE) eliminating Alt+Tab pollution and focus theft.',
          'Privacy-first public GraphQL queries using only public usernames with zero passwords or tokens.',
          'Shell resilience: automatic re-anchoring on Explorer restarts, display resolution shifts, and sleep/wake cycles.',
        ],
      },
      architectureFlow: {
        title: 'Windows Desktop Integration & Sync Architecture',
        subtitle: 'From Win32 shell hooking to background GraphQL synchronization and local caching.',
        steps: [
          {
            step: '01',
            title: 'Shell Discovery & Message 0x052C',
            component: 'DesktopHost.cs (Win32 Interop)',
            detail:
              'Sends undocumented message 0x052C to Progman, causing the Windows Shell to spawn a WorkerW window behind desktop icons (SHELLDLL_DefView).',
          },
          {
            step: '02',
            title: 'Window Parenting & Style Stripping',
            component: 'DesktopWindowManager.cs',
            detail:
              'Sets the widget as a child of WorkerW via SetParent, and configures WS_EX_TOOLWINDOW (no Alt+Tab) and WS_EX_NOACTIVATE (no focus stealing).',
          },
          {
            step: '03',
            title: 'GraphQL Telemetry Retrieval',
            component: 'LeetCodeService.cs',
            detail:
              'Fetches submission calendar and problem counts from LeetCode public GraphQL API (https://leetcode.com/graphql) using only the public username.',
          },
          {
            step: '04',
            title: 'Coalescing Refresh Coordinator',
            component: 'RefreshCoordinator.cs',
            detail:
              'Uses non-blocking atomic locks to coalesce manual refresh triggers and 60-minute periodic timers into in-flight HTTP requests, avoiding rate limits.',
          },
          {
            step: '05',
            title: 'Atomic Offline Cache & Heatmap',
            component: 'CacheService.cs & HeatmapControl.cs',
            detail:
              'Writes JSON to %LOCALAPPDATA% via temporary file replacement (.tmp + File.Move) and renders the 53-week × 7-day calendar canvas.',
          },
        ],
      },
      engineeringDecisions: [
        {
          title: 'WorkerW Wallpaper Parenting over Floating Overlays',
          decision:
            'Parent the WPF window directly to the Windows desktop WorkerW host window instead of creating a topmost floating window.',
          reason:
            'Floating windows continuously obstruct code, terminal windows, and browser tabs. Parenting to WorkerW embeds the widget directly onto the wallpaper, making it visible with Win+D or when applications are minimized.',
          implementation:
            'Interprets the Windows window hierarchy: discovers Progman, triggers message 0x052C to ensure WorkerW is instantiated, locates the WorkerW instance behind SHELLDLL_DefView, and calls SetParent.',
          tradeoff:
            'Requires low-level Win32 P/Invoke interop and complex fallback logic (HWND_BOTTOM) if WorkerW is unavailable in restricted environments.',
        },
        {
          title: 'Removal from Alt+Tab and Keyboard Focus Isolation',
          decision:
            'Apply WS_EX_TOOLWINDOW and WS_EX_NOACTIVATE extended window styles to the Win32 window handle.',
          reason:
            'A desktop widget should never pollute the Alt+Tab window switcher or steal focus when a user clicks on the desktop canvas.',
          implementation:
            'During window initialization, modifies the extended window styles using GetWindowLong and SetWindowLong with WS_EX_TOOLWINDOW and WS_EX_NOACTIVATE.',
          tradeoff:
            'Interactive form inputs (like entering a new username) require temporary focus delegation, which is handled cleanly during configuration mode.',
        },
        {
          title: 'Explorer Restart Auto-Recovery via TaskbarCreated',
          decision:
            'Listen for the registered Win32 "TaskbarCreated" window message to automatically re-attach to WorkerW when explorer.exe restarts.',
          reason:
            'When Windows Explorer crashes or restarts, all WorkerW parent handles are destroyed, leaving traditional desktop widgets invisible or orphaned.',
          implementation:
            'Registers the "TaskbarCreated" message via RegisterWindowMessage and intercepts it inside the WndProc hook, automatically re-initiating desktop discovery and parenting within 500ms.',
          tradeoff:
            'Requires maintaining an unmanaged WndProc hook throughout the application lifecycle.',
        },
        {
          title: 'Non-Blocking Request Coalescing in RefreshCoordinator',
          decision:
            'Implement an atomic lock coordinator that coalesces concurrent manual and periodic refresh requests.',
          reason:
            'If a user repeatedly clicks the manual refresh button while a 60-minute background sync is running, rapid requests could trigger HTTP 429 rate limits on LeetCode public endpoints.',
          implementation:
            'The RefreshCoordinator checks if a fetch task is already active. If active, subsequent manual clicks attach to the in-flight Task instead of spawning new network calls.',
          tradeoff:
            'Manual refreshes during active requests return the current in-flight response rather than starting an immediate second request.',
        },
      ],
      featureShowcases: [
        {
          title: 'Win32 WorkerW Discovery & Desktop Parenting',
          subtitle: 'Seamless integration into the Windows wallpaper layer',
          description:
            'The desktop window manager discovers the Windows desktop hierarchy, creates the wallpaper WorkerW sibling, and parents the WPF window handle directly behind the desktop icons.',
          badge: 'Win32 Interop',
          codeSnippet: {
            filename: 'src/LeetCodeDesktopWidget/Desktop/DesktopWindowManager.cs',
            language: 'csharp',
            code: `// Attaches WPF window to the Windows desktop wallpaper host (WorkerW)
public bool AttachToDesktop()
{
    _hwnd = new WindowInteropHelper(_window).EnsureHandle();

    // 1. Configure extended styles: ToolWindow (no Alt+Tab) & NoActivate (no focus steal)
    long exStyle = DesktopInterop.GetWindowLong(_hwnd, DesktopInterop.GWL_EXSTYLE);
    exStyle |= DesktopInterop.WS_EX_TOOLWINDOW | DesktopInterop.WS_EX_NOACTIVATE;
    DesktopInterop.SetWindowLong(_hwnd, DesktopInterop.GWL_EXSTYLE, exStyle);

    // 2. Discover Desktop Host (WorkerW or Progman)
    _hostInfo = DesktopHost.DiscoverDesktopHost();

    if (_hostInfo.TargetParentHandle != IntPtr.Zero &&
        (_hostInfo.HostType == DesktopHostType.WorkerW || _hostInfo.HostType == DesktopHostType.Progman))
    {
        long style = DesktopInterop.GetWindowLong(_hwnd, DesktopInterop.GWL_STYLE);
        style = (style & ~DesktopInterop.WS_POPUP) | DesktopInterop.WS_CHILD | DesktopInterop.WS_CLIPSIBLINGS;
        DesktopInterop.SetWindowLong(_hwnd, DesktopInterop.GWL_STYLE, style);

        DesktopInterop.SetParent(_hwnd, _hostInfo.TargetParentHandle);
        _hostInfo.IsAttached = true;
    }
    return true;
}`,
            caption: 'Win32 style configuration and WorkerW parenting method.',
          },
          keyTakeaways: [
            'Transforms a standard WPF Window into a native desktop child window.',
            'Strips popup window decorations and clips sibling desktop controls.',
            'Guarantees the widget stays anchored to the wallpaper behind all open applications.',
          ],
        },
        {
          title: 'Shell Resilience & Auto-Recovery',
          subtitle: 'Surviving Explorer crashes, sleep/wake, and display changes',
          description:
            'Listens for the registered TaskbarCreated message and system events to automatically re-anchor the widget and clamp its coordinates within the visible primary monitor work area.',
          badge: 'Shell Resilience',
          codeSnippet: {
            filename: 'src/LeetCodeDesktopWidget/Desktop/DesktopWindowManager.cs',
            language: 'csharp',
            code: `// Intercepts Win32 messages for Explorer recovery and display geometry shifts
private IntPtr WndProc(IntPtr hwnd, int msg, IntPtr wParam, IntPtr lParam, ref bool handled)
{
    if ((uint)msg == _taskbarCreatedMsg)
    {
        // Explorer restarted: re-attach to freshly spawned WorkerW
        Task.Delay(500).ContinueWith(_ =>
        {
            _window.Dispatcher.Invoke(() =>
            {
                AttachToDesktop();
                ExplorerRestarted?.Invoke();
            });
        });
    }
    else if (msg == DesktopInterop.WM_DISPLAYCHANGE || msg == DesktopInterop.WM_SETTINGCHANGE)
    {
        DisplayChanged?.Invoke();
    }
    return IntPtr.Zero;
}`,
            caption: 'WndProc hook intercepting TaskbarCreated and display changes.',
          },
          keyTakeaways: [
            'Survives explorer.exe crashes and restarts with automatic 500ms re-anchoring.',
            'Clamps window coordinates within visible primary display bounds upon resolution changes.',
            'Subscribes to system power events to handle sleep/wake cycles gracefully.',
          ],
        },
      ],
      testing: {
        framework: 'xUnit (.NET 10)',
        testCount: 86,
        description:
          'Comprehensive automated test suite covering GraphQL response deserialization, streak calculation algorithms, local cache persistence, and Win32 geometry boundary clamping.',
        verifiedTraits: [
          '86 automated unit tests validating parsing, date-range handling, and streak counters.',
          'Atomic file replacement verification ensuring cache integrity under simulated write aborts.',
          'Display clamping tests verifying the widget stays within visible screen coordinates.',
        ],
      },
      reflection: {
        learnings: [
          'Interfacing directly with the Windows Shell requires robust defensive engineering against OS-level crashes and multi-monitor reconfiguration.',
          'Focus management in ambient desktop tools is critical: even a momentary focus steal degrades the developer workflow.',
          'Keeping client tools credential-free by utilizing public GraphQL schemas dramatically enhances user trust and security.',
        ],
        tradeoffs: [
          'Currently anchors exclusively to the primary monitor; multi-monitor positioning across secondary screens was deferred.',
          'Dependent on LeetCode public web GraphQL schema; updates to query models would be required if the schema changes.',
        ],
        futureRoadmap: [
          'Multi-monitor selector allowing users to pin the widget to secondary displays.',
          'Configurable color palettes (GitHub green, Nord, Catppuccin, Solarized).',
          'Contest rating graph integration showing historical ranking trajectories.',
        ],
      },
    },
  },
};

export const PROJECT_LIST = Object.values(PROJECTS);
