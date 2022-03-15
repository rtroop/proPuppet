#!/bin/bash
unset asso
declare -A asso
file="C:\Users\rtroo\proPuppet\shell\config.cfg"
function assoFill()
{
while IFS="," read  key value
do 
    asso[$key]=$value 
done <$file
}
assoFill
function readArray(){
echo ${asso[PEOPLE_API]}
echo ${asso[REFRESH]}
}
readArray