// const puppeteerExtra = require('puppeteer-extra');
// const stealthPlugin  = require ('puppeteer-extra-plugin-stealth');
const puppeteer  = require ('puppeteer');
const dotenv  = require('dotenv');
const fs = require('fs-extra');
const pe = process.env;
dotenv.config();

async function getVin() {
// puppeteerExtra.use(stealthPlugin());
const browser = await puppeteer.launch({ headless: false});
const page = await browser.newPage();
try{
    await page.goto(pe.WEBSITE);
    await page.waitForSelector('input.inventorysearch',{visible:true});
    await page.type('input.inventorysearch', pe.STOCK)
    await Promise.all([
        page.waitForNavigation({waitUntil: "domcontentloaded"}),
        page.click("button.btn-default"),
    ]);
}catch(err){
    console.log('vehicle not loaded')
}
try{
    const file = "./text/carfaxLink.txt";
    const vin = await page.$eval('span.vin', (el) => el.innerText);
    await page.waitForSelector('span.vin', {visable:true});
    fs.writeFileSync(file, pe.CARFAX+vin)
}catch(err){
    console.log(err)
}



// await page.screenshot({path: 'api.png'});
await browser.close()
}getVin()
