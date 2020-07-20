const header = document.querySelector("header")







// Ger random image for header
async function renderItem() {
    const res = await fetch("https://source.unsplash.com/1350x600?music")
    const data = await res.url

    header.style.backgroundImage = `url(${data})`
}

renderItem()


