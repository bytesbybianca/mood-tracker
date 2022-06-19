const selectDate = document.querySelector('#date')

let today = new Date()
let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();

if (day < 10) {
    day = '0' + day;
 }
 
 if (month < 10) {
    month = '0' + month;
 } 

today = `${year}-${month}-${day}`

document.querySelector('#date').setAttribute('max', today);
document.querySelector('#date').setAttribute('value', today);

selectDate.addEventListener('change', _ => {
    console.log(selectDate.value)
})