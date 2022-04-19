// elImport.js
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config();
const pe = process.env;

async function elImport() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("C:/Users/rtroo/proPuppet/text/phoneNumbers.html");
  try {
    numbers = await page.evaluate(() => {
      phNums = document.querySelectorAll("p");
      valArr = [];
      for (var i = 0; i < phNums.length; i++) {
        valArr[i] = {
          key: i,
          value: phNums[i].innerText,
        };
      }
      return valArr;
    });
  } catch (err) {
    console.log(err);
  }
  // console.log(numbers[7].value);

  await browser.close();
}
elImport();

async function login() {
  const browser = await puppeteer.launch({ headless: false });
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
    await page.goto(pe.RECALL);

}catch(err){
    console.log("dipshit")
}
try{
    await page.type('input#search_phone', numbers[64].value, {delay:100});
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


    page.waitForSelector("span#cws_info_cid", { visible: true });
    await page.screenshot({ path: "cid.png" });
    const CID = await page.$eval("span#cws_info_cid", (el) => el.innerHTML);
    fs.appendFile("text/CID.txt", CID + numbers[64].value + "\n")
    console.log(CID, numbers[64].value);
  } catch (err) {
    console.log(err);
  }

  await browser.close();
}
login();

//     async function recall(){

//         try{
//     }catch(err){
//         console.log(err)
//     }

