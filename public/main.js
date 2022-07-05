// defining dates
let today = new Date()
const year = today.getFullYear();
let month = today.getMonth() + 1;
const monthName = today.toLocaleString('default', { month: 'long' })
let day = today.getDate();

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

console.log(yearObj)

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
    // isolate number from class name to target index in yearObj
    let dayBoxDate = box.className.split(' ').filter(x => Number(x) || x == '0').toString()
    console.log(dayBoxDate)
    // define the date from the box's id ('date_' + YYYY-MM-DD)
    let idBoxClicked = box.id.slice(5)
    // set the value of date picker to the date clicked
    setDate.setAttribute('value', idBoxClicked);
    let dateErrorBubble = document.querySelector(`.error_${idBoxClicked}`)
    // if date is today or in the past, show pop up box
    if(idBoxClicked <= todayFormatted) {
        // add class 'show' pop up box
        popUpContainer.classList.add('show');
        // add day of the week in pop up box
        document.querySelector('#pop-up-day').textContent = `${yearObj[dayBoxDate].day}`
        // add month, date, year in pop up box
        document.querySelector('#pop-up-date').textContent = `${yearObj[dayBoxDate].month_long} ${yearObj[dayBoxDate].date}, ${yearObj[dayBoxDate].year}`
        // display notes
        fetch('/motd')
        .then(res => res.json())
        .then(data => {
            let clickedEntry = data.find(entry => entry.date == idBoxClicked)
            console.log(data)
            let emptyNotes = ''
                document.querySelector('#note-entry').textContent = clickedEntry.notes ? clickedEntry.notes : emptyNotes
            // console.log(data.map(entry => entry.date == idBoxClicked ? entry.notes : ''))
        })
    // if date is in the future,
    } else if(idBoxClicked > todayFormatted){
        // show date error
        dateErrorBubble.classList.add('show');
    }
}))

// POP UP BOX
// Change displayed date header when user changes input value
setDate.addEventListener('change', () => {
    let selectedDateObj = yearObj.find(x => x.full_date === `${setDate.value}`)
    // add day of the week in pop up box
    document.querySelector('#pop-up-day').textContent = `${selectedDateObj.day}`
    // add month, date, year in pop up box
    document.querySelector('#pop-up-date').textContent = `${selectedDateObj.month_long} ${selectedDateObj.date}, ${selectedDateObj.year}`
})

// When you click the X in the pop up box,
close.addEventListener('click', () => {
    // remove class 'show' to hide pop up box
    popUpContainer.classList.remove('show')
    // reset delete error message
    document.querySelector('#delete-error').textContent = ''
    // reset notes display
    document.querySelector('#note-entry').textContent = ''
})

function fetchData() {
    fetch('/motd')
    .then(res => res.json())
    .then(data => {
        data.forEach(entry => {
            /* DAY BOX COLORS */
            // Add a class to day box to change colors
            if(entry.overallMood === 'neutral') {
                document.querySelector(`#date_${entry.date}`).classList.add('neutral');
            } else if(entry.overallMood === 'positive') {
                document.querySelector(`#date_${entry.date}`).classList.add('positive');
            } else if(entry.overallMood === 'negative') {
                document.querySelector(`#date_${entry.date}`).classList.add('negative');
            }
            // NOTES
            // Show notes indicator if notes exists
            if(entry.notes) {
                // Add class to show styles if notes exists
                document.querySelector(`#date_${entry.date} .notes-indicator`).classList.add('show')
            }
        })
    })
}

fetchData()

/* DELETING ENTRIES */
const deleteEntry = document.querySelector('#delete')

deleteEntry.addEventListener('click', () => {
    
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
          if (response === 'No data to delete') {
            document.querySelector('#delete-error').textContent = 'No mood to delete on this date.'
          } else {
            window.location.reload(true)   
          }
        })
        .catch(error => console.error(error))
  })

  console.log(todayFormatted > '2022-07-03')