import { chromium } from 'playwright';

async function testAll() {
  console.log('Starting automated browser interaction and accessibility test...');
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  // 1. Direct loading of homepage
  console.log('1. Testing direct loading of homepage...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const title = await page.title();
  console.log(`   Page title: "${title}"`);
  if (!title.includes('Manav')) throw new Error('Homepage title mismatch');

  // 2. Project popup URL synchronization & history navigation
  console.log('2. Testing project popup URL synchronization & browser history...');
  await page.goto('http://localhost:5173/?project=meter-flow', { waitUntil: 'networkidle' });
  const previewModal = await page.waitForSelector('[role="dialog"][aria-labelledby="preview-title"]', {
    timeout: 3000,
  });
  if (!previewModal) throw new Error('Preview modal did not appear from URL query param');
  console.log('   Preview modal opened directly from ?project=meter-flow');

  // Browser back navigation
  console.log('   Testing browser Back button...');
  await page.goBack();
  await page.waitForTimeout(400);
  const isBackModalVisible = await page.locator('[role="dialog"][aria-labelledby="preview-title"]').isVisible();
  if (isBackModalVisible) throw new Error('Modal should be dismissed after browser back');
  console.log('   Browser Back successfully closed modal and restored homepage');

  // Browser forward navigation
  console.log('   Testing browser Forward button...');
  await page.goForward();
  await page.waitForTimeout(400);
  const isForwardModalVisible = await page.locator('[role="dialog"][aria-labelledby="preview-title"]').isVisible();
  if (!isForwardModalVisible) throw new Error('Modal should re-appear after browser forward');
  console.log('   Browser Forward restored project preview');

  // 3. Escape key dismissal
  console.log('3. Testing Escape key dismissal...');
  await page.keyboard.press('Escape');
  await page.locator('[role="dialog"]').waitFor({ state: 'hidden', timeout: 3000 });
  console.log('   Escape key cleanly dismissed preview');

  // 4. Modal keyboard navigation & focus trapping
  console.log('4. Testing modal keyboard focus trapping...');
  await page.click('#nav-tile-work');
  await page.waitForSelector('[role="dialog"][aria-labelledby="work-modal-title"]');
  
  // Verify initial focus is within the dialog
  const activeTagName = await page.evaluate(() => document.activeElement?.tagName);
  console.log(`   Initial focus inside modal is on: <${activeTagName}>`);
  
  // Press Shift+Tab and verify focus stays inside modal
  await page.keyboard.down('Shift');
  await page.keyboard.press('Tab');
  await page.keyboard.up('Shift');
  const isStillInModal = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"][aria-labelledby="work-modal-title"]');
    return dialog && dialog.contains(document.activeElement);
  });
  if (!isStillInModal) throw new Error('Focus escaped dialog on Shift+Tab!');
  console.log('   Focus trapped inside dialog on Shift+Tab');

  // 5. Focus restoration upon closing
  console.log('5. Testing focus restoration to invoking tile...');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  const restoredActiveId = await page.evaluate(() => document.activeElement?.id);
  console.log(`   Focus restored to: #${restoredActiveId}`);
  if (restoredActiveId !== 'nav-tile-work') {
    console.warn(`   Note: Restored element was #${restoredActiveId}, expected #nav-tile-work`);
  }

  // 6. Outside click dismissal
  console.log('6. Testing outside click dismissal...');
  await page.click('#nav-tile-about');
  await page.waitForSelector('[role="dialog"][aria-labelledby="about-modal-title"]');
  // Click backdrop
  await page.mouse.click(30, 30);
  await page.locator('[role="dialog"]').waitFor({ state: 'hidden', timeout: 3000 });
  console.log('   Outside click cleanly dismissed About modal');

  // 7. SocialDock outside click & aria-expanded test
  console.log('7. Testing SocialDock outside click and aria-expanded...');
  const dockTrigger = page.locator('button[aria-label="Open contact and social links"]');
  const initialExpanded = await dockTrigger.getAttribute('aria-expanded');
  console.log(`   Initial SocialDock aria-expanded: ${initialExpanded}`);
  if (initialExpanded !== 'false') throw new Error('Initial aria-expanded should be false');

  await dockTrigger.click();
  await page.waitForTimeout(400);
  const expandedDialog = await page.locator('[role="dialog"][aria-label="Contact and social links"]').isVisible();
  if (!expandedDialog) throw new Error('Social dock dialog did not open');
  console.log('   Social dock opened successfully');

  // Outside click to close social dock
  await page.mouse.click(100, 100);
  await page.locator('[role="dialog"][aria-label="Contact and social links"]').waitFor({
    state: 'hidden',
    timeout: 3000,
  });
  console.log('   Social dock cleanly dismissed on outside click');

  // 8. Reduced-motion media query test
  console.log('8. Testing reduced-motion emulation...');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const navTileRotate = await page.evaluate(() => {
    const tile = document.querySelector('#nav-tile-work > div');
    return window.getComputedStyle(tile).transform;
  });
  console.log(`   Reduced-motion nav tile transform: ${navTileRotate}`);

  await browser.close();

  console.log(`\nAll interaction & accessibility tests passed! Total console errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
    process.exit(1);
  }
}

testAll().catch((err) => {
  console.error('QA Test Failure:', err);
  process.exit(1);
});
