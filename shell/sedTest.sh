#!/bin/bash

read -p 'First name: ' fName
read -p 'Last name: ' lName
read -p 'Phone number: ' phNum
read -p 'Email address: ' eMail
read -p 'Vehicle: ' stkNum
read -p 'Note: ' note
 sed -i 's/FIRST=.*$/FIRST='$fName'/' ./.env
 sed -i 's/LAST=.*$/LAST='$lName'/' ./.env
 sed -i 's/PHONE=.*$/PHONE='$phNum'/' ./.env
 sed -i 's/EMAIL=.*$/EMAIL='$eMail'/' ./.env
 sed -i 's/STOCK=.*$/STOCK='$stkNum'/' ./.env
 sed -i 's/;'$note'//' ./.env
node ./js/login.js
sed -i 's/^NOTE/;'$note'NOTE/' ./.env