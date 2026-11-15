# Elsewhere / Live Activity Architecture Specification

This document details the architecture, data flow, security model, and caching strategies for the **Elsewhere / Live Activity** feature of Manav's portfolio (Phase 7).

---

## 1. System Architecture Overview

```
                                      +---------------------------------------------+
                                      |                 Client                      |
                                      |   (React 19, Motion, Tailwind CSS)          |
                                      +---------------------------------------------+
                                                     |             |
                         GET /api/activity           |             | Client-side graceful fallback
                      (Dev server plugin / Vercel)   |             | (if serverless is unreachable)
                                                     v             v
+---------------------------------------------------------+   +---------------------------------------+
|                Serverless / API Handler                 |   |           src/services/               |
|      (api/activity.ts / server/activityService.js)      |   |          activityApi.ts               |
+---------------------------------------------------------+   +---------------------------------------+
        |                  |                   |
        | 15m TTL          | 15m TTL           | 30m TTL
        | In-memory Cache  | In-memory Cache   | In-memory Cache
        | Request Coalesce | Request Coalesce  | Request Coalesce
        v                  v                   v
+------------------+ +-------------------+ +-------------------+
|  GitHub GraphQL  | | LeetCode GraphQL  | | LinkedIn API /    |
|   & REST APIs    | | Public Profile    | | Manual Fallback   |
| (api.github.com) | |  (leetcode.com)   | | (api.linkedin.com)|
+------------------+ +-------------------+ +-------------------+
```

The system is architected as an **isolated proxy and aggregation layer** to:
1. Protect private API tokens (`GITHUB_TOKEN`, `LINKEDIN_ACCESS_TOKEN`) by ensuring they are strictly isolated on the server side and never sent to or bundled into client code.
2. Shield third-party APIs from client-side rate limits and prevent 429 errors via **in-memory caching** and **in-flight request coalescing**.
3. Shield the portfolio from third-party outages through **per-provider failure isolation** and **stale-while-revalidate** semantics.
4. Guarantee that when credentials are not configured or third-party usernames do not exist, the UI renders authentic, graceful states instead of fabricated statistics or broken interfaces.

---

## 2. Upstream Integrations & Data Contracts

### 2.1 GitHub Activity
- **Endpoints**:
  - **GraphQL**: `https://api.github.com/graphql` (queries `contributionsCollection.contributionCalendar` for the full 52-week contribution heatmap, days, and monthly breakdown).
  - **REST**: `https://api.github.com/users/{username}/events/public?per_page=5` (queries recent public pushes, pull requests, issues, stars, and releases).
- **Authentication**: Bearer `GITHUB_TOKEN` (Read-only personal access token).
- **Tokenless Fallback**: If `GITHUB_TOKEN` is unset in server environment variables, the service safely fetches up to 5 public events via REST without failing, reporting `status: 'not-configured'` with instructions.
- **Normalization**: Handled by `src/services/activityMappers.ts:mapGitHubResponse`, mapping contribution levels (`FIRST_QUARTILE` through `FOURTH_QUARTILE`) to numbers `0–4` matching GitHub's standard color scale.

### 2.2 LeetCode Activity
- **Endpoint**: `https://leetcode.com/graphql`
- **Query**:
  - `matchedUser(username)`: Retrieves `userCalendar` (`streak`, `totalActiveDays`, `submissionCalendar`, `activeYears`) and `submitStatsGlobal.acSubmissionNum` (`Easy`, `Medium`, `Hard`, `All`).
  - `recentAcSubmissionList(username, limit: 5)`: Retrieves recent accepted solutions (`title`, `titleSlug`, `timestamp`).
- **Authentication**: None required (public profile query).
- **Rate Limit & Privacy Safeguards**:
  - If `LEETCODE_USERNAME` is blank or unset, the service returns `status: 'not-configured'` without firing unnecessary network requests.
  - If the profile is private or the username does not exist on LeetCode, the service safely returns `status: 'unavailable'` with message `"LeetCode user not found or profile is private."`.
  - **Strict Anti-Fabrication Rule**: Under no circumstances does the application inject mock statistics (e.g., 624 solved) when a profile is unavailable. It displays a clean, authentic "Setup Required" state with a direct link to LeetCode.

### 2.3 LinkedIn Activity (Single Latest Post)
- **Primary Mechanism (Official API)**:
  - `https://api.linkedin.com/v2/posts?author=urn:li:person:{memberId}&sortBy=LAST_MODIFIED&count=1`
  - Requires `LINKEDIN_ACCESS_TOKEN` with approved `r_member_social` partner permissions.
- **Secondary Mechanism (Manual Single-Post Fallback)**:
  - If official API access is inactive (which is standard for personal profiles without enterprise partner apps), the service seamlessly reads `src/data/latestLinkedInPost.ts`.
  - Developers can set `postUrl`, `text`, `publishedAt`, and optional `imageUrl`.
  - If `latestLinkedInPost.ts` is empty, the UI renders a restrained, elegant "Connect on LinkedIn" card inviting visitors to view Manav's professional updates directly on LinkedIn.

---

## 3. Caching, Request Coalescing & Stale-If-Error

### 3.1 TTL (Time-To-Live)
| Provider | Cache TTL | Rationale |
| :--- | :--- | :--- |
| **GitHub** | **15 minutes** | Balances fresh commit/push display against GitHub's 5,000 req/hr rate limits. |
| **LeetCode** | **15 minutes** | Prevents IP throttling on LeetCode's public GraphQL gateway. |
| **LinkedIn** | **30 minutes** | LinkedIn posts update infrequently; 30 minutes minimizes unnecessary API calls. |

### 3.2 In-Flight Request Coalescing
If 10 visitors hit the portfolio simultaneously while the cache is cold, the service does **not** trigger 10 upstream calls. An `inFlight` promise map coalesces concurrent calls: all 10 callers await the single outgoing request, and the result is cached.

### 3.3 Stale-While-Revalidate / Stale-If-Error
If an upstream API returns HTTP 429, 500, or network timeouts, but a prior response exists in cache:
1. The service marks `isStale: true`.
2. It returns the previously cached data along with a friendly notice: `"Upstream error: ... Showing last cached telemetry."`.
3. The UI continues to render smoothly without showing an error screen.

---

## 4. Dual Runtime Support: Vite Dev Server & Vercel Serverless

- **Development (`npm run dev`)**:
  Integrated in `vite.config.ts` via `activityDevServerPlugin`. Any incoming request to `/api/activity` is intercepted by Vite's development server and dispatched directly to `server/activityService.js:getActivityPayload()`.
- **Production (`Vercel / Netlify / Node`)**:
  `api/activity.ts` exports a standard serverless handler compatible with Vercel and Node HTTP listeners, returning appropriate CORS headers and `Cache-Control: public, s-maxage=900, stale-while-revalidate=1800`.
- **Static / Offline Resilience**:
  If the portfolio is exported to a pure static host without any serverless runtime, `src/services/activityApi.ts` catches `fetch('/api/activity')` failures and automatically constructs a safe fallback client response with zero uncaught exceptions.

---

## 5. UI Presentation & Integration Points

1. **Homepage (`/`)**:
   An `<ElsewhereSection />` component is placed below the main introduction statement and above the footer dock, presenting GitHub, LeetCode, and LinkedIn in a cohesive, restrained 3-card layout with full responsive adaptation.
2. **Dedicated Activity Route (`/activity`)**:
   A comprehensive, full-page editorial activity dashboard accessible directly or via the expandable `SocialDock` (`/activity`), featuring full heatmaps, problem breakdowns, streak counters, and recent activity streams.
3. **Expandable Social Dock**:
   The bottom navigation dock provides a direct tactile link labeled **Activity** with a live pulsing indicator.
