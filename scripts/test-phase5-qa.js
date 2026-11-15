import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../docs/screenshots');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log('=== Starting Phase 5 Case Study Browser QA ===');
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });

  const consoleErrors = [];

  // ==========================================
  // 1. DESKTOP VERIFICATION (1440 x 900)
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

  // Flow: Homepage -> Work Preview -> Explore Case Study -> /work/meter-flow
  console.log('Testing flow: Homepage -> Preview -> Case Study...');
  await desktopPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(400);

  // Open Meter Flow preview via query param
  await desktopPage.goto('http://localhost:5173/?project=meter-flow', { waitUntil: 'networkidle' });
  await desktopPage.waitForSelector('text=Explore Case Study', { timeout: 3000 });
  await desktopPage.click('text=Explore Case Study');
  await desktopPage.waitForURL('**/work/meter-flow', { timeout: 3000 });
  console.log('Successfully navigated to /work/meter-flow via Explore Case Study button!');

  // Capture Desktop Meter Flow Case Study
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({
    path: path.join(outputDir, 'phase5-desktop-meter-flow.png'),
  });
  console.log('Captured phase5-desktop-meter-flow.png');

  // Verify Browser Back & Forward
  console.log('Testing browser Back & Forward...');
  await desktopPage.goBack();
  await desktopPage.waitForTimeout(400);
  console.log('Current URL after Back:', desktopPage.url());

  await desktopPage.goForward();
  await desktopPage.waitForTimeout(400);
  console.log('Current URL after Forward:', desktopPage.url());

  // Test Direct Route & Refresh on Attendance Tracker
  console.log('Testing direct navigation and refresh on /work/attendance-tracker...');
  await desktopPage.goto('http://localhost:5173/work/attendance-tracker', { waitUntil: 'networkidle' });
  await desktopPage.reload({ waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({
    path: path.join(outputDir, 'phase5-desktop-attendance-tracker.png'),
  });
  console.log('Captured phase5-desktop-attendance-tracker.png');

  // Test Direct Route & Refresh on LeetCode Widget
  console.log('Testing direct navigation and refresh on /work/leetcode-widget...');
  await desktopPage.goto('http://localhost:5173/work/leetcode-widget', { waitUntil: 'networkidle' });
  await desktopPage.reload({ waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({
    path: path.join(outputDir, 'phase5-desktop-leetcode-widget.png'),
  });
  console.log('Captured phase5-desktop-leetcode-widget.png');

  // Verify Horizontal Overflow on Desktop
  const desktopOverflow = await desktopPage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`Desktop Horizontal Overflow check: ${desktopOverflow ? 'FAIL (Overflow)' : 'PASS (No Overflow)'}`);
  if (desktopOverflow) {
    consoleErrors.push('Horizontal overflow detected on desktop viewport.');
  }

  // Verify Project Navigation Links (Next Project / Prev Project)
  console.log('Testing Project Navigation Next link from leetcode-widget...');
  await desktopPage.click('text=Next Project');
  await desktopPage.waitForTimeout(400);
  console.log('Navigated to:', desktopPage.url());

  // ==========================================
  // 2. MOBILE VERIFICATION (390 x 844)
  // ==========================================
  console.log('\n--- 2. Mobile Suite (390 x 844) ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });

  const mobilePage = await mobileContext.newPage();
  mobilePage.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Mobile Console Error] ${msg.text()}`);
    }
  });

  // Meter Flow (Mobile)
  await mobilePage.goto('http://localhost:5173/work/meter-flow', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({
    path: path.join(outputDir, 'phase5-mobile-meter-flow.png'),
  });
  console.log('Captured phase5-mobile-meter-flow.png');

  // Mobile Horizontal Overflow Check
  const mobileOverflow1 = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`Mobile Meter Flow Overflow: ${mobileOverflow1 ? 'FAIL' : 'PASS'}`);
  if (mobileOverflow1) consoleErrors.push('Mobile horizontal overflow detected on Meter Flow.');

  // Attendance Tracker (Mobile)
  await mobilePage.goto('http://localhost:5173/work/attendance-tracker', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({
    path: path.join(outputDir, 'phase5-mobile-attendance-tracker.png'),
  });
  console.log('Captured phase5-mobile-attendance-tracker.png');

  const mobileOverflow2 = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`Mobile Attendance Tracker Overflow: ${mobileOverflow2 ? 'FAIL' : 'PASS'}`);
  if (mobileOverflow2) consoleErrors.push('Mobile horizontal overflow detected on Attendance Tracker.');

  // LeetCode Desktop Widget (Mobile)
  await mobilePage.goto('http://localhost:5173/work/leetcode-widget', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({
    path: path.join(outputDir, 'phase5-mobile-leetcode-widget.png'),
  });
  console.log('Captured phase5-mobile-leetcode-widget.png');

  const mobileOverflow3 = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`Mobile LeetCode Widget Overflow: ${mobileOverflow3 ? 'FAIL' : 'PASS'}`);
  if (mobileOverflow3) consoleErrors.push('Mobile horizontal overflow detected on LeetCode Widget.');

  await browser.close();

  console.log('\n==========================================');
  console.log(`Phase 5 QA Completed!`);
  console.log(`Total Console / Functional Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error(consoleErrors);
    process.exit(1);
  } else {
    console.log('ALL TESTS & QUALITY CRITERIA PASSED!');
  }
}

run().catch((err) => {
  console.error('QA Test execution failed:', err);
  process.exit(1);
});
