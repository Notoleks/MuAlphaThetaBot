import puppeteer from 'puppeteer';

(async () => {

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  let divNum = 1;
  

  // await page.goto('https://famat.org/results/static/reports/Full_Precalculus_Indv_Cypress%20Bay%20Regional%20March%202025.html');
  await page.goto('https://famat.org/results/');

  await page.setViewport({width: 1080, height: 1024});


  await page.waitForSelector('text/Cypress Bay', { visible: true });
  const competitionSelector = 'text/Cypress Bay';
  await page.waitForSelector(competitionSelector);
  await page.click(competitionSelector);
  const schoolName = 'Coral Springs Charter'

  for (let i = 0; i < 12; i++){
    divNum += 1;
    await page.goto('https://famat.org/results/2025-March-Regional-at-Cypress-Bay/');
    const categorySelector = `::-p-xpath(//*[@id="results-container"]/div[${divNum}]/div/a[1])`;
    await page.waitForSelector(categorySelector, { visible: true });
    await page.click(categorySelector);
    console.log(categorySelector);

    await page.waitForSelector('tr');


    const csc = await page.$$eval(`text/${schoolName}`, elements => elements);
    if (csc.length > 0){
      await page.type('tr', schoolName);
      const textSelector = await page.waitForSelector(
        `text/${schoolName}`,   
      );


      const results = await textSelector?.evaluate(() => {
        return Array.from(document.querySelectorAll('tr')).map(el => el.textContent);
      });
      
      // console.log('results: ',results);

      const sorted = [];


      for (let i = 0; i < results.length; i++){
        if (results[i].includes(schoolName)){
          sorted.push(results[i]);
        }
        else {
          continue;
        }
      }

      const newSorted = sorted.map(str => {
        return str.replaceAll('\n', '')
      });
      console.log(newSorted);
    }
    else {
      console.log('breaking after new');
      
    }
  }
  
  await browser.close();
})();

