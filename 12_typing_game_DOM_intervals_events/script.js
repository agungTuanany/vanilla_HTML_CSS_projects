// Bring DOM element
const word             = document.getElementById("word")
const text             = document.getElementById("text")
const scoreElement     = document.getElementById("score")
const timeElement      = document.getElementById("time")
const endGameElement   = document.getElementById("end-game-container")
const settingBtn       = document.getElementById("settings-btn")
const settings         = document.getElementById("settings")
const settingForm      = document.getElementById("settings-form")
const difficultySelect = document.getElementById("difficulty")

// Init word
let randomWord = null
// Init score
let score = 0
// Init time
let time = 10

// Init difficulty and set to local Storage
let difficulty = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "medium"

// Set difficulty selected value
difficultySelect.value = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "medium"

// Focus on text on start
text.focus()

// Start counting down
const timeInterval = setInterval(updateTime, 1000)

// Fetch words from API
async function fetchRandomWords() {
    const res  = await fetch(`http://random-word-api.herokuapp.com/word?number=1`)
    const data = await res.json()

    return data[0]
}

// XXX JUST KEEP FOR SIDE NOTE XXX
// XXX NOT USE THIS CAUSE FROM fetch() I GET RANDOM WORDS XXX
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

// Update time
function updateTime() {
    // Decreased by 1
    time--
    timeElement.innerHTML = time + "s"

    if (time == 0) {
        clearInterval(timeInterval)

        // End game
        gameOver()
    }
}

// Game over, show end screen
function gameOver() {
    endGameElement.innerHTML = `
        <h1>Time ran out</h1>
        <p>your final score is:<b> ${score}</b></p>
        <button onclick="location.reload()">Reload</button>
    `;

    endGameElement.style.display = "flex"
}

// Text input event listener
function textInput(event) {
    const insertedText = event.target.value

    if (insertedText === randomWord) {
        addWordToDOM()
        updateScore()

        // Clear
        event.target.value = ""

        // Implement difficulty
        if (difficulty === "hard") {
            time += 3
        }
        else if (difficulty === "medium") {
            time += 4
        }
        else {
            time += 5
        }

        updateTime()
    }
}

// Setting button listener
function settingBtnListener() {
    settings.classList.toggle("hide")
}

function settingFormListener(event) {
    difficulty =  event.target.value
    localStorage.setItem("difficulty", difficulty)
    console.log (difficulty)
}

// Init functions
addWordToDOM()

// Event Listeners
// typing
text.addEventListener("input", textInput)
// Setting button click
settingBtn.addEventListener("click", settingBtnListener)
// Setting select
settingForm.addEventListener("change", settingFormListener)
