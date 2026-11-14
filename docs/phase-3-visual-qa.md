# Phase 3 Visual QA & Interaction Refinement Report

**Project**: Manav's Personal Portfolio  
**Working Directory**: `c:\Users\Acer\Desktop\manav-portfolio`  
**Test Date**: November 2026  
**Viewport Environments**: Desktop (1440 × 900 @ 2x), Mobile (390 × 844 @ 2x)  
**Status**: Verified & Passed  

---

## 1. Executive Summary

Following the completion of the Phase 3 homepage composition milestone, this dedicated visual QA and accessibility pass evaluated the implementation against the visual design language of **Pixelwrld (`pixelwrld.co`)** and resolved all identified interaction and accessibility defects.

All visual states have been captured from the live application using automated headless browser runs in Google Chrome. All keyboard interactions, URL synchronizations, and focus loops have been validated with zero console errors.

---

## 2. Issues Identified & Corrections Made

| Component | Defect Identified | Engineering Correction Applied | Validation Outcome |
|---|---|---|---|
| **SocialDock** | Hardcoded `aria-expanded="false"`. | Bound `aria-expanded={isOpen}` dynamically to trigger button. | Screen readers accurately announce dock toggle state. |
| **SocialDock** | Missing outside-click dismissal. | Implemented document-level `pointerdown` and `mousedown` listeners in `useDialogFocus` hook with trigger button exemption. | Clicking anywhere outside the dock instantly and smoothly dismisses it. |
| **SocialDock** | Focus escaping modal boundary. | Integrated Tab and Shift+Tab focus trap within open dock. | Focus cycles strictly through close button and social action buttons. |
| **NavigationTile** | Disjointed interactive control: separate `<motion.button>` and clickable `<motion.span>` label. | Refactored `NavTile.tsx` into a single, cohesive semantic `<motion.button>` containing both the 3D illustration and the micro-pill label. | Screen reader announces a single button; hover, tap, and keyboard focus apply simultaneously across icon and label. |
| **Modals (All)** | Missing initial focus placement. | Created `useDialogFocus.ts` custom hook that automatically places initial focus on the first focusable element (close button). | Keyboard users immediately land on the modal's primary action. |
| **Modals (All)** | Focus loss upon closing dialogs. | Tracked `activeTriggerRef` (e.g. `#nav-tile-work`) on opening and restored DOM focus to the invoking tile upon closing. | Focus cleanly returns to the navigation tile after modal dismissal. |
| **Project Preview** | Inconsistent accessibility compared to section modals. | Extracted `ProjectPreviewModal.tsx` into a dedicated accessible dialog with identical focus trapping, Escape dismissal, and outside click handling. | Uniform accessibility standard across all dialogs and URL-driven preview states. |

---

## 3. Visual Comparison & Craft Evaluation

### 3.1 Desktop Viewport (1440 × 900)
- **Overall Composition**: The warm off-white canvas (`#FAF8F5`) with a subtle radial dot matrix creates an airy, calm "corner of the internet" feel. Ample vertical whitespace separates the header, navigation island, intro bio, and footer dock.
- **Handwritten Greeting**: Styled with `Caveat` script, rendered at 36px with a gentle -3.5° tilt. Sits above the navigation island with balanced breathing room.
- **Illustrated Navigation Objects**:
  1. *Work*: Isometric application portal with recessed screen, blue accent disc, and star sparkle.
  2. *About*: Circular avatar badge with dark collar, friendly face, and soft lighting rim.
  3. *Playground*: Isometric 3D Rubik's/geometry block with multi-faceted pastel faces (lime, cyan, magenta, orange) and ambient floor shadow.
  4. *Contact*: Tactile split-tone smiley orb (cream/green) with glossy lighting.
- **Hover Lift & Spring Dynamics**: Hovering over any object triggers a spring-based lift (`y: -8px`), dynamic tilt (`rotate: tilt * 1.5`), and multi-stop shadow bloom (`shadow-tactile-hover`). Pill labels transition from subtle grey to hover contrast.
- **Sibling Focus Dimming & Blur**: Opening any modal or project preview applies `backdrop-filter: blur(12px)` and dims the background to `opacity: 0.25`, maintaining visual focus on the active modal.
- **Footer Social Dock**: In idle state, sits as an unobtrusive 3-dot pill (`...`). On click, expands upward into a floating sheet dock with circular action buttons for Email, GitHub, LinkedIn, and Résumé.

### 3.2 Mobile Viewport (390 × 844)
- **Responsive Navigation**: Transitions gracefully from a 4-column desktop layout into a balanced 2x2 grid.
- **Touch Ergonomics**: All tiles and action buttons exceed 48px × 48px tap target minimums.
- **Modal Scaling**: Modals adapt to `max-w-lg` with comfortable padding (`p-6`) and stacked actions on mobile screens.

---

## 4. Automated Browser Verification Results

All tests were executed against the live application using Playwright driving native Google Chrome (`v130+`):

| Test Scenario | Description | Expected Behavior | Actual Result | Status |
|---|---|---|---|---|
| **Direct Load** | Direct navigation to `http://localhost:5173/` | Homepage loads with correct title and all 4 tiles | Page title "Manav — Portfolio" verified | **PASS** |
| **URL Query Sync** | Direct navigation to `/?project=meter-flow` | Project preview modal opens immediately on page load | Preview modal opened with Meter Flow data | **PASS** |
| **Browser Back** | Trigger browser Back while project preview is open | Modal dismisses and URL returns to `/` | Modal dismissed cleanly | **PASS** |
| **Browser Forward** | Trigger browser Forward from `/` | Preview modal re-opens and URL returns to `/?project=meter-flow` | Preview modal restored | **PASS** |
| **Escape Dismissal** | Press `Escape` while preview or modal is open | Dialog closes smoothly | Dialog dismissed | **PASS** |
| **Focus Trapping** | Press `Tab` and `Shift+Tab` within open modal | Focus loops strictly within dialog elements | Focus never escapes to background | **PASS** |
| **Focus Restoration** | Close modal via `Escape` or close button | Focus returns to invoking tile (`#nav-tile-work`) | Focus restored to `#nav-tile-work` | **PASS** |
| **Outside Click** | Click backdrop outside modal container | Modal closes smoothly | Modal dismissed on outside click | **PASS** |
| **Dock Outside Click** | Click outside expanded social dock | Dock collapses back to 3-dot pill | Dock collapsed cleanly | **PASS** |
| **Reduced Motion** | Emulate `prefers-reduced-motion: reduce` | Large spring rotations and transforms are bypassed | Tile transform: `none` | **PASS** |
| **Console Errors** | Monitor browser console across all flows | Zero uncaught errors or warnings | 0 errors detected | **PASS** |

---

## 5. Visual Artifacts Captured

The following screenshots were captured during the QA session and are preserved in `docs/screenshots/`:

1. [01-desktop-initial-homepage.png](file:///c:/Users/Acer/Desktop/manav-portfolio/docs/screenshots/01-desktop-initial-homepage.png) — Clean desktop homepage composition.
2. [02a-desktop-hover-work.png](file:///c:/Users/Acer/Desktop/manav-portfolio/docs/screenshots/02a-desktop-hover-work.png) — Hover state over Work tile (lift, tilt, shadow bloom).
3. [02b-desktop-hover-about.png](file:///c:/Users/Acer/Desktop/manav-portfolio/docs/screenshots/02b-desktop-hover-about.png) — Hover state over About tile.
4. [02c-desktop-hover-playground.png](file:///c:/Users/Acer/Desktop/manav-portfolio/docs/screenshots/02c-desktop-hover-playground.png) — Hover state over Playground tile.
5. [02d-desktop-hover-contact.png](file:///c:/Users/Acer/Desktop/manav-portfolio/docs/screenshots/02d-desktop-hover-contact.png) — Hover state over Contact tile.
6. [03-desktop-work-modal.png](file:///c:/Users/Acer/Desktop/manav-portfolio/docs/screenshots/03-desktop-work-modal.png) — Work selection modal with verified projects.
7. [04-desktop-project-preview.png](file:///c:/Users/Acer/Desktop/manav-portfolio/docs/screenshots/04-desktop-project-preview.png) — Pixelwrld-inspired floating preview card for Meter Flow.
8. [05-desktop-about-modal.png](file:///c:/Users/Acer/Desktop/manav-portfolio/docs/screenshots/05-desktop-about-modal.png) — About Manav narrative and core competencies.
9. [06-desktop-playground-modal.png](file:///c:/Users/Acer/Desktop/manav-portfolio/docs/screenshots/06-desktop-playground-modal.png) — Interactive spring physics playground demo.
10. [07-desktop-expanded-social-dock.png](file:///c:/Users/Acer/Desktop/manav-portfolio/docs/screenshots/07-desktop-expanded-social-dock.png) — Expanded floating contact dock.
11. [08-mobile-initial-homepage.png](file:///c:/Users/Acer/Desktop/manav-portfolio/docs/screenshots/08-mobile-initial-homepage.png) — Mobile viewport (390 × 844) 2x2 grid layout.
12. [09-mobile-project-preview.png](file:///c:/Users/Acer/Desktop/manav-portfolio/docs/screenshots/09-mobile-project-preview.png) — Mobile project preview card.
13. [10-mobile-expanded-social-dock.png](file:///c:/Users/Acer/Desktop/manav-portfolio/docs/screenshots/10-mobile-expanded-social-dock.png) — Mobile expanded social dock.

---

## 6. Remaining Limitations & Handoff to Phase 4

- All homepage interactions, visual details, and accessibility requirements are fully resolved and verified.
- The foundation is prepared for **Phase 4: Expanding Project Previews**, which will enhance the internal preview mockups with multi-project visuals and deepen the transition into dedicated Portal-style case studies.
