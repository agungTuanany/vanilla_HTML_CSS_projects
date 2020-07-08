const wordElement    = document.getElementById("word")
const wrongElement   = document.getElementById("wrong-letters")
const playAgainBtn   = document.getElementById("play-again")
const popup          = document.getElementById("popup-container")
const notification   = document.getElementById("notification-container")
const finalMessage   = document.getElementById("final-message")

const figureParts    = document.querySelectorAll("figure-part")
const words          = ["application", "interface", "wizard", "programing"]
//
// Get random words
let selectedWord     = words[Math.floor(Math.random() * words.length)]

// const correctLetters = ["p", "r", "o", "g", "a", "m", "i", "n"]
const correctLetters = []
const wrongLetters   = []


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
    console.log (wordElement.innerText, innerWord)

    if (innerWord === selectedWord) {
        finalMessage.innerText = "Congratulations! You won!"
        popup.style.display = "flex"
    }
}

displayWord()

// Event Listener


