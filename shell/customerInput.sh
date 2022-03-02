#!/bin/bash
read -p 'First name: ' fName
read -p 'Last name: ' lName
read -p 'Phone number: ' phNum
read -p 'Email address: ' eMail
read -p 'Notes: ' vNotes
cat ./text/credentials.txt > ./.env
echo FIRST=$fName >> ./.env
echo LAST=$lName >> ./.env
echo PHONE=$phNum >> ./.env
echo EMAIL=$eMail >> ./.env
echo $fName $lName,$fName ,,$lName,,,,,,,,,,,,,,,,,,,,$prioretyLevel,,$vNotes,,,JRS_PROSPECTS ::: ,,$eMail,Mobile,+1 $phNum >> ./JRS_PROSPECTS.csv
npm run start 