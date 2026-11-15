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
  console.log('=== Starting Phase 6 (About, Playground, Contact) Browser QA ===');
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
    permissions: ['clipboard-read', 'clipboard-write'],
  });

  const desktopPage = await desktopContext.newPage();
  desktopPage.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Desktop Console Error] ${msg.text()}`);
    }
  });

  // A. Homepage -> About Modal -> Read Full Story -> /about
  console.log('Testing flow: Homepage -> About Modal -> /about...');
  await desktopPage.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await desktopPage.click('#nav-tile-about');
  await desktopPage.waitForSelector('text=Read Full Story', { timeout: 3000 });
  await desktopPage.click('text=Read Full Story');
  await desktopPage.waitForURL('**/about', { timeout: 3000 });
  console.log('Navigated to /about successfully!');

  // Capture Desktop About
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({
    path: path.join(outputDir, 'phase6-desktop-about.png'),
  });
  console.log('Captured phase6-desktop-about.png');

  // Direct refresh on /about
  await desktopPage.reload({ waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(400);

  // Check overflow on About
  const aboutOverflow = await desktopPage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`Desktop /about Overflow Check: ${aboutOverflow ? 'FAIL' : 'PASS'}`);
  if (aboutOverflow) consoleErrors.push('Horizontal overflow detected on /about');

  // B. Navigate from About -> Playground
  console.log('Testing navigation: /about -> /playground...');
  await desktopPage.click('text=The Playground');
  await desktopPage.waitForURL('**/playground', { timeout: 3000 });
  console.log('Navigated to /playground successfully!');

  // Test Spring Physics interactive release button
  await desktopPage.click('text=Release Spring');
  await desktopPage.waitForTimeout(300);

  // Test Audio clicks buttons
  await desktopPage.click('text=Blue Click');
  await desktopPage.waitForTimeout(200);

  // Capture Desktop Playground
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({
    path: path.join(outputDir, 'phase6-desktop-playground.png'),
  });
  console.log('Captured phase6-desktop-playground.png');

  // Direct refresh on /playground
  await desktopPage.reload({ waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(400);

  // Check overflow on Playground
  const playgroundOverflow = await desktopPage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`Desktop /playground Overflow Check: ${playgroundOverflow ? 'FAIL' : 'PASS'}`);
  if (playgroundOverflow) consoleErrors.push('Horizontal overflow detected on /playground');

  // C. Navigate from Playground -> Contact
  console.log('Testing navigation: /playground -> /contact...');
  await desktopPage.click('text=Say Hello');
  await desktopPage.waitForURL('**/contact', { timeout: 3000 });
  console.log('Navigated to /contact successfully!');

  // Test Copy Email button interaction
  console.log('Testing email copy interaction...');
  await desktopPage.click('button:has-text("Copy Address")');
  await desktopPage.waitForSelector('text=Copied! 📋', { timeout: 2000 });
  console.log('Verified "Copied! 📋" feedback appears on click!');

  // Capture Desktop Contact
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({
    path: path.join(outputDir, 'phase6-desktop-contact.png'),
  });
  console.log('Captured phase6-desktop-contact.png');

  // Direct refresh on /contact
  await desktopPage.reload({ waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(400);

  // Check overflow on Contact
  const contactOverflow = await desktopPage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`Desktop /contact Overflow Check: ${contactOverflow ? 'FAIL' : 'PASS'}`);
  if (contactOverflow) consoleErrors.push('Horizontal overflow detected on /contact');

  // Test browser back & forward
  console.log('Testing browser Back & Forward across new routes...');
  await desktopPage.goBack();
  await desktopPage.waitForURL('**/playground', { timeout: 3000 });
  await desktopPage.goForward();
  await desktopPage.waitForURL('**/contact', { timeout: 3000 });
  console.log('Browser history traversal verified!');

  // ==========================================
  // 2. MOBILE SUITE (390 x 844)
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

  // Mobile /about
  console.log('Testing /about on Mobile...');
  await mobilePage.goto('http://localhost:5173/about', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({
    path: path.join(outputDir, 'phase6-mobile-about.png'),
  });
  console.log('Captured phase6-mobile-about.png');

  const mobileAboutOverflow = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`Mobile /about Overflow: ${mobileAboutOverflow ? 'FAIL' : 'PASS'}`);
  if (mobileAboutOverflow) consoleErrors.push('Mobile horizontal overflow detected on /about');

  // Mobile /playground
  console.log('Testing /playground on Mobile...');
  await mobilePage.goto('http://localhost:5173/playground', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({
    path: path.join(outputDir, 'phase6-mobile-playground.png'),
  });
  console.log('Captured phase6-mobile-playground.png');

  const mobilePlaygroundOverflow = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`Mobile /playground Overflow: ${mobilePlaygroundOverflow ? 'FAIL' : 'PASS'}`);
  if (mobilePlaygroundOverflow) consoleErrors.push('Mobile horizontal overflow detected on /playground');

  // Mobile /contact
  console.log('Testing /contact on Mobile...');
  await mobilePage.goto('http://localhost:5173/contact', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({
    path: path.join(outputDir, 'phase6-mobile-contact.png'),
  });
  console.log('Captured phase6-mobile-contact.png');

  const mobileContactOverflow = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`Mobile /contact Overflow: ${mobileContactOverflow ? 'FAIL' : 'PASS'}`);
  if (mobileContactOverflow) consoleErrors.push('Mobile horizontal overflow detected on /contact');

  await browser.close();

  console.log('\n==========================================');
  console.log(`Phase 6 QA Completed!`);
  console.log(`Total Console / Functional Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error(consoleErrors);
    process.exit(1);
  } else {
    console.log('ALL PHASE 6 TESTS & QUALITY CRITERIA PASSED!');
  }
}

run().catch((err) => {
  console.error('Phase 6 QA Test execution failed:', err);
  process.exit(1);
});
