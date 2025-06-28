import puppeteer from 'puppeteer';

(async () => {

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://famat.org/results/static/reports/Full_Precalculus_Indv_Cypress%20Bay%20Regional%20March%202025.html');

  await page.setViewport({width: 1080, height: 1024});

  await page.type('td', 'Coral Springs Charter');

  await page.waitForSelector('td');

  const textSelector = await page.waitForSelector(
    'text/Coral Springs Charter',
  );

  // const results = await textSelector?.evaluate(el => el.textContent);

  const results = await textSelector?.evaluate(() => {
  return Array.from(document.querySelectorAll('td')).map(el => el.textContent);
  });

  const sorted = [];

  for (let i = 0; i < results.length; i++){
    if (results[i].includes('Coral Springs Charter')){
      console.log(results[i]);
      sorted.push(results[i]);
    }
  }

  console.log(sorted);

  await browser.close();
})();