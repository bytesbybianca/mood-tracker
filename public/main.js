let today = new Date()
let year = today.getFullYear();
let month = today.getMonth() + 1;
const monthName = today.toLocaleString('default', { month: 'long' })
let day = today.getDate();

if (day < 10) {
    day = '0' + day;
 }
 
 if (month < 10) {
    month = '0' + month;
 } 

today = `${year}-${month}-${day}`

let setDate = document.querySelector('#date')
setDate.setAttribute('max', today);
setDate.setAttribute('value', today);

let dayBox = document.querySelectorAll('.dayBox')
const moodPickerForm = document.querySelector('.moodPicker')
const shade = document.querySelector('.shade')
const closeButton = document.querySelector('.close-button')

dayBox.forEach(box => box.addEventListener('click', () => {
    let idBoxClicked = box.id.slice(5)
    moodPickerForm.classList.toggle('hidden')
    shade.classList.toggle('hidden')
    setDate.setAttribute('value', idBoxClicked);
}))

shade.addEventListener('click', () => {
    moodPickerForm.classList.toggle('hidden')
    shade.classList.toggle('hidden')
})

closeButton.addEventListener('click', () => {
    moodPickerForm.classList.toggle('hidden')
    shade.classList.toggle('hidden')
})

function setBoxColor() {
    fetch('/motd')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        // console.log(data[0].overallMood)
        data.forEach(entry => {
            if(entry.overallMood === 'neutral') {
                document.querySelector(`#date_${entry.date}`).style.backgroundColor = "gray";
            } else if(entry.overallMood === 'positive') {
                document.querySelector(`#date_${entry.date}`).style.backgroundColor = "green";
            } else if(entry.overallMood === 'negative') {
                document.querySelector(`#date_${entry.date}`).style.backgroundColor = "red";
            }
        })
    })
}

setBoxColor()
// // fix this
// const updateMood = document.querySelector('.dayMood')

// updateMood.addEventListener('click', () => {
//     fetch('/motd', {
//       method: 'put',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         overallMood: 'changed'
//       })
//     })
//     .then(res => {
//         if (res.ok) return res.json()
//       })
//     .then(response => {
//         window.location.reload(true) // refreshing the browser but change later to update the DOM
//     })
//   })