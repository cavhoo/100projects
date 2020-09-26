const MINUTES = 60
const HOURS = MINUTES * 60
const DAYS = HOURS * 24
const MONTHS = DAYS * 30

function setText(months, days, hours, minutes, seconds) {
  const monthString = `${months}`.padStart(2, '0')
  const daysString = `${days}`.padStart(2, '0')
  const hoursString = `${hours}`.padStart(2, '0')
  const minutesString = `${minutes}`.padStart(2, '0')
  const secondsString = `${seconds}`.padStart(2, '0')

  document.querySelector('#months').innerHTML = monthString
  document.querySelector('#days').innerHTML = daysString
  document.querySelector('#hours').innerHTML = hoursString
  document.querySelector('#minutes').innerHTML = minutesString
  document.querySelector('#seconds').innerHTML = secondsString
}

function startCountdown() {
  let endOfYear = new Date()
  endOfYear.setDate(31)
  endOfYear.setMonth(12)
  endOfYear.setHours(23, 59, 59)

  const nextYear = new Date(endOfYear)
  nextYear.setFullYear(endOfYear.getFullYear())
  document.querySelector('#nextYear').innerHTML = nextYear.getFullYear()

  setInterval(() => {
    let now = new Date()

    let timeleft = endOfYear - now
    const timeLeftSeconds = Math.floor(timeleft / 1000)

    const monthsLeft = Math.floor(timeLeftSeconds / MONTHS)
    const daysLeft = Math.floor((timeLeftSeconds % MONTHS) / DAYS)
    const minutesLeft = Math.floor((timeLeftSeconds % HOURS) / MINUTES)
    const hoursLeft = Math.floor((timeLeftSeconds % DAYS) / HOURS)
    const secondsLeft = Math.floor((timeLeftSeconds % MINUTES))

    setText(
      monthsLeft,
      daysLeft,
      hoursLeft,
      minutesLeft,
      secondsLeft
    )

  }, 1000)

}
startCountdown()
