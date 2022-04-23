const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config();
const { google } = require("googleapis");
const { authenticate } = require("@google-cloud/local-auth");
const people = google.people("v1");
const pe = process.env;

async function login() {
  const browser = await puppeteer.launch({ headless: true });
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

  try {
    await page.goto(pe.CWS, { waitUntil: "networkidle0" });
  } catch (err) {
    console.log("dipshit");
  }
  // try {
  //   await page.type("input#search_phone", pe.PHONE, { delay: 100 });
  //   page.click("input#recallsearch");
  //   await page.waitForSelector("div.cw_link", { visable: true });
  //   await Promise.all([page.waitForNavigation(), page.click("div.cw_link")]);
  // } catch (err) {
  //   console.log("nice try FFR");
  // }
  try {
    Dash = await page.evaluate(() => {
      const dash = [];
      const whip = document.querySelector(
        "div.cws_block.cws_desveh_block.mobileHide.mobilediv div:nth-child(4)"
      ).innerHTML;
      const email = document.querySelector("#aeml").value;
      const stkNum = document
        .querySelector(
          "div.cws_block.cws_desveh_block.mobileHide.mobilediv > div:nth-child(3)"
        )
        .textContent.split("")
        .slice(8, 14)
        .join("");
      const vin = document
        .querySelector(
          "div.cws_block.cws_desveh_block.mobileHide.mobilediv > div:nth-child(3)"
        )
        .innerText.split(":")[2];
      dash.push(whip, email, stkNum, vin);
      return dash;
    });
  } catch (err) {
    console.log(err);
  }
  try {
    const CID = await page.$eval("#aid", (el) => el.value);
    const loanApp = pe.CRAP + CID;
    await page.goto(`${loanApp}`);
    inputVals = await page.evaluate(() => {
      fields = document.querySelectorAll("input");
      valArr = [];
      for (i = 0; i < fields.length; i++) {
        valArr[i] = {
          key: fields[i].getAttribute("id"),
          value: fields[i].value,
        };
      }
      return valArr;
    });
    // console.log(inputVals[15])
  } catch (err) {
    console.log(err);
  }
  async function addContact() {
    // Obtain user credentials to use for the request
    const auth = await authenticate({
      keyfilePath: path.join(__dirname, "./credentials.json"),
      scopes: ["https://www.googleapis.com/auth/contacts"],
    });
    google.options({ auth });

    const { data: newContact } = people.people.createContact({
      requestBody: {
        memberships: [
          {
            contactGroupMembership: {
              contactGroupResourceName: "contactGroups/25c7960c0f4c49e3",
            },
          },
        ],
        names: [
          {
            givenName: `${inputVals[3].value}`,
            familyName: `${inputVals[5].value}`,
          },
        ],
        phoneNumbers: [
          {
            type: "Mobile",
            value: `${inputVals[13].value}`,
          },
        ],
        emailAddresses: [
          {
            value: `${Dash[1]}`,
          },
        ],
        externalIds: [
          {
            type: "CID",
            value: `${inputVals[15].value}`,
          },
        ],
        urls: [
          {
            type: "carfaxLink",
            value: `https://www.carfax.com/VehicleHistory/p/Report.cfx?partner=DVW_1&vin=${Dash[3]}`,
          },
        ],
        userDefined: [
          {
            key: "Vehicle",
            value: `${Dash[0]}`,
          },
          {
            key: "stock#",
            value: `${Dash[2]}`,
          },
        ],
      },
    });
    console.log("\n\nCreated Contact:", newContact);
  }

  if (module === require.main) {
    addContact().catch(console.error);
  }
  // }catch(err){
  //   console.log(err)
  // }

   filterBy = {
    key: ["appfname", "applname", "appcp", "appeml", "appcustid"],
  };
   filtered = inputVals.filter((o) =>
    Object.keys(filterBy).every((k) => filterBy[k].some((f) => o[k] === f))
  );

    fs.appendFile(
      "text/person.json",
      JSON.stringify(filtered, null, 3),
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Saved Successfully!");
        }
      }
    );

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
}
login();
