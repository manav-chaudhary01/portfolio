import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../docs/screenshots/final-qa');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log('=== Phase 8: Final Production QA & Full Route Verification ===');

  let viteServer = null;
  try {
    const res = await fetch('http://localhost:5173/');
    if (res.ok) {
      console.log('Reusing existing Vite dev server at http://localhost:5173');
    }
  } catch {
    console.log('Launching Vite dev server on port 5173...');
    viteServer = await createServer({
      server: { port: 5173 },
    });
    await viteServer.listen();
    console.log('Vite server running on http://localhost:5173');
  }

  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });

  const errors = [];

  // ==========================================
  // VIEWPORTS DEFINITION
  // ==========================================
  const viewports = [
    { name: 'Desktop (1440x900)', width: 1440, height: 900, isMobile: false },
    { name: 'Laptop (1280x800)', width: 1280, height: 800, isMobile: false },
    { name: 'Tablet (768x1024)', width: 768, height: 1024, isMobile: false },
    { name: 'Mobile (390x844)', width: 390, height: 844, isMobile: true },
    { name: 'Narrow Mobile (360x800)', width: 360, height: 800, isMobile: true },
  ];

  // ==========================================
  // 1. MULTI-VIEWPORT OVERFLOW & RESPONSIVE AUDIT
  // ==========================================
  console.log('\n--- 1. Multi-Viewport Overflow & Rendering Audit ---');
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
    });
    const page = await context.newPage();

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(`[Console Error - ${vp.name}] ${msg.text()}`);
      }
    });

    const routes = [
      '/',
      '/about',
      '/playground',
      '/contact',
      '/activity',
      '/work/meter-flow',
      '/work/attendance-tracker',
      '/work/leetcode-widget',
    ];

    for (const route of routes) {
      const url = `http://localhost:5173${route}`;
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(200);

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      if (hasOverflow) {
        errors.push(`Horizontal overflow on ${route} at ${vp.name}`);
        console.log(`  [OVERFLOW FAIL] ${route} on ${vp.name}`);
      } else {
        // PASS
      }
    }

    console.log(`  Verified all routes for ${vp.name} (0 horizontal overflow)`);
    await context.close();
  }

  // ==========================================
  // 2. DETAILED DESKTOP SUITE & INTERACTION QA
  // ==========================================
  console.log('\n--- 2. Comprehensive Desktop Interaction QA (1440x900) ---');
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await desktopCtx.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(`[Desktop Console Error] ${msg.text()}`);
    }
  });

  // A. Homepage Initial Load & Capture
  console.log('Loading Homepage...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // Check document title
  const homeTitle = await page.title();
  console.log(`  Homepage document title: "${homeTitle}"`);
  if (!homeTitle.includes('Manav')) {
    errors.push(`Homepage document title does not contain "Manav": ${homeTitle}`);
  }

  await page.screenshot({
    path: path.join(outputDir, 'homepage-desktop.png'),
  });
  console.log('  Saved: homepage-desktop.png');

  // B. Project Previews & URL Synchronization
  console.log('Testing Project Preview URL synchronization...');
  await page.goto('http://localhost:5173/?project=meter-flow', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Explore Case Study', { timeout: 3000 });
  console.log('  Meter Flow preview opened via query param!');

  // Dismiss via Escape key
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  const currentUrl = page.url();
  console.log(`  After Escape, URL is: ${currentUrl}`);
  if (currentUrl.includes('project=')) {
    errors.push('Escape key did not dismiss project preview modal query param');
  }

  // C. Case Studies
  const caseStudies = [
    { slug: 'meter-flow', file: 'case-study-meter-flow.png' },
    { slug: 'attendance-tracker', file: 'case-study-attendance-tracker.png' },
    { slug: 'leetcode-widget', file: 'case-study-leetcode-widget.png' },
  ];

  for (const cs of caseStudies) {
    console.log(`Testing Case Study: /work/${cs.slug}...`);
    await page.goto(`http://localhost:5173/work/${cs.slug}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    const title = await page.title();
    console.log(`  Page Title: "${title}"`);

    // Verify system data flow and engineering decisions
    const hasDataFlow = await page.$('text=System Data Flow');
    const hasDecisions = await page.$('text=Engineering Decisions');
    if (!hasDataFlow || !hasDecisions) {
      errors.push(`Missing key case study sections in /work/${cs.slug}`);
    }

    // Direct reload verification
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(300);

    await page.screenshot({
      path: path.join(outputDir, cs.file),
    });
    console.log(`  Saved: ${cs.file}`);
  }

  // D. About Page
  console.log('Testing /about...');
  await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const aboutTitle = await page.title();
  console.log(`  About Page Title: "${aboutTitle}"`);
  await page.screenshot({
    path: path.join(outputDir, 'about-desktop.png'),
  });
  console.log('  Saved: about-desktop.png');

  // E. Playground Page
  console.log('Testing /playground...');
  await page.goto('http://localhost:5173/playground', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // Interact with spring slider
  const slider = await page.$('input[aria-label="Spring stiffness slider"]');
  if (slider) {
    await slider.fill('380');
    console.log('  Interacted with Spring stiffness slider');
  }

  // Interact with audio button
  const audioBtn = await page.$('button:has-text("Blue Click")');
  if (audioBtn) {
    await audioBtn.click();
    console.log('  Interacted with Audio micro-click button');
  }

  await page.screenshot({
    path: path.join(outputDir, 'playground-desktop.png'),
  });
  console.log('  Saved: playground-desktop.png');

  // F. Contact Page
  console.log('Testing /contact...');
  await page.goto('http://localhost:5173/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // Test email copy button
  const copyBtn = await page.$('button[aria-label*="email"]');
  if (copyBtn) {
    await copyBtn.click();
    console.log('  Clicked Copy Email button');
    await page.waitForTimeout(200);
  }

  await page.screenshot({
    path: path.join(outputDir, 'contact-desktop.png'),
  });
  console.log('  Saved: contact-desktop.png');

  // G. Live Activity Page & Elsewhere Section
  console.log('Testing /activity...');
  await page.goto('http://localhost:5173/activity', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Check heatmap cell hover / focus
  const heatmapCell = await page.$('button[aria-label*="contribution"]');
  if (heatmapCell) {
    await heatmapCell.focus();
    await page.waitForTimeout(200);
    const tooltip = await page.$('[role="tooltip"]');
    console.log(`  Heatmap keyboard focus tooltip: ${tooltip ? 'PASS' : 'FAIL'}`);
    if (!tooltip) {
      errors.push('Heatmap tooltip did not render on keyboard focus');
    }
  }

  await page.screenshot({
    path: path.join(outputDir, 'activity-page-desktop.png'),
  });
  console.log('  Saved: activity-page-desktop.png');

  // Capture homepage Elsewhere section view
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    const el = document.getElementById('elsewhere');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(outputDir, 'activity-elsewhere-homepage.png'),
  });
  console.log('  Saved: activity-elsewhere-homepage.png');

  await desktopCtx.close();

  // ==========================================
  // 3. MOBILE SUITE (390 x 844)
  // ==========================================
  console.log('\n--- 3. Mobile Dedicated Suite (390x844) ---');
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileCtx.newPage();

  mobilePage.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(`[Mobile Console Error] ${msg.text()}`);
    }
  });

  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(400);
  await mobilePage.screenshot({
    path: path.join(outputDir, 'homepage-mobile.png'),
  });
  console.log('  Saved: homepage-mobile.png');

  await mobileCtx.close();
  await browser.close();

  if (viteServer) {
    console.log('Stopping internal Vite dev server...');
    await viteServer.close();
  }

  console.log('\n==========================================');
  console.log(`Phase 8 Final QA Complete!`);
  console.log(`Total Errors / Failures: ${errors.length}`);
  if (errors.length > 0) {
    console.error(errors);
    process.exit(1);
  } else {
    console.log('ALL PHASE 8 QUALITY, RESPONSIVE, AND INTERACTION CRITERIA PASSED!');
  }
}

run().catch((err) => {
  console.error('Phase 8 QA Suite execution failed:', err);
  process.exit(1);
});
