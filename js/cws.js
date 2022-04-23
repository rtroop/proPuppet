const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config();
const pe = process.env;

async function mycws() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  try {
    await page.goto(pe.LOGIN_PAGE, { waitUntil: "networkidle0" });
    await page.type("input#PMXD_Input", pe.DEALER);
    await page.type("input#PMXU_Input", pe.USER);
    await page.type("input#PMXP_Input", pe.PASS);
  } catch (err) {
    console.log("Your a loser");
  }

  try {
    await Promise.all([
      page.waitForNavigation(),
      page.click("a.pmm_login_button"),
    ]);
  } catch (err) {
    console.log("Almost fatty");
  }
  const wsLink = pe.CWS + pe.CID;
  try {
    await page.goto(wsLink, { waitUntil: "networkidle0" });
    console.log(wsLink);
  } catch (err) {
    console.log("dipshit");
  }
  try {
    await page.waitForSelector("div#sendatext", { visable: true });
    page.waitForTimeout(2000);
    page.click("div#sendatext");
    await page.waitForSelector("textarea#smsmsg", { visable: true });
    await page.type("textarea#smsmsg", pe.SMS);
    //    await page.screenshot({path: 'api.png'});
    await Promise.all([
      page.waitForNavigation(),
      page.click("div.PMMbutton.action_go.action_btn"),
    ]);
  } catch (err) {
    console.log("so close fatty");
  }

  //   await page.screenshot({path: 'api.png'});
  //   await browser.close()
}
mycws();
