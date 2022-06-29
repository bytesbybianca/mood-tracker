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

dayBox.forEach(box => box.addEventListener('mouseover', () => {
    let idDate = box.id.slice(5)
    let dayBoxBubble = document.querySelectorAll(`.bubble_${idDate}`)
    dayBoxBubble.forEach(bubble => bubble.classList.toggle('hidden'))
}))

dayBox.forEach(box => box.addEventListener('mouseout', () => {
    let idDate = box.id.slice(5)
    let dayBoxBubble = document.querySelectorAll(`.bubble_${idDate}`)
    dayBoxBubble.forEach(bubble => bubble.classList.toggle('hidden'))
}))

dayBox.forEach(box => box.addEventListener('click', () => {
    let idBoxClicked = box.id.slice(5)
    setDate.setAttribute('value', idBoxClicked);
    popUpContainer.classList.add('show');
}))

close.addEventListener('click', () => {
    popUpContainer.classList.remove('show')
})

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

  console.log(setDate.value)