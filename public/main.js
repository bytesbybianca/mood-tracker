let today = new Date()
let year = today.getFullYear();
let month = today.getMonth() + 1;
let monthName = today.toLocaleString('default', { month: 'long' })
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

// let daysOfYear = [];
// for (let d = new Date(2022, 0, 1); d <= new Date(2022, 11, 31); d.setDate(d.getDate() + 1)) {
//     daysOfYear.push(`${new Date(d).toLocaleString('default', { month: 'long' })} ${new Date(d).getDate()}`);
// }
// console.log(`${daysOfYear}`)