#!/bin/bash
read -p 'First name: ' fName
read -p 'Last name: ' lName
read -p 'Phone number: ' phNum
read -p 'Email address: ' eMail
read -p 'Vehicle: ' VOI
read -p 'Lead Source: ' upSrc
read -p 'Profile: ' bureau
read -p 'Status: ' sitRep
read -p 'Notes: ' notes
cat ./text/credentials.txt > ./.env
grep 'LOGIN_PAGE\|DASH\|CUSTOMER_ENTRY' ./notes >> ./.env
echo FIRST=$fName >> ./.env
echo LAST=$lName >> ./.env
echo PHONE=$phNum >> ./.env
echo EMAIL=$eMail >> ./.env
JSON_FMT='{"memberships":[{"contactGroupMembership":{"contactGroupResourceName":"contactGroups/25c7960c0f4c49e3"}}],"names":[{"givenName":"%s","familyName":"%s"}],"phoneNumbers":[{"type":"mobile","value":"%s"}],"emailAddresses":[{"value":"%s"}],"userDefined":[{"key":"Vehicle","value":"%s"},{"key":"LeadSource","value":"%s"},{"key":"Beacon","value":"%s"},{"key":"Status","value":"%s"}]}' \
JSON_STING=$(printf "$JSON_FMT" "$fName" "$lName" "$phNum" "$eMail" "$VOI" "$upSrc" "$bureau" "$sitRep")

curl --request POST \
  'https://people.googleapis.com/v1/people:createContact?key=AIzaSyDmKpuCG2h2zV47kwkcZlq98_ua9vAMyJg' \
  --header 'Authorization: Bearer ya29.A0ARrdaM-UxLnK0SyHPRrSJkIf7gdnB6LKc15cXWmjTwpSRAhAHvKWjPqrK_CsKohtrsoVP4dv_62ERMyeTsknL0Mi0LqRy4FLNGwidJX9wXDmfyxKEvyIjRGjDSW4YQffgQvq5PX2wmOUzI5MSqDndAm_q_3vKg' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data   "${JSON_STING}" \
  --compressed
npm run start 