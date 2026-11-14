# Portfolio Design Brief: Manav's Personal Portfolio

**Author & Technical Collaborator**: Senior Frontend Engineer & Interaction Designer  
**Target Repository**: `https://github.com/manav-chaudhary01/portfolio.git`  
**Date**: November 2026  
**Status**: Milestone 1 — Design Brief & Architecture Planning  

---

## 1. Executive Summary & Creative Vision

The objective of this project is to create an original, minimal, and playful personal portfolio for **Manav** that departs from conventional, generic developer portfolios (such as full-bleed SaaS templates, giant metric carousels, or multi-column skill bar grids). Instead, the portfolio is conceived as a **warm, tactile "corner of the internet"** that balances playful micro-interactions with refined editorial project storytelling.

### Reference Synthesis
Our design philosophy merges the strongest aspects of two key references:

1. **Pixelwrld (`pixelwrld.co`)**:
   - **Composition**: Centered, spacious homepage with a warm off-white canvas and subtle dotted grid.
   - **Tone**: Handwritten greeting ("Welcome to my corner on the internet :)"), human and welcoming.
   - **Navigation**: Playful, illustrated/3D tactile objects floating above clean rounded pill labels.
   - **Physics & Motion**: Bouncy hover lifts, spring physics, soft ambient shadows, and gentle tilts.
   - **State Transition**: Clicking a project dims and softly blurs the background (`backdrop-filter: blur(12px)` + dimmed opacity), expanding a multi-layered preview showcase while keeping the focal object anchored.
   - **Expandable Dock**: Minimal bottom pill (`...`) that expands upward into a floating contact dock with circular icons.

2. **Portal (`useportal.net`)**:
   - **Editorial Typography**: Refined serif editorial display headings paired with high-contrast, perfectly tracked modern sans-serif body typography.
   - **Storytelling Layout**: Generous whitespace, clean horizontal rules, and structured feature pills with bold circular category icons.
   - **Annotated Details**: Playful handwritten callouts and directional arrows highlighting technical breakthroughs or key features.
   - **Clarity & Craft**: Pristine product presentation, large high-fidelity screenshot showcases, and disciplined information hierarchy.

---

## 2. Visual Identity & Design System

### 2.1 Color Palette
The color system emphasizes warm, low-fatigue neutrals paired with tasteful, soft pastel accents. It avoids saturated neon gradients and stark corporate monochrome.

| Token | Hex Value | Usage |
|---|---|---|
| `--color-canvas-bg` | `#FAF8F5` | Primary warm off-white background |
| `--color-canvas-dot` | `rgba(0, 0, 0, 0.07)` | Subtle background grid dots (16px / 20px spacing) |
| `--color-surface` | `#FFFFFF` | Card containers, modal overlays, elevated surfaces |
| `--color-surface-subtle` | `#F2EFE9` | Micro-pill labels, inactive buttons, dock backgrounds |
| `--color-text-primary` | `#1A1917` | High-contrast editorial titles, primary headings |
| `--color-text-secondary` | `#63615A` | Body copy, explanatory summaries, metadata |
| `--color-text-muted` | `#96938B` | Subtle tags, timestamps, secondary micro-labels |
| `--color-border-subtle` | `rgba(0, 0, 0, 0.08)` | Crisp, ultra-thin borders for cards and pill containers |
| `--color-accent-blue` | `#3B82F6` | Accent highlight (Meter Flow / interactive links) |
| `--color-accent-green` | `#10B981` | Accent highlight (Attendance Tracker / status badges) |
| `--color-accent-amber` | `#F59E0B` | Accent highlight (LeetCode Widget / streak badges) |
| `--color-accent-purple` | `#8B5CF6` | Playground / experimental tags |

### 2.2 Typography Hierarchy
The typography system uses a three-tier typographic pairing:

1. **Handwritten Greeting Script**:
   - *Font*: Hand-drawn SVG script / `Caveat` / `Nanum Pen Script`.
   - *Style*: Tilted (-3° to -5°), playful, authentic, warm dark-charcoal tone (`#4A4843`).
   - *Role*: Personal greeting ("Welcome to my corner of the internet :)").
2. **Editorial Display Serif** (Portal-inspired):
   - *Font*: `Instrument Serif` / `Newsreader` / `Playfair Display`.
   - *Style*: 32px – 48px, relaxed letter-spacing, italic accents where appropriate.
   - *Role*: Project titles in expanded views, section headers, statement quotes.
3. **Primary Sans-Serif**:
   - *Font*: `Plus Jakarta Sans` / `Geist Sans` / `Inter`.
   - *Style*: 12px (pill labels, uppercase tracking +0.05em), 14px – 16px (body copy, 1.65 line height), 18px – 20px (subheadings).
   - *Role*: Clean labels, descriptions, metadata, navigation, technical specifications.

### 2.3 Canvas & Spatial Grid
- **Dotted Grid Texture**: Rendered via an efficient CSS radial background or SVG canvas pattern. Stays crisp across all DPI displays with zero layout shift.
- **Viewport Layout**: Centered content island with responsive vertical padding (`py-12 md:py-20`).
- **Whitespace Discipline**: Ample margins around central elements ensuring the interface feels airy, calm, and uncluttered.

---

## 3. Interactive Component Specification

### 3.1 Homepage Navigation Island
The homepage centers on four primary interactive objects arranged horizontally (or responsive 2x2 grid on mobile):

```
                     [ Handwritten Greeting: "welcome to my corner on the internet :)" ]
                                                      
   ┌───────────────┐     ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
   │  [3D Object]  │     │  [3D Object]  │     │  [3D Object]  │     │  [3D Object]  │
   │   (Projects)  │     │    (About)    │     │  (Playground) │     │   (Contact)   │
   └───────────────┘     └───────────────┘     └───────────────┘     └───────────────┘
       ( Work )              ( About )          ( Playground )          ( Contact )

                       [ Centered intro bio paragraph with relaxed leading ]

                                            ( • • • )  <-- Expandable Dock Trigger
```

#### Object Breakdown:
1. **Work** (Primary Showcase):
   - *Visual*: Layered tactile isometric tile or multi-project stack.
   - *Label*: `Work` (or project quick-switchers: Meter Flow, Attendance Tracker, LeetCode Widget).
   - *Action*: Triggers project selector or expands directly into featured work preview.
2. **About** (Personal Identity):
   - *Visual*: Illustrated memoji / stylized avatar or personal creative emblem.
   - *Label*: `About Manav`.
   - *Action*: Expands an editorial narrative detailing background, engineering philosophy, and technical stack.
3. **Playground** (Experiments):
   - *Visual*: Isometric colorful Rubik's block or interactive mini-physics orb.
   - *Label*: `Playground`.
   - *Action*: Opens lightweight interactive creative micro-experiments (canvas physics, generative patterns, tactile toggles).
4. **Contact / Collab**:
   - *Visual*: Tactile chat bubble or postbox tile.
   - *Label*: `Get in Touch`.
   - *Action*: Toggles the expanded contact sheet / social dock.

### 3.2 Micro-Interactions & Physics
- **Hover Behavior**:
  - Spring-based lift: `y: -8px`, `scale: 1.05`.
  - Subtle rotational wobble: `rotate: 1.5deg` or `-1.5deg` alternating.
  - Multi-stop soft shadow bloom (`box-shadow: 0 20px 30px -10px rgba(0,0,0,0.12)`).
  - Pill label background shifts slightly darker (`#E8E5DF`) with gentle font tracking change.
- **Click & Focus Transition (The Pixelwrld Effect)**:
  - Selected object remains in razor-sharp focus.
  - Non-selected siblings smoothly transition to `opacity: 0.15` and `filter: blur(8px)`.
  - Surrounding homepage text gently fades out.
  - An expanding preview container rises from behind or above the selected object with an orchestrated spring animation (`stiffness: 300, damping: 25`).
- **Dismissal**:
  - Clicking anywhere on the blurred backdrop, pressing `Escape`, or clicking an explicit close button gracefully reverses the layout springs and restores the crisp homepage state.

### 3.3 Project Showcase & Detail Architecture (Portal Style)
When a project is expanded, it presents two layers of depth:
1. **Quick Preview Card (Inline Modal)**:
   - Elevated card showing angled project visual mockups.
   - High-contrast serif project title.
   - Concise 2-sentence value proposition.
   - Key technology chips (verified from codebase).
   - Action buttons: "Explore Case Study" (editorial view) and "View Live / GitHub".
2. **Editorial Case Study (Portal Deep-Dive)**:
   - Magazine-style layout with generous whitespace.
   - Large, high-resolution product showcase.
   - Structured feature grid with circular category badges.
   - Handwritten callout notes pointing to architecture highlights (e.g. "Linear spend burn-rate engine", "Wallpaper-level Explorer resilience", "Offline-first IndexedDB sync").
   - Architecture summary table comparing Frontend, Backend/Runtime, Data Storage, Precision/Math, and Security.

### 3.4 Expandable Social Footer Dock
- Centered at the bottom of the viewport is a discrete pill button with three dots (`...`).
- When clicked or focused:
  - Floats up smoothly as a rounded dock container.
  - Houses 4 circular icon buttons:
    1. **Email / Reach Out** (`mailto:manav.chaudhary1303@gmail.com`)
    2. **GitHub** (`github.com/manav-chaudhary01`)
    3. **LinkedIn** (configured profile link)
    4. **Résumé** (view / download action)
  - Small tactile labels appear below each icon button.
  - Subtle copyright & location stamp ("Built by Manav • 2026").

---

## 4. Accessibility & Inclusive Design
- **Keyboard Navigation**: Full Tab order through interactive tiles, preview cards, modal triggers, and footer actions.
- **Focus Rings**: Accessible, high-contrast custom focus indicators (`outline: 2px solid #3B82F6; outline-offset: 4px`).
- **Screen Reader Support**: All illustrated objects provide explicit `aria-label`s; expanded states manage `aria-expanded` and `aria-haspopup`; modals trap focus and announce dialog roles.
- **Reduced Motion**: Full support for `prefers-reduced-motion: reduce`. All spring animations, large scale transforms, and blur filters are replaced with swift, accessible opacity cross-fades (`duration: 0.15s`).
- **Touch Ergonomics**: All interactive tap targets meet or exceed minimum dimensions (48px × 48px), with touch feedback (`active:scale-95`).

---

## 5. Verified Project Content Matrix
In adherence to the strict accuracy guidelines, the portfolio documents only verified, existing projects and implementations without invented claims.

| Project Name | Type | Core Technologies | Verified Key Capabilities |
|---|---|---|---|
| **Meter Flow** | Multi-Tenant SaaS Metered Billing Platform | Node.js v24+, Express v5, MongoDB Atlas, Mongoose v9, Decimal.js, JWT, bcryptjs, Helmet, CORS | Multi-tenant workspace data isolation (`owner`, `admin`, `member`), metered/subscription/hybrid service catalogs, arbitrary-precision financial math, usage ingestion idempotency, linear burn-rate predictive spend alerts, 163 automated tests. |
| **Attendance Tracker** | Offline-First Web Application | React 19, TypeScript, Vite, Tailwind CSS, IndexedDB (`idb`), Lucide React | Persistent client-side attendance logging without mandatory remote backend, calendar heatmaps, subject-wise threshold tracking, responsive UI, zero data leakage. |
| **LeetCode Desktop Widget** | Native Windows System Utility | C#, WPF, .NET 10 LTS, LeetCode GraphQL API, Windows Shell APIs | Wallpaper-layer integration behind active windows, Explorer restart resilience (`explorer.exe`), 53-week submission heatmap, difficulty breakdowns, offline local cache, 60-minute background sync. |
