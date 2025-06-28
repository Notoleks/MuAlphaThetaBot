import puppeteer from 'puppeteer';

(async () => {

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://famat.org/results/static/reports/Full_Precalculus_Indv_Cypress%20Bay%20Regional%20March%202025.html');

  await page.setViewport({width: 1080, height: 1024});

  await page.type('tr', 'Coral Springs Charter');

  await page.waitForSelector('tr');

  const textSelector = await page.waitForSelector(
    'text/Coral Springs Charter',
  );

  const competition = await textSelector?.evaluate(el => el.textContent);

  console.log(competition);

  await browser.close();
})();