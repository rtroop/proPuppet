const puppeteer  = require ('puppeteer');
const dotenv  = require('dotenv');
const fs = require('fs-extra');
const pe = process.env;
dotenv.config();


async function getVin() {
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    try{
        await page.goto(pe.WEBSITE);
        await page.waitForSelector('input.inventorysearch',{visible:true});
        await page.type('input.inventorysearch', pe.STOCK)
        await Promise.all([
              page.waitForNavigation(),
              page.keyboard.press('Enter'),
        ]);
    }catch(err){
        console.log('vehicle not loaded')
    }

    try{
        
          const vin = page.$eval('span.vin', (el) => el.innerText);
          await page.waitForTimeout(3000)

          await Promise.all([
              page.waitForNavigation(),
              page.goto(pe.CARFAX+vin),
            ])
          await page.waitForTimeout(30000)
       
        
        }catch(err){
          console.log("wrong thunder thighs");  
        }

   
        

    await browser.close()
}getVin()
//     async function showVin() {
//         const browser = await puppeteer.launch({ headless: false});
//         const page2 = await browser.newPage();
//         try{
//             await page2.goto(pe.CARFAX+VIN[0]);
//             await page2.waitForTimeout(30000)
                        
//         }catch(err){
//             console.log('your stupid')
//         }
//     await browser.close()
// }showVin()