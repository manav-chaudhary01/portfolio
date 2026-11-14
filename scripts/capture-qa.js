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
  console.log('Launching browser for visual QA captures...');
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });

  const consoleErrors = [];

  // ==========================================
  // DESKTOP CAPTURES (1440 x 900)
  // ==========================================
  console.log('--- Desktop (1440 x 900) ---');
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // 1. Initial Homepage
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outputDir, '01-desktop-initial-homepage.png') });
  console.log('Captured 01-desktop-initial-homepage.png');

  // 2a. Hover Work
  await page.hover('#nav-tile-work');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outputDir, '02a-desktop-hover-work.png') });
  console.log('Captured 02a-desktop-hover-work.png');

  // 2b. Hover About
  await page.hover('#nav-tile-about');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outputDir, '02b-desktop-hover-about.png') });
  console.log('Captured 02b-desktop-hover-about.png');

  // 2c. Hover Playground
  await page.hover('#nav-tile-playground');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outputDir, '02c-desktop-hover-playground.png') });
  console.log('Captured 02c-desktop-hover-playground.png');

  // 2d. Hover Contact
  await page.hover('#nav-tile-contact');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outputDir, '02d-desktop-hover-contact.png') });
  console.log('Captured 02d-desktop-hover-contact.png');

  // Move mouse away to reset hover state
  await page.mouse.move(10, 10);
  await page.waitForTimeout(300);

  // 3. Work Selection Modal
  await page.click('#nav-tile-work');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outputDir, '03-desktop-work-modal.png') });
  console.log('Captured 03-desktop-work-modal.png');

  // Close work modal via escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  // 4. Individual Project Preview (via query param ?project=meter-flow)
  await page.goto('http://localhost:5173/?project=meter-flow', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outputDir, '04-desktop-project-preview.png') });
  console.log('Captured 04-desktop-project-preview.png');

  // Close preview via clicking outside (backdrop)
  await page.mouse.click(100, 100);
  await page.waitForTimeout(400);

  // 5. About Modal
  await page.click('#nav-tile-about');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outputDir, '05-desktop-about-modal.png') });
  console.log('Captured 05-desktop-about-modal.png');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  // 6. Playground Modal
  await page.click('#nav-tile-playground');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outputDir, '06-desktop-playground-modal.png') });
  console.log('Captured 06-desktop-playground-modal.png');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  // 7. Expanded Social Dock
  await page.click('button[aria-label="Open contact and social links"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outputDir, '07-desktop-expanded-social-dock.png') });
  console.log('Captured 07-desktop-expanded-social-dock.png');

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

  // 8. Mobile Initial Homepage
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(outputDir, '08-mobile-initial-homepage.png') });
  console.log('Captured 08-mobile-initial-homepage.png');

  // 9. Mobile Project Preview
  await mobilePage.goto('http://localhost:5173/?project=meter-flow', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(outputDir, '09-mobile-project-preview.png') });
  console.log('Captured 09-mobile-project-preview.png');

  // 10. Mobile Expanded Social Dock
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(400);
  await mobilePage.click('button[aria-label="Open contact and social links"]');
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: path.join(outputDir, '10-mobile-expanded-social-dock.png') });
  console.log('Captured 10-mobile-expanded-social-dock.png');

  await browser.close();

  console.log('\n--- QA Verification Results ---');
  console.log(`Console errors during session: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error(consoleErrors);
  }
}

run().catch((err) => {
  console.error('QA capture error:', err);
  process.exit(1);
});
