#!/bin/bash
#Bash script for updating contacts notes in Promax
#Renew protection by running every 72 hours 
# to do; Add more cases to enhance the legitamacy
File="/c/Users/rtroo/proPuppet/text/phoneNumbers.txt"
Lines=$(cat $File)
for line in $Lines
do
    log=$(date && echo $line)
    rNum=$(date | awk '{print $5}' | awk -F ":" '{print $3}')
   
    if ((01<=rNum && rNum<=12))
    then
        note=0 
    elif ((13<=rNum && rNum<=24))
    then
        note=1  
    elif ((25<=rNum && rNum<=36))
    then
        note=2
    elif ((37<=rNum && rNum<=48))
    then
        note=3 
    else
        note=4 
    fi 
    sed -i 's/;'$note'//' ./.env
    sed -i 's/PHONE=.*$/PHONE='$line'/' ./.env
    node ~/proPuppet/js/notes.js
    sed -i 's/^NOTE/;'$note'NOTE/' ./.env
done


echo "notes ran"
