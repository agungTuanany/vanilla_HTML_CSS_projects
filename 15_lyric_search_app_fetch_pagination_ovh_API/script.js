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

// XXX TODO: Use master-cards to fetch next 15 result XXX
// Show song and artist in DOM
const showData = data => {
    // let output = ""

    // data.data.forEach(song => {
    //     output += `
    //         <li>
    //             <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    //             <button class="btn" data-artist="${song.artist.name}"
    //             data-songtitle="${song.title}">Get Lyrics</button>
    //         </li>
    //     `;
    // })

    // result.innerHTML = `
    //     <ul class="songs">
    //         ${output}
    //     </ul>

    // `;

    result.innerHTML = `
        <ul class="songs">
            ${data.data.map(song => `
                <li>
                    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                    <button class="btn" data-artist="${song.artist.name}"
                    data-songtitle="${song.title}">Get Lyrics</button>
                </li>
            `)
                    .join("")
            }
        </ul>
    `;
    if (data.prev || data.next) {
        more.innerHTML = `
            ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ""}
            ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ""}
        `;
    }
    else {
        more.innerHTML = ""
    }
}

// Get prev and next songs
async function getMoreSongs(url) {
    /// Prevent to CORS error
    const res =await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    const data = await res.json()

    showData(data)
}


// Ger random image for header
async function renderItem() {
    const res  = await fetch("https://source.unsplash.com/1350x600?music")
    const data = await res.url

    header.style.backgroundImage = `url(${data})`
}

renderItem()

// event listener
form.addEventListener("submit", formOnSubmit)

