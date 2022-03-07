const puppeteer = require('puppeteer');
const fs = require('fs')
require('dotenv').config();
const pe = process.env;

async function note () {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(pe.LOGIN_PAGE, { waitUntil: "networkidle0" });
    fs.readFile('text/Notes.txt', 'UTF-8', function(err, data) {
        if(err) throw err;
    
        const arr = data.toString();
    
        for(let i of arr) {
            console.log(i);
        }
    });
    
    // await browser.close();
}note()