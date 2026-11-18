const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

// Try to find Chrome/Chromium
const chromePaths = [
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/snap/bin/chromium',
    process.env.CHROME_BIN
].filter(Boolean);

async function takeScreenshot() {
    let chromePath = null;
    
    for (const p of chromePaths) {
        if (fs.existsSync(p)) {
            chromePath = p;
            break;
        }
    }

    if (!chromePath) {
        console.error('Chrome/Chromium not found. Please install Chrome or Chromium.');
        process.exit(1);
    }

    console.log(`Using Chrome at: ${chromePath}`);

    const browser = await puppeteer.launch({
        executablePath: chromePath,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    
    const htmlPath = path.join(__dirname, 'calculator.html');
    await page.goto(`file://${htmlPath}`);
    
    // Wait for page to load
    await page.waitForTimeout(1000);
    
    // Take screenshot
    await page.screenshot({ path: 'calculator-screenshot.png', fullPage: false });
    console.log('Screenshot saved as calculator-screenshot.png');

    await browser.close();
}

takeScreenshot().catch(err => {
    console.error('Error taking screenshot:', err);
    process.exit(1);
});
