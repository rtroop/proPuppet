const puppeteer = require('puppeteer');
const fs = require('fs/promises')
require('dotenv').config();
const pe = process.env;

async function login () {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    try{
        await page.goto(pe.LOGIN_PAGE, { waitUntil: "networkidle0" });
        await page.type('input#PMXD_Input',pe.DEALER);
        await page.type('input#PMXU_Input',pe.USER);
        await page.type('input#PMXP_Input',pe.PASS);
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

    try{
        await page.goto(pe.CUSTOMER_ENTRY, {waitUntil: "networkidle0"});

    }catch(err){
        console.log("dipshit")
    }
    try{
        await page.type('#ez_fn', pe.FIRST,{delay:100});
        await page.type('#ce_ln', pe.LAST,{delay:100});
        await page.type('#ez_ph', pe.PHONE,{delay:100});
        await page.type('#ez_em', pe.EMAIL,{delay:100});
        
    }catch(err){
        console.log("nice try FFR")
    }
    try{
        await Promise.all([
            page.waitForNavigation(),
            page.click('#check_duplicates'),
        ]);
    }catch(err){
        if('#new_customer'){
            await Promise.all([
                page.waitForNavigation(),
                page.click('#new_customer'),
            ]);
        }else{
        console.log("Idiot")
        }
    }

    // page.waitForTimeout(1000);
    // await page.screenshot({path: 'api.png', fullPage: true});
    await browser.close();
}login()
