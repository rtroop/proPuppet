// elImport.js
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config();
const pe = process.env;
async function elImport() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('C:/Users/rtroo/proPuppet/text/phoneNumbers.html', { waitUntil: "networkidle0" });
    await page.screenshot({path: 'numbers.png' ,type: 'png'.png, fullPage: true})
    await browser.close();
}elImport() 









// const example = await page.evaluate( () =>
// {
//     const page = document.createElement( 'html' );
//     const page_content = document.body.textContent;

//     page.innerHTML = page_content;

//     const all_elements = Array.from( page.querySelectorAll( '*' ) );

//     return {
//         'valueA' : all_elements.filter( e => e.tagName.endsWith( 'VALUEA' ) ).map( e => e.textContent ),
//         'valueB' : all_elements.filter( e => e.tagName.endsWith( 'VALUEB' ) ).map( e => e.textContent ),
//         'valueC' : all_elements.filter( e => e.tagName.endsWith( 'VALUEC' ) ).map( e => e.textContent ),
//         'valueD' : all_elements.filter( e => e.tagName.endsWith( 'VALUED' ) ).map( e => e.textContent )
//     };
// });