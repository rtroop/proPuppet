#!/bin/bash
read -p 'Stock Number: ' stkNum 
echo "Stand by for link..."
if grep -q $stkNum ~/proPuppet/text/carfaxLinks.txt
then
clear
grep $stkNum ~/proPuppet/text/carfaxLinks.txt | awk '{print $2}'
else

 sed -i 's/STOCK=.*$/STOCK='$stkNum'/' ../.env
node ~/proPuppet/js/getVin.js
echo -e ' \n' >> ~/proPuppet/text/carfaxLinks.txt
echo "$stkNum"|tr '\n' ' ' >> ~/proPuppet/text/carfaxLinks.txt
# clear
cat ~/proPuppet/text/carfaxLInk.txt | tee -a ~/proPuppet/text/carfaxLinks.txt
fi