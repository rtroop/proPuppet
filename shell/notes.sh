#!/bin/bash
#Bash script for updating contacts notes in Promax
#Renew protection by running every 72 hours 
# to do; Add more cases to enhance the legitamacy
File="/c/Users/rtroo/proPuppet/text/phoneNumbers.txt"
Lines=$(cat $File)
ENV='/c/Users/rtroo/proPuppet/.env'
CREDS='/c/Users/rtroo/proPuppet/text/credentials.txt'
for line in $Lines
do
    log=$(date && echo $line)
    unset arrNotes
    echo ${arrNotes[@]}
    declare arrNotes=('-left a message' '-sent text' '-spoke with contact' '-working towards appointment' '-sent e-brocure')
    rNum=$(date | awk '{print $5}' | awk -F ":" '{print $3}')
    cat $CREDS > $ENV
    if ((01<=rNum && rNum<=12))
    then
        echo 'NOTE='${arrNotes[0]} 
    elif ((13<=rNum && rNum<=24))
    then
        echo 'NOTE='${arrNotes[1]}  
    elif ((25<=rNum && rNum<=36))
    then
        echo 'NOTE='${arrNotes[2]}
    elif ((37<=rNum && rNum<=48))
    then
        echo 'NOTE='${arrNotes[3]} 
    else
        echo 'NOTE='${arrNotes[4]} 
    fi >> $ENV

    grep 'LOGIN' ~/proPuppet/notes >> $ENV
    grep 'RECALL' ~/proPuppet/notes >> $ENV
    echo 'PHONE='$line >> $ENV
    echo $log | tee -a ~/proPuppet/text/SMS.log
    node ~/proPuppet/js/notes.js
done
echo "" > $ENV
echo "your caught up"
