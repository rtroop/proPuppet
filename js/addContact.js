"use strict";

const path = require("path");
const fs = require("fs/promises");
const { google } = require("googleapis");
const { authenticate } = require("@google-cloud/local-auth");
const people = google.people("v1");
require("dotenv").config();
const pe = process.env;
const fname = pe.FIRST;
const lname = pe.LAST;
const phone = pe.PHONE;
const email = pe.EMAIL;
const vehicle = pe.VEHICLE;
const CID = pe.CID;
const stkNum = pe.STOCK;


async function addContact() {
  // Obtain user credentials to use for the request
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "./credentials.json"),
    scopes: ["https://www.googleapis.com/auth/contacts"],
  });
  google.options({ auth });

  const { data: newContact } =  people.people.createContact({
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
          givenName: `${fname}`,
          familyName: `${lname}`,
        },
      ],
      phoneNumbers: [
        {
          type: "Mobile",
          value: `${phone}`,
        },
      ],
      emailAddresses: [
        {
          value: `${email}`,
        },
      ],

      userDefined: [
        {
          key: "Vehicle",
          value: `${vehicle}`,
        },

        {
          key: "appcustid",
          value: `${CID}`,
        },
        {
          key: "stock#",
          value: `${stkNum}`,
        },
      
      ],
    },
  });
  console.log("\n\nCreated Contact:", newContact);
}

if (module === require.main) {
  addContact().catch(console.error);
}
module.exports = addContact;




// const {google} = require('googleapis');
// const people = google.people('v1');

// async function main() {
//   const auth = new google.auth.GoogleAuth({
    // Scopes can be specified either as an array or as a single, space-delimited string.
  //   scopes: ['https://www.googleapis.com/auth/contacts'],
  // });

  // Acquire an auth client, and bind it to all future calls
  // const authClient = await auth.getClient();
  // google.options({auth: authClient});

  // Do the magic
  // const res = await people.people.createContact({
    // Required. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. Defaults to all fields if not set. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined
    // personFields: 'placeholder-value',
    // Optional. A mask of what source types to return. Defaults to READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set.
    // sources: 'placeholder-value',

    // Request body metadata
    // requestBody: {
      // request body parameters
      // {
      //   "addresses": [],
      //   "ageRange": "my_ageRange",
      //   "ageRanges": [],
      //   "biographies": [],
      //   "birthdays": [],
      //   "braggingRights": [],
      //   "calendarUrls": [],
      //   "clientData": [],
      //   "coverPhotos": [],
      //   "emailAddresses": [],
      //   "etag": "my_etag",
      //   "events": [],
      //   "externalIds": [],
      //   "fileAses": [],
      //   "genders": [],
      //   "imClients": [],
      //   "interests": [],
      //   "locales": [],
      //   "locations": [],
      //   "memberships": [],
      //   "metadata": {},
      //   "miscKeywords": [],
      //   "names": [],
      //   "nicknames": [],
      //   "occupations": [],
      //   "organizations": [],
      //   "phoneNumbers": [],
      //   "photos": [],
      //   "relations": [],
      //   "relationshipInterests": [],
      //   "relationshipStatuses": [],
      //   "residences": [],
      //   "resourceName": "my_resourceName",
      //   "sipAddresses": [],
      //   "skills": [],
      //   "taglines": [],
      //   "urls": [],
      //   "userDefined": []
      // }
  //   },
  // });