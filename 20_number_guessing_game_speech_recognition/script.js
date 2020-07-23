// Bring DOM element
const messageEl      = document.getElementById("msg")

const randomNum = getRandomNumber()

console.log("Number:", randomNum)

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecongnition

let recognition = new window.SpeechRecognition()

// Start recognition and game
recognition.start()

// Generate random number

// Capture user speak
function onSpeak(event) {
    const msg = event.results[0][0].transcript

    writeMessage(msg)
    checkNumber(msg)
}

// Write what user speak
function writeMessage(msg) {
    messageEl.innerHTML = `
        <h3>You said:</h3>
        <span class="box">${msg}</span>
    `;
}

// Check messageEl againts element
function checkNumber(msg) {
    const num = +msg

    // Check if valid number
    if (Number.isNaN(num)) {
        messageEl.innerHTML += `<div>${num} is not a valid number</div>`
        return
    }

    // Check in range
    if (num > 100 || num < 1) {
        messageEl.innerHTML += '<div>Number must be between 1 and 100</div>'
        return
    }

    // Check number
    if (num === randomNum) {
        document.body.innerHTML = `
        <h2>Congrats! You have guessed the number!
            <br>
            <br>
            it was ${num}
        </h2>
        <button id="play-again" class="play-again">Play Again</button>
        `;
    }
    else if (num > randomNum) {
        messageEl.innerHTML += '<div>GO LOWER</div>'
    }
    else {
        messageEl.innerHTML += '<div>Go HIGHER</div>'
    }
}

// End Speak Recognition service
function onResume() {
    recognition.start()
}

// Play again event
function playAgainOnClick(event) {
    if (event.target.id === 'play-again') {
        window.location.reload()
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
}


// Speak result event listener
recognition.addEventListener("result", onSpeak)
recognition.addEventListener("end", onResume)
document.body,addEventListener("click", playAgainOnClick)


