import puppeteer from 'puppeteer';

//'https://famat.org/results/2025-March-Regional-at-Cypress-Bay/'
function getUserInput(prompt) {
    return new Promise((resolve) => {
        process.stdout.write(prompt); // Show the prompt to the user

        process.stdin.on('data', (data) => {
            const input = data.toString().trim(); // Convert input to a string and remove extra spaces
            resolve(input); // Store the input in the promise
            // process.stdin.pause(); // Stop listening for more input
        });
    });
}

(async () => {  

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  let divNum = 1;

  // await process.stdout.write('Please enter comp link');

  // var textInput = process.stdin.on('data', (data) => {
  //   const compLink = data.toString().trim();
  //   return compLink
  
  // });
  // console.log(textInput);

  const compLink = await getUserInput('Enter comp results link ');
  // const schoolName = 'Coral Springs Charter';
  const schoolName = await getUserInput('Enter school name ');

  // await page.goto('https://famat.org/results/static/reports/Full_Precalculus_Indv_Cypress%20Bay%20Regional%20March%202025.html');
  await page.goto('https://famat.org/results/');

  await page.setViewport({width: 1080, height: 1024});


  // await page.waitForSelector('text/Cypress Bay', { visible: true });
  // const competitionSelector = 'text/Cypress Bay';
  // await page.waitForSelector(competitionSelector);
  // await page.click(competitionSelector);

//*[@id="results-container"]/div[2]/h4
//*[@id="results-container"]/div[3]/h4
// /html/body/div[1]/div[2]/h4
  for (let i = 0; i < 12; i++){
    divNum += 1;
    await page.goto(compLink);
    await page.waitForSelector('h4');
    //todo
    // const competition = await.
    // const categorySelector = `::-p-xpath(//*[@id="results-container"]/div[${divNum}]/h4)`
    const resultLink = `::-p-xpath(//*[@id="results-container"]/div[${divNum}]/div/a[1])`;
    await page.waitForSelector(resultLink, { visible: true });
    await page.click(resultLink);

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
