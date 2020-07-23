// Bring DOM element
const body      = document.getElementById("body")
const days      = document.getElementById("days")
const hours     = document.getElementById("hours")
const minutes   = document.getElementById("minutes")
const seconds   = document.getElementById("seconds")
const countdown = document.getElementById("countdown")
const year      = document.getElementById("year")
const loading   = document.getElementById("loading")

const currentYear = new Date().getFullYear()

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`)

/*set background year */
year.innerText = currentYear + 1

const updateCountdown = () => {
    const currentTime = new Date()
    const diff = newYearTime - currentTime

    const d = Math.floor(diff / 1000 / 60 / 60 / 24)
    const h = Math.floor(diff / 1000 / 60 / 60) % 24
    const m = Math.floor(diff / 1000 / 60) % 60
    const s = Math.floor(diff / 1000) % 60

    days.innerHTML    = d
    hours.innerHTML   = h < 10 ? "10" + h : h
    minutes.innerHTML = m < 10 ? "0" + m : m
    seconds.innerHTML = s < 10 ? "0" + s : s
}

// Ger random image for body
async function renderItem() {
    const res  = await fetch("https://source.unsplash.com/1350x600?time")
    const data = await res.url

    const bg = body.style.background = `url(${data}) no-repeat center center/cover`
}

// Show spinner before countdown
setTimeout(() => {
    loading.remove()
    countdown.style.display = "flex"
}, 6300)

const init = () => {
    renderItem()
    setInterval(updateCountdown, 1000)

}

init()

