#!/usr/bin/env bash

DIR=/home/huzla/fullstack-course/round

# Get the round and number of exercises.
echo Please give the round index and number of exercises

read round exercises

echo Okay round$round should have $exercises exercises.

CURRENT_DIR=$DIR$round
FILE=$CURRENT_DIR"/README.md"

if [ ! -d "$CURRENT_DIR" ]; then
    echo "$CURRENT_DIR does not exist!"
    exit
fi

if [ -f "$FILE" ]; then
    echo "$FILE already exists!"

    while [[ "$REPLY" != "N" ]] && [[ "$REPLY" != "Y" ]]
    do
      read -p "Do you want to replace it? (Y/N)?"
    done

    if [ "$REPLY" == "N" ]; then
      exit
    fi

    echo "Okay overwriting..."
fi

echo -e "# Round $round\n\n### Completed exercises\n\n" > $FILE

counter=1

while [ $counter -le $exercises ]
do
  echo -e "* $round.$counter" >> $FILE
  ((counter++))
done

echo 'Done'
