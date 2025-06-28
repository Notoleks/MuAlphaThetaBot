import puppeteer from 'puppeteer';

(async () => {

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://famat.org/results/');

  await page.setViewport({width: 1080, height: 1024});

  await page.type('h3', 'Regional');

  await page.waitForSelector('h3');

  const textSelector = await page.waitForSelector(
    'text/Regional',
  );
  
  const competition = await textSelector?.evaluate(el => el.textContent);

  console.log(competition);

  await browser.close();
})();