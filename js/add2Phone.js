const puppeteerExtra = require('puppeteer-extra');
const stealthPlugin  = require ('puppeteer-extra-plugin-stealth');
const puppeteer  = require ('puppeteer');
const dotenv  = require('dotenv');
const pe = process.env;
dotenv.config();

async function add2ph() {
puppeteerExtra.use(stealthPlugin());
const browser = await puppeteerExtra.launch({ headless: false });
const page = await browser.newPage();
try{
await page.goto('https://accounts.google.com/signin/v2/identifier');
await page.type('[type="email"]', pe.GMAIL);
await Promise.all([
    page.waitForNavigation(),
    page.click('#identifierNext'),
]);
}catch(err){
    console.log('email bad')
}
try{
await page.waitForSelector('#password', {visable:true})
await page.type('[type="password"', pe.PASS);
await Promise.all([
    page.waitForNavigation(),
    page.click('#passwordNext'),
]);
}catch(err){
    console.log(err)
}
await page.waitForTimeout(10000);
await page.screenshot({path: 'api.png'});
await browser.close()
}add2ph()

   
    

