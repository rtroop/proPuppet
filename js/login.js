const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config();
const pe = process.env;
// const { google } = require("googleapis");
// const { authenticate } = require("@google-cloud/local-auth");
// const people = google.people("v1");

async function login() {
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
  const page2 = await browser.newPage();

  try{
      await page2.goto(pe.CUSTOMER_ENTRY, {waitUntil: "networkidle0"});

  }catch(err){
      console.log("dipshit")
  }
  try{
      await page2.type('#ez_fn', pe.FIRST,{delay:100});
      await page2.type('#ce_ln', pe.LAST,{delay:100});
      await page2.type('#ez_ph', pe.PHONE,{delay:100});
      await page2.type('#ez_em', pe.EMAIL,{delay:100});

  }catch(err){
      console.log("nice try FFR")
  }
  try{
      await Promise.all([
          page2.waitForNavigation({waitUntil:"domcontentloaded"}),
          page2.click('#check_duplicates'),
      ]);
 
    }catch(err){
    console.log("Idiot")
  }

  try {
    await page2.waitForSelector("#addanote", { visable: true });
    await page2.click("#addanote");
    await page2.waitForSelector("textarea#cnotes", { visable: true });
    await page2.click("textarea#cnotes");
    await page2.keyboard.type(pe.NOTE, { delay: 100 });
    await page2.click("div.PMMbutton.action_go.action_btn");
  } catch (err) {
    console.log("dip shit");
  }
  try {
    const CID = await page2.$eval("#aid", (el) => el.value);
    const CWS = pe.CWS + CID;
    await page2.goto(`${CWS}`);
    await page2.waitForSelector("#cw_desv_edit", { visable: true });
    await page2.click("#cw_desv_edit");
    await page2.waitForSelector('#cdvstk',{visable: true})
    await page2.click("#cdvstk")
    await page2.keyboard.type(pe.STOCK, { delay: 100 });
    await page2.click("#save_editdesv_cw");
  } catch (err) {
    console.log("wrong moron");
  }
  // try{
  //   await page.waitForTimeout(3000)
  //   Dash = await page2.evaluate(() => {
  //     const dash = [];
  //     const whip = document.querySelector(
  //       "div.cws_block.cws_desveh_block.mobileHide.mobilediv div:nth-child(4)"
  //     ).innerHTML;
  //     dash.push(whip)
  //     return dash
  //   })
  //   }catch(err){
  //     console.log("wrong thunder thighs");  
  //   }
  // async function addContact() {
  //   // Obtain user credentials to use for the request
  //   const auth = await authenticate({
  //     keyfilePath: path.join(__dirname, "./credentials.json"),
  //     scopes: ["https://www.googleapis.com/auth/contacts"],
  //   });
  //   google.options({ auth });

  //   const { data: newContact } = people.people.createContact({
  //     requestBody: {
  //       memberships: [
  //         {
  //           contactGroupMembership: {
  //             contactGroupResourceName: "contactGroups/25c7960c0f4c49e3",
  //           },
  //         },
  //       ],
  //       names: [
  //         {
  //           givenName: pe.FIRST,
  //           familyName: pe.LAST,
  //         },
  //       ],
  //       phoneNumbers: [
  //         {
  //           type: "Mobile",
  //           value: pe.PHONE,
  //         },
  //       ],
  //       emailAddresses: [
  //         {
  //           value: pe.EMAIL,
  //         },
  //       ],
  //       userDefined: [
  //         {
  //           key: "Vehicle",
  //           value: `${Dash[0]}`,
  //         },
  //         {
  //           key: "stock#",
  //           value: pe.STOCK,
  //         },
  //       ],
  //     },
  //   });
  //   console.log("\n\nCreated Contact:", newContact);
  // }

  // if (module === require.main) {
  //   addContact().catch(console.error);
  // } 
  await browser.close();
}
login();
