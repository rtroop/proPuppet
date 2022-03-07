#!/bin/bash

read -p 'Phone Number: ' phone
read -p 'Note: ' note
cat ~/proPuppet/text/credentials.txt > ./.env
grep 'LOGIN' ~/proPuppet/notes >> ./.env
grep 'RECALL' ~/proPuppet/notes >> ./.env
grep $note ~/proPuppet/text/Notes.txt | awk '{print $1}' >> ./.env
grep $phone ~/proPuppet/text/phoneNumbers.txt | awk '{print $1}' >> ./.env
node ~/proPuppet/js/notes.js
