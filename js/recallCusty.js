const puppeteer = require('puppeteer');
const fs = require('fs/promises')
require('dotenv').config();
const pe = process.env;

async function login () {
    const browser = await puppeteer.launch({headless:true});
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
        await page.goto(pe.RECALL, {waitUntil: "networkidle0"});

    }catch(err){
        console.log("dipshit")
    }
    try{
        await page.type('input#search_phone', pe.PHONE, {delay:100});
              page.click('input#recallsearch') 
        await page.waitForSelector('div.cw_link',{visable: true})      
        await Promise.all([
              page.waitForNavigation(),
              page.click('div.cw_link'),
        ]);
        
    }catch(err){
        console.log("nice try FFR")
    }
    try{
       await page.waitForSelector('div#sendatext',{visable: true}) 
             page.click('div#sendatext')
       await page.waitForSelector('textarea#smsmsg',{visable: true})   
       await page.type('textarea#smsmsg', pe.SMS);
             page.waitForTimeout(1000);
    //    await page.screenshot({path: 'api.png'});
       await Promise.all([
             page.waitForNavigation(),
             page.click('div.PMMbutton.action_go.action_btn')
  ]);   
    }catch(err){
        console.log("so close fatty")
    }
    

    await browser.close();
}login()
