// Bring DOM element
const word            = document.getElementById("word")
const text            = document.getElementById("text")
const scoreElement    = document.getElementById("score")
const timeElelemnt    = document.getElementById("time")
const endGameElement  = document.getElementById("end-game")
const settingBtn      = document.getElementById("settings-btn")
const settings        = document.getElementById("settings")
const settingForm     = document.getElementById("setting-form")
const diffcultySelect = document.getElementById("difficulty")

// Init word
let randomWord = null
// Init score
let score = 0
// Init time
let time = 10


// Fetch words from API
async function fetchRandomWords() {
    const res  = await fetch(`http://random-word-api.herokuapp.com/word?number=1`)
    const data = await res.json()

    return data[0]
}

// XXX NOT USE THIS CAUSE FROM FETCH I GET RANDOMIZE WORD XXX
// XXX JUST KEEP FOR SIDE NOTE XXX
// // Generate random word form API
// async function getRandomWord() {
//     const words = await fetchRandomWords()

//     // XXX Why not using this randomize words cause words was random when I fetch from API XXX
//     // return words[Math.floor(Math.random() * words.length)]
// }

// Add word to DOM
async function addWordToDOM() {
    randomWord = await fetchRandomWords()

    return word.innerHTML = randomWord
}

// Update score
function updateScore() {
    score++;
    scoreElement.innerHTML = score
}


function textInput(event) {
    const insertedText = event.target.value

    if (insertedText === randomWord) {
        addWordToDOM()

        updateScore()

        // Clear
        event.target.value = ""
    }
}

// Init functions
addWordToDOM()

// Event Listeners
text.addEventListener("input", textInput)

