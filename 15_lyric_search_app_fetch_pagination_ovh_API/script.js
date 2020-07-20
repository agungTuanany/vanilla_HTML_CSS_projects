const header = document.getElementById("header")
const form   = document.getElementById("form")
const search = document.getElementById("search")
const result = document.getElementById("result")
const more   = document.getElementById("more")

// Fetch resource
const apiURL = "https://api.lyrics.ovh"


// form event
const formOnSubmit = event => {
    event.preventDefault()

    const searchTerm = search.value.trim()


    if (!searchTerm) {
        // XXX TODO: create your own modal XXX
        alert("Please type in a seach term")
    }
    else {
        searchSong(searchTerm)
    }
}

// Seach by song or artist
const searchSong = async term => {

    // /// Using Promise
    // fetch(`${apiURL}/suggest/${term}`)
    //     .then(res => res.json())
    //     .then(data => console.log(data) )

    const res = await fetch(`${apiURL}/suggest/${term}`)
    const data = await res.json()

    showData(data)
}

// Show song and artist in DOM
const showData = data => {}


// Ger random image for header
async function renderItem() {
    const res = await fetch("https://source.unsplash.com/1350x600?music")
    const data = await res.url

    header.style.backgroundImage = `url(${data})`
}

renderItem()

// event listener
form.addEventListener("submit", formOnSubmit)

