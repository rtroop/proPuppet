#!/bin/bash
read -p 'Stock Number: ' Stk 
echo "Stand by for link..."
if grep -q $Stk ~/proPuppet/text/carfaxLinks.txt
then
clear
grep $Stk ~/proPuppet/text/carfaxLinks.txt | awk '{print $2}'
else
grep "WEB" ~/proPuppet/notes > .env
echo "STKNUM=" $Stk >> .env
grep "CARFAX" ~/proPuppet/notes >> .env
node ~/proPuppet/js/getVin.js
echo -e ' \n' >> ~/proPuppet/text/carfaxLinks.txt
echo "$Stk"|tr '\n' ' ' >> ~/proPuppet/text/carfaxLinks.txt
clear
cat ~/proPuppet/text/carfaxLInk.txt | tee -a ~/proPuppet/text/carfaxLinks.txt
fi