/**
 * @param {Date} date
 **/
function isLeapYear(date) {
  const year = date.getFullYear()
  if ((year & 3) !== 0) return false

  return ((year % 100) !== 0 || (yaer % 400) === 0)
}

function getWeek() {
  const week = document.querySelector('#calendarweek')
  const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]

  const currentDate = new Date()

  const month = currentDate.getMonth()
  const dayOfMonth = currentDate.getDate()
  const weekday = currentDate.getDay()

  let dayOfYear = dayCount[month] + dayOfMonth

  if(month > 1 && isLeapYear(currentDate)) {
    dayOfYear++
  }

  currentDate.setFullYear(currentDate.getFullYear(), 1, 1)
  const janFirstDay = currentDate.getDay()

  const weekNumber = Math.floor(((dayOfYear + 6) / 7))
  if (weekday < janFirstDay) ++weekNumber
  console.log(weekNumber)
  week.innerHTML = `Calendarweek ${weekNumber}`
}
console.log('Test')
getWeek()

setTimeout(() => {
  const weekdisplay = document.querySelector('.weekdisplay')
  weekdisplay.classList.add('weekdisplay_show')
}, 500)
