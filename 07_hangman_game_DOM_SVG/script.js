const wordElement       = document.getElementById("word")
const wrongLettersEl    = document.getElementById("wrong-letter")
const playAgainBtn      = document.getElementById("play-button")
const popup             = document.getElementById("popup-container")
const notification      = document.getElementById("notification-container")
const finalMessage      = document.getElementById("final-message")

const figureParts       = document.querySelectorAll(".figure-part")
const words             = ["application", "interface", "wizard", "programing"]
//
// Get random words
let selectedWord        = words[Math.floor(Math.random() * words.length)]

// XXX TODO: Get randim words from API
// const correctLetters = ["p", "r", "o", "g", "a", "m", "i", "n"]
const correctLetters    = []
const wrongLetters      = []


// Show hidden word
function displayWord () {
    wordElement.innerHTML = `
        ${selectedWord
                .split("")
                .map(letter => `
                    <span class="letter">
                        ${correctLetters.includes(letter) ? letter : ""}
                    </span>
                    `
                )
                .join("")
        }
    `;

    const innerWord = wordElement.innerText.replace(/\n/g, "")
    // console.log (wordElement.innerText, innerWord)

    if (innerWord === selectedWord) {
        finalMessage.innerText = "Congratulations! You won!";
        popup.style.display = "flex"
    }
}


// Update the wrong letters
function updateWrongLettersElement() {
    // console.log("update wrong")

    // Display  wrong letters
    wrongLettersEl.innerHTML =`
        ${wrongLetters.length> 0 ? '<p>Wrong</p>' : ""}
        ${wrongLetters.map (letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length

        if (index < errors) {
            part.style.display = "block"
        }
        else {
            part.style.display = "none"
        }
    })

    // Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = "Unforunately you lost"
        popup.style.display = "flex"
    }


}


// Show notification
function showNotification() {
    notification.classList.add("show")

    setTimeout(() => {
        notification.classList.remove("show")
    })
}

// Keydown letter press
function keydownLetterPress(el) {
    // console.log(el.code)
    if (el.keyCode >= 65 && el.keyCode <= 90) {
        const letter = el.key

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter)
                displayWord()
            }
            else {
                showNotification()
            }
        }
        else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter)
                updateWrongLettersElement()
            }
            else {
                showNotification()
            }
        }
    }
}

// Restart game and play again
function playAgain() {
    // Empty arrays
    correctLetters.splice(0)
    wrongLetters.splice(0)

    selectedWord = words[Math.floor(Math.random() * words.length)]

    displayWord()
    updateWrongLettersElement()

    popup.style.display = "none"
}


// Event Listener
window.addEventListener( "keydown", keydownLetterPress)
playAgainBtn.addEventListener("click", playAgain)

displayWord()
