// Bring all the DOM element
const musicContainer    = document.getElementById("music-container")
const playBtn           = document.getElementById("play")
const prevBtn           = document.getElementById("prev")
const nextBtn           = document.getElementById("next")
const audio             = document.getElementById("audio")
const progress          = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
const title             = document.getElementById("title")
const cover             = document.getElementById("cover")

// Song titles
const songs = ["Jazzinuf_Be_Mine", "Paradise_broey", "NTR_MND_decision" ]

// Keep track of songs
let songIndex = 1

// Initially load song details into DOM
loadSong(songs[songIndex])


// Update song details
function loadSong(song) {
    title.innerText = song
    audio.innerText = `music/${song}.mp3`
    cover.innerText = `img/${song}.jpg`

    console.log (cover)
    console.log (cover.innerText = `img/${song}.jpg`)
}


// play song
function playSong() {
    musicContainer.classList.add("play")
    playBtn.querySelector("i.fas").classList.remove("fa-play")
    playBtn.querySelector("i.fas").classList.add("fa-pause")

    audio.play()
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove("play")
    playBtn.querySelector("i.fas").classList.add("fa-play")
    playBtn.querySelector("i.fas").classList.remove("fa-pause")

    audio.pause()
}


// Play music
function playMusic() {
    const isPlaying = musicContainer.classList.contains("play")

    if (isPlaying) {
        pauseSong()
    }
    else {
        playSong()
    }
}


// Event Listener
playBtn.addEventListener("click", playMusic)


