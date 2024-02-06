#!/bin/bash

# Start date
START_DATE=$(date +%Y-%m-%d)

# Number of days ago for the first commit
DAYS_AGO=29

# Make the first commit
git commit --date="$START_DATE - $DAYS_AGO days" -m "daily note talking"

# Loop through the next  4 days
for ((i=1; i<=28; i++))
do
  # Calculate the new date
  NEW_DATE=$(date -d "$START_DATE - $DAYS_AGO days - $i days" +%Y-%m-%d)
   
  # Make a new commit with the past date
  git commit --date="$NEW_DATE" -m "Add OSINT notes"
done
