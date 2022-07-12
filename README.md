# Mood Tracker

<p align="center">
Mood tracker to journal and keep track of your overall mood each day of the year.

  <img src="https://github.com/bytesbybianca/readme-assets/blob/main/project-images/mood-tracker-v1.gif?raw=true">
</p>

## How It's Made:

**Tech used:** EJS, CSS, JavaScript, Node.js, Express, MongoDB Atlas

Inspired by GitHub's heatmap contribution graph, I built a mood tracker with 3 different colors to represent the entered overall positive, neutral, or negative mood. 

- I used EJS, to dynamically create each square as many times as there are days for the current year, as well as each date on hover and the id for each element.
- I used JavaScript together with CSS to toggle classes to show and hide the pop up elements, such as the date on hover and the mood entry form.
- I used Node.js and Express together with MongoDB Atlas to allow the user to create, update, and delete entries for each day.

## How It Works:
Select either today's date or a date in the past. 
<p align="center">
  <img src="https://github.com/bytesbybianca/readme-assets/blob/main/project-images/mood-tracker-1.png?raw=true">
</p>

Log your mood and, optionally, add notes about your day.
<p align="center">
  <img src="https://github.com/bytesbybianca/readme-assets/blob/main/project-images/mood-tracker-2.png?raw=true">
</p>
<p align="center">
  <img src="https://github.com/bytesbybianca/readme-assets/blob/main/project-images/mood-tracker-3.png?raw=true">
</p>

You can also delete entries as long as they exist!
<p align="center">
  <img src="https://github.com/bytesbybianca/readme-assets/blob/main/project-images/mood-tracker-4.png?raw=true">
</p>

## Future Optimizations:
 - Add user authentication
 - Add settings to allow customizations
 - Add option to delete notes

## Lessons Learned: 
Building with EJS and JS, I was often making decisions about whether I should create elements or text dynamically or if I should, or even could, manipulate the DOM using JS instead.
