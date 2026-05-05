const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/de/menu/print', { waitUntil: 'networkidle0' });

    const overflowData = await page.evaluate(() => {
      const pages = Array.from(document.querySelectorAll('.page-content'));
      return pages.map((page, index) => {
        return {
          pageNumber: index + 1,
          scrollHeight: page.scrollHeight,
          clientHeight: page.clientHeight,
          overflow: page.scrollHeight - page.clientHeight
        };
      }).filter(p => p.overflow > 0);
    });

    console.log(JSON.stringify(overflowData, null, 2));
    await browser.close();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
