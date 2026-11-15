# Manav Chaudhary — Personal Portfolio

A minimal, personal, tactile portfolio website built with React 19, Vite, Tailwind CSS, and Motion.

Inspired by the tactile interaction design of [Pixelwrld](https://pixelwrld.co/) and the editorial product storytelling of [Portal](https://useportal.net/), this site serves as a personal corner of the internet showcasing backend systems, local-first client tools, and native desktop utilities.

---

## Portfolio Structure & Key Destinations

1. **Homepage (`/`)**:
   - Handcrafted multi-layered SVG navigation objects with 3D perspective transforms, lighting, and spring-based tactile reactions.
   - Interactive preview cards with URL query synchronization (`/?project=meter-flow`, `/?project=attendance-tracker`, `/?project=leetcode-widget`).
   - Soft focus blur transitions dimming non-active elements during exploration.
   - Expandable bottom `SocialDock` with keyboard navigation, Esc dismissal, and direct navigation links.
   - Live **Elsewhere** developer activity section displaying GitHub, LeetCode, and LinkedIn integrations.

2. **Editorial Case Studies (`/work/:slug`)**:
   - `/work/meter-flow`: Multi-tenant SaaS metered billing platform with Decimal.js arbitrary-precision math, idempotent ingestion, and linear burn-rate spend alerts.
   - `/work/attendance-tracker`: Local-first offline student attendance analytics powered by browser IndexedDB (via `idb v8`), closed-form threshold formulas, and responsive local-first client updates.
   - `/work/leetcode-widget`: Native Windows wallpaper widget integrating directly with Win32 User32 `WorkerW` hooks, automatic Explorer crash recovery, and offline local cache.

3. **About (`/about`)**:
   - Authentic technical narrative, four core architectural focus areas, and verified-in codebase cross-references.

4. **Playground (`/playground`)**:
   - Interactive experimental sandboxes: Spring Dynamics & Inertia Simulator, Generative Dot Matrix, and Procedural Web Audio Micro-Clicks with proper audio context lifecycle management.

5. **Contact (`/contact`)**:
   - Direct communication channels, click-to-copy email interaction with fallback and screen-reader announcements, and verified profile links.

6. **Live Activity & Telemetry (`/activity`)**:
   - Dedicated full-page developer activity dashboard with full 52-week contribution heatmaps, problem difficulty breakdowns, and latest professional dispatches.

---

## Technology Stack

- **Framework**: React 19 (`react` & `react-dom` 19.3.1)
- **Toolchain**: Vite 8.3.x with Rolldown bundling and `@vitejs/plugin-react`
- **Styling**: Tailwind CSS 3.4.x with custom design tokens (`canvas`, `ink`, `surface`, `border`, `tactile` shadows)
- **Animation**: Motion 12.0 (spring physics, layout transitions, exit animations)
- **Typography**: Instrument Serif (editorial headlines), Geist (UI & body), and Caveat (handwritten annotations)
- **Icons**: Lucide React
- **Testing & QA**: Node native test runner (`node:test`), Playwright, and `tsx`

---

## Local Development & Setup

### Prerequisites
- Node.js 20+ (developed and verified on Node.js 24.13.0)
- npm 10+

### Installation
```bash
# Clone the repository
git clone https://github.com/manav-chaudhary01/portfolio.git
cd portfolio

# Install dependencies cleanly
npm ci
```

### Running Locally
```bash
# Start the Vite development server with integrated /api/activity proxy
npm run dev
```
The site will run at `http://localhost:5173/`.

### Validation Scripts
```bash
# Run TypeScript compilation check
npm run typecheck

# Run unit tests (activity normalization, caching, error boundaries)
npm test

# Run production build (typecheck + optimized bundle build)
npm run build

# Preview production build locally
npm run preview
```

---

## Environment Variables & Live Activity Setup

Live developer activity telemetry is aggregated server-side via `server/activityService.js` and `api/activity.ts`. This layer provides in-memory caching (15m GitHub/LeetCode, 30m LinkedIn), request coalescing, and independent error isolation.

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

| Variable | Required | Description |
| :--- | :--- | :--- |
| `SITE_URL` | Optional | Production canonical domain (e.g., `https://manavchaudhary.com`). Used during build by `scripts/generate-seo.js` to generate absolute canonical URLs in `sitemap.xml` and `robots.txt`. If unset, an explicit placeholder is generated. |
| `GITHUB_TOKEN` | Optional | Read-only GitHub Personal Access Token (classic: `read:user` or fine-grained: Public Repositories). Enables 52-week contribution calendar via GraphQL (`api.github.com/graphql`). If omitted, REST public events are used as fallback. |
| `GITHUB_USERNAME` | Default: `manav-chaudhary01` | GitHub username to query. |
| `LEETCODE_USERNAME` | Default: `manav_chaudhary01` | Public LeetCode username for profile, submission calendar, and solved counts (`leetcode.com/graphql`). Verified live for `manav_chaudhary01`. |
| `LINKEDIN_ACCESS_TOKEN` | Optional | Access token with `r_member_social` partner permissions for official Posts API. |
| `LINKEDIN_MEMBER_ID` | Optional | LinkedIn member identifier. If omitted, the service falls back to `src/data/latestLinkedInPost.ts` or profile link (`https://www.linkedin.com/in/manav-chaudhary13/`). |

> **Security Guarantee**: Environment variables are never prefixed with `VITE_` and are never exposed in frontend bundles.

---

## Deployment Configuration

### Vercel / Serverless
The repository includes `api/activity.ts` and `vercel.json` configured for zero-configuration deployment:
- Client SPA routing: All non-API routes rewrite to `/index.html`.
- API endpoint: `/api/activity` dispatches to the serverless activity aggregation function with HTTP caching (`Cache-Control: public, s-maxage=900, stale-while-revalidate=1800`) and 405 Method Not Allowed validation.
- Build command: `npm run build` (executes SEO sitemap generation, TypeScript typecheck, and Vite bundle compilation).
- Production domain: Set `SITE_URL` in your hosting dashboard (e.g. Vercel Project Settings > Environment Variables) so `sitemap.xml` and `robots.txt` render your live production domain.

---

## Important Architectural Limitations

1. **LeetCode Account Integrity**: LeetCode's public GraphQL gateway requires an active, public profile. If a user does not exist or is private, the portfolio intentionally does not fabricate statistics (such as 624 solved). It gracefully displays a clean unconfigured status with a direct link to LeetCode.
2. **LinkedIn Official API Access**: The LinkedIn Posts API requires restricted enterprise partner access (`r_member_social`). In standard environments, the portfolio utilizes `src/data/latestLinkedInPost.ts` to allow verified manual post curation without third-party API dependencies.
3. **Audio Context Autoplay Policy**: The Web Audio playground experiment respects browser user-gesture policies and will remain silent until explicitly interacted with by the user.
