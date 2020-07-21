const body      = document.getElementById("body")
const container = document.getElementById("container")
const text      = document.getElementById("text")

const totalTime = 7500
const breatheTime = (totalTime / 5 ) * 2
const holdTime = totalTime / 5
const totalTimeImage = 7200

// Breathe animation
function breatheAnimation() {
    text.innerText = "breathe In!"
    container.className = "container grow"

    setTimeout(() => {
        text.innerText = "Hold"

        setTimeout(() => {
            text.innerText = "Breathe Out!"
            container.className = "container shrink"
        }, holdTime)
    }, breatheTime)
}


// Ger random image for body
async function renderItem() {
    const res  = await fetch("https://source.unsplash.com/1350x600?hemp")
    const data = await res.url

    const bg = body.style.background = `url(${data}) no-repeat center center/cover`
}

renderItem()
breatheAnimation()

setInterval(renderItem, totalTimeImage)
setInterval(breatheAnimation, totalTime)
