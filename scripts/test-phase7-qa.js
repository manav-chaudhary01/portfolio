import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../docs/screenshots');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log('=== Starting Phase 7 (Elsewhere / Live Activity) Browser QA ===');

  let viteServer = null;
  try {
    const res = await fetch('http://localhost:5173/');
    if (res.ok) {
      console.log('Reusing existing Vite server at http://localhost:5173');
    }
  } catch {
    console.log('Starting internal Vite dev server on port 5173...');
    viteServer = await createServer({
      server: { port: 5173 },
    });
    await viteServer.listen();
    console.log('Vite dev server successfully launched on http://localhost:5173');
  }

  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });

  const consoleErrors = [];

  // ==========================================
  // 1. DESKTOP SUITE (1440 x 900)
  // ==========================================
  console.log('\n--- 1. Desktop Suite (1440 x 900) ---');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const desktopPage = await desktopContext.newPage();
  desktopPage.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Desktop Console Error] ${msg.text()}`);
    }
  });

  // A. Homepage -> Elsewhere Section
  console.log('Navigating to Desktop Homepage http://localhost:5173/...');
  await desktopPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(600);

  // Check Elsewhere section presence
  const elsewhereSection = await desktopPage.$('#elsewhere');
  if (!elsewhereSection) {
    consoleErrors.push('Missing #elsewhere on homepage');
  } else {
    console.log('Found #elsewhere on homepage!');
  }

  // Scroll to Elsewhere section smoothly
  await desktopPage.evaluate(() => {
    const el = document.getElementById('elsewhere');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await desktopPage.waitForTimeout(600);

  // Verify cards on homepage
  const hasGitHubCard = await desktopPage.$('text=GitHub Activity');
  const hasLeetCodeCard = await desktopPage.$('text=LeetCode');
  const hasLinkedInCard = await desktopPage.$('text=LinkedIn');

  console.log(`Homepage Elsewhere Cards: GitHub=${!!hasGitHubCard}, LeetCode=${!!hasLeetCodeCard}, LinkedIn=${!!hasLinkedInCard}`);
  if (!hasGitHubCard || !hasLeetCodeCard || !hasLinkedInCard) {
    consoleErrors.push('One or more Elsewhere cards missing on homepage');
  }

  // Check desktop homepage horizontal overflow
  const desktopHomeOverflow = await desktopPage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`Desktop Homepage Overflow: ${desktopHomeOverflow ? 'FAIL' : 'PASS'}`);
  if (desktopHomeOverflow) consoleErrors.push('Desktop homepage horizontal overflow detected');

  // Capture Desktop Homepage Elsewhere Section
  await desktopPage.screenshot({
    path: path.join(outputDir, 'phase7-desktop-elsewhere-homepage.png'),
  });
  console.log('Captured phase7-desktop-elsewhere-homepage.png');

  // B. Navigate to /activity
  console.log('\nNavigating to Dedicated Activity Page http://localhost:5173/activity...');
  await desktopPage.goto('http://localhost:5173/activity', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(800);

  // Verify page title and structure
  const activityHeading = await desktopPage.waitForSelector('text=Live Activity & Social Presence', { timeout: 4000 });
  if (!activityHeading) {
    consoleErrors.push('Missing main heading on /activity');
  } else {
    console.log('Found "Live Activity & Social Presence" heading on /activity!');
  }

  // Direct refresh verification on /activity
  console.log('Testing direct refresh on /activity...');
  await desktopPage.reload({ waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(600);
  console.log('Direct refresh on /activity completed without errors!');

  // Check desktop activity page overflow
  const desktopActivityOverflow = await desktopPage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`Desktop /activity Overflow: ${desktopActivityOverflow ? 'FAIL' : 'PASS'}`);
  if (desktopActivityOverflow) consoleErrors.push('Desktop /activity horizontal overflow detected');

  // Capture Desktop /activity Page
  await desktopPage.screenshot({
    path: path.join(outputDir, 'phase7-desktop-activity-page.png'),
  });
  console.log('Captured phase7-desktop-activity-page.png');

  // ==========================================
  // 2. MOBILE SUITE (390 x 844)
  // ==========================================
  console.log('\n--- 2. Mobile Suite (390 x 844) ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  const mobilePage = await mobileContext.newPage();
  mobilePage.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Mobile Console Error] ${msg.text()}`);
    }
  });

  // A. Mobile Homepage Elsewhere Section
  console.log('Navigating to Mobile Homepage http://localhost:5173/...');
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);

  await mobilePage.evaluate(() => {
    const el = document.getElementById('elsewhere');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await mobilePage.waitForTimeout(600);

  const mobileHomeOverflow = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`Mobile Homepage Overflow: ${mobileHomeOverflow ? 'FAIL' : 'PASS'}`);
  if (mobileHomeOverflow) consoleErrors.push('Mobile homepage horizontal overflow detected');

  await mobilePage.screenshot({
    path: path.join(outputDir, 'phase7-mobile-elsewhere-homepage.png'),
  });
  console.log('Captured phase7-mobile-elsewhere-homepage.png');

  // B. Mobile /activity
  console.log('\nNavigating to Mobile /activity...');
  await mobilePage.goto('http://localhost:5173/activity', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(800);

  const mobileActivityOverflow = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`Mobile /activity Overflow: ${mobileActivityOverflow ? 'FAIL' : 'PASS'}`);
  if (mobileActivityOverflow) consoleErrors.push('Mobile /activity horizontal overflow detected');

  await mobilePage.screenshot({
    path: path.join(outputDir, 'phase7-mobile-activity-page.png'),
  });
  console.log('Captured phase7-mobile-activity-page.png');

  // Close browser and cleanup
  await browser.close();
  if (viteServer) {
    console.log('Stopping internal Vite dev server...');
    await viteServer.close();
  }

  console.log('\n==========================================');
  console.log(`Phase 7 Browser QA Completed!`);
  console.log(`Total Console / Functional Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error(consoleErrors);
    process.exit(1);
  } else {
    console.log('ALL PHASE 7 BROWSER QA TESTS & QUALITY CRITERIA PASSED!');
  }
}

run().catch((err) => {
  console.error('Phase 7 Browser QA Test execution failed:', err);
  process.exit(1);
});
