#!/bin/bash
awk 'BEGIN { FS = "," } {if (NR!=1) {print $(NF)}}' JRS_PROSPECTS.csv | awk '{print $2}' > ./text/phoneNumbers.txt
File="./text/phoneNumbers.txt"
read -p "choose message: " textSMS
Lines=$(cat $File)
for Line in $Lines
do 
    sed -i 's/PHONE=.*$/PHONE='$Lines'/' ./.env
    grep $textSMS ./text/smsMessages.txt >> ./.env
    node ./js/recallCusty.js 
    date >> ./text/SMS.log
    echo $textSMS  "was sent successfully" >> ./text/SMS.log

done
echo "" > ./.env
echo "your messages were sent"