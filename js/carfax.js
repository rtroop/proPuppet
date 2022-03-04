const puppeteerExtra = require('puppeteer-extra');
const stealthPlugin  = require ('puppeteer-extra-plugin-stealth');
const puppeteer  = require ('puppeteer');
const dotenv  = require('dotenv');
const pe = process.env;
dotenv.config();

async function getVin() {
puppeteerExtra.use(stealthPlugin());
const browser = await puppeteerExtra.launch({ headless: true });
const page = await browser.newPage();
await page.waitForTimeout(20000)
await page.goto('https://www.carfax.com/VehicleHistory/p/Report.cfx?partner=DVW_1&vin=JH4CU2F48EC001683')
await page.screenshot({path: 'api.png'});
await browser.close()
}getVin()
