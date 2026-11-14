import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, '../docs/screenshots');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log('Launching browser for Phase 4 visual captures...');
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });

  const consoleErrors = [];

  // ==========================================
  // DESKTOP CAPTURES (1440 x 900)
  // ==========================================
  console.log('--- Desktop (1440 x 900) ---');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const desktopPage = await desktopContext.newPage();
  desktopPage.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  // 1. Meter Flow Preview (Desktop)
  await desktopPage.goto('http://localhost:5173/?project=meter-flow', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({ path: path.join(outputDir, 'phase4-desktop-meter-flow.png') });
  console.log('Captured phase4-desktop-meter-flow.png');

  // 2. Attendance Tracker Preview (Desktop)
  await desktopPage.goto('http://localhost:5173/?project=attendance-tracker', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({ path: path.join(outputDir, 'phase4-desktop-attendance-tracker.png') });
  console.log('Captured phase4-desktop-attendance-tracker.png');

  // 3. LeetCode Desktop Widget Preview (Desktop)
  await desktopPage.goto('http://localhost:5173/?project=leetcode-widget', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({ path: path.join(outputDir, 'phase4-desktop-leetcode-widget.png') });
  console.log('Captured phase4-desktop-leetcode-widget.png');

  // 4. Capture transition state (opening animation)
  await desktopPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(300);
  await desktopPage.click('#nav-tile-work');
  await desktopPage.waitForTimeout(200);
  await desktopPage.screenshot({ path: path.join(outputDir, 'phase4-desktop-preview-transition.png') });
  console.log('Captured phase4-desktop-preview-transition.png');

  // ==========================================
  // MOBILE CAPTURES (390 x 844)
  // ==========================================
  console.log('--- Mobile (390 x 844) ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  const mobilePage = await mobileContext.newPage();
  mobilePage.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  // 5. Meter Flow Preview (Mobile)
  await mobilePage.goto('http://localhost:5173/?project=meter-flow', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(outputDir, 'phase4-mobile-meter-flow.png') });
  console.log('Captured phase4-mobile-meter-flow.png');

  // 6. Attendance Tracker Preview (Mobile)
  await mobilePage.goto('http://localhost:5173/?project=attendance-tracker', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(outputDir, 'phase4-mobile-attendance-tracker.png') });
  console.log('Captured phase4-mobile-attendance-tracker.png');

  // 7. LeetCode Desktop Widget Preview (Mobile)
  await mobilePage.goto('http://localhost:5173/?project=leetcode-widget', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(outputDir, 'phase4-mobile-leetcode-widget.png') });
  console.log('Captured phase4-mobile-leetcode-widget.png');

  await browser.close();

  console.log(`\nPhase 4 captures complete! Total console errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error(consoleErrors);
    process.exit(1);
  }
}

run().catch((err) => {
  console.error('QA capture error:', err);
  process.exit(1);
});
