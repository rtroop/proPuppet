#!/bin/bash
read -p 'First name: ' fName
read -p 'Last name: ' lName
read -p 'Phone number: ' phNum
read -p 'Email address: ' eMail
read -p 'Priorety level: ' pLevel
read -p 'Notes: ' vNotes
cat ./text/credentials.txt > ./.env
grep 'LOGIN_PAGE\|DASH\|CUSTOMER_ENTRY' ./notes >> ./.env
echo FIRST=$fName >> ./.env
echo LAST=$lName >> ./.env
echo PHONE=$phNum >> ./.env
echo EMAIL=$eMail >> ./.env
echo $fName $lName,$fName ,,$lName,,,,,,,,,,,,,,,,,,,,$pLevel,,$vNotes,,,JRS_PROSPECTS ::: ,,$eMail,Mobile,+1 $phNum | tee ./JRS_PROSPECT.csv >> ./JRS_PROSPECTS.csv
npm run start 