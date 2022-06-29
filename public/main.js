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

today = `${year}-${month}-${day}`

// setting max date as today
const setDate = document.querySelector('#date')
setDate.setAttribute('max', today);
setDate.setAttribute('value', today);

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
    // remove class 'show' to hide both bubble and pointer elements
    dayBoxBubble.forEach(bubble => bubble.classList.remove('show'))
}))

/* POP UP */

// Click box to reveal pop up box
// When you click on any of the boxes,
dayBox.forEach(box => box.addEventListener('click', () => {
    // define the date from the box's id ('date_' + YYYY-MM-DD)
    let idBoxClicked = box.id.slice(5)
    // set the value of date picker to the date clicked
    setDate.setAttribute('value', idBoxClicked);
    // add class 'show' pop up box
    popUpContainer.classList.add('show');
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