// defining dates
let today = new Date()
const year = today.getFullYear();
let month = today.getMonth() + 1;
const monthName = today.toLocaleString('default', { month: 'long' })
const day = today.getDate();

if (day < 10) {
    day = '0' + day;
 }
 
 if (month < 10) {
    month = '0' + month;
 } 

let todayFormatted = `${year}-${month}-${day}`

// year obj
let weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
let dayOfWeek = weekdays[today.getDay()]
let dayOfYear = new Date(year, 0, 1)
let lastDayOfYear = new Date(year, 11, 31)
let yearObj = new Array()

for (dayOfYear; dayOfYear <= lastDayOfYear; dayOfYear.setDate(dayOfYear.getDate() + 1)) {
    let idMonth = new Date(dayOfYear).getMonth() + 1 
    let idDay = new Date(dayOfYear).getDate() 
    let dayCounter = 1 
    let i = 0 
    
    dayOfWeek = weekdays[dayOfYear.getDay()] 
        if (idDay < 10) { 
            idDay = '0' + idDay; 
        } 
        
        if (idMonth < 10) { 
            idMonth = '0' + idMonth; 
        }  
    yearObj.push({
                    full_date: `${year}-${idMonth}-${idDay}`,
                    month_long: `${new Date(dayOfYear).toLocaleString('default', { month: 'long' })}`,
                    month_short: `${new Date(dayOfYear).toLocaleString('default', { month: 'short' })}`,
                    date: `${new Date(dayOfYear).getDate()}`,
                    year: year,
                    day: dayOfWeek,
                    day_of_year: dayCounter,
                })
     dayCounter++ 
     i++ 
} 

// setting max date as today
const setDate = document.querySelector('#date')
setDate.setAttribute('max', todayFormatted);
setDate.setAttribute('value', todayFormatted);

const dayBox = document.querySelectorAll('.dayBox')
const popUpContainer = document.querySelector('.pop-up-container')
const close = document.querySelector('#close')

/* BUBBLE */

// Bubble: mouse over to show bubble
// When you mouse over each box,
dayBox.forEach(box => box.addEventListener('mouseover', () => {
    // define the date from the box's id ('date_' + YYYY-MM-DD)
    let idDate = box.id.slice(5)
    // define the bubble and pointer elements
    let dayBoxBubble = document.querySelectorAll(`.bubble_${idDate}`)
        // add class 'show' to both bubble and pointer elements
        dayBoxBubble.forEach(bubble => bubble.classList.add('show'))
}))

// Bubble: mouse out to hide bubble
// When you mouse out of each box,
dayBox.forEach(box => box.addEventListener('mouseout', () => {
    // define the date from the box's id ('date_' + YYYY-MM-DD)
    let idDate = box.id.slice(5)
    // define the bubble and pointer elements
    let dayBoxBubble = document.querySelectorAll(`.bubble_${idDate}`)
    let dateErrorBubble = document.querySelector(`.error_${idDate}`)
    // remove class 'show' to hide both bubble and pointer elements
    dayBoxBubble.forEach(bubble => bubble.classList.remove('show'))
    dateErrorBubble.classList.remove('show')
}))

/* POP UP */

// Click box to reveal pop up box
// When you click on any of the boxes,
dayBox.forEach(box => box.addEventListener('click', () => {
    // define the date from the box's id ('date_' + YYYY-MM-DD)
    let idBoxClicked = box.id.slice(5)
    // set the value of date picker to the date clicked
    setDate.setAttribute('value', idBoxClicked);
    let dateErrorBubble = document.querySelector(`.error_${idBoxClicked}`)
    if(idBoxClicked <= todayFormatted) {
        // add class 'show' pop up box
        popUpContainer.classList.add('show');
    } else if(idBoxClicked > todayFormatted){
        console.log(idBoxClicked > todayFormatted)
        dateErrorBubble.classList.add('show');
    }
}))

// When you click the X in the pop up box,
close.addEventListener('click', () => {
    // remove class 'show' to hide pop up box
    popUpContainer.classList.remove('show')
})

/* DAY BOX COLORS */
// Add a class to day box to change colors
function setBoxColorClass() {
    fetch('/motd')
    .then(res => res.json())
    .then(data => {
        data.forEach(entry => {
            if(entry.overallMood === 'neutral') {
                document.querySelector(`#date_${entry.date}`).classList.add('neutral');
            } else if(entry.overallMood === 'positive') {
                document.querySelector(`#date_${entry.date}`).classList.add('positive');
            } else if(entry.overallMood === 'negative') {
                document.querySelector(`#date_${entry.date}`).classList.add('negative');
            }
        })
    })
}

setBoxColorClass()

/* DELETING ENTRIES */
const deleteEntry = document.querySelector('#delete')

deleteEntry.addEventListener('click', _ => {
    
    fetch('/motd', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: setDate.value
      })
    })
      .then(res => {
          console.log(setDate.value)
        if (res.ok) return res.json()
      })
      .then(response => {
            window.location.reload(true)
        })
        .catch(error => console.error(error))
  })

  console.log(todayFormatted > '2022-07-03')