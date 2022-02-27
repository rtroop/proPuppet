const puppeteer = require('puppeteer');
const fs = require('fs/promises')
require('dotenv').config();
const pe = process.env;

async function start () {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    try{
        await page.goto(pe.LOGIN_PAGE, { waitUntil: "networkidle0" });
        await page.type('input#PMXD_Input',pe.DEALER, { delay: 100});
        await page.type('input#PMXU_Input',pe.USER, { delay: 100});
        await page.type('input#PMXP_Input',pe.PASS, { delay: 100});
    }catch(err){
        console.log("Your a loser")

    }
    
    try{
        await Promise.all([
            page.waitForNavigation(),
            page.click('a.pmm_login_button'),
        ]);
    }catch(err){
        console.log("Almost fatty")
    }
    page.waitForTimeout(1000);
    await page.screenshot({path: 'api.png', fullPage: true});
    
        await browser.close();
}start()
