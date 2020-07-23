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

    // writeMessage(msg)
    // checkNumber(msg)
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
}


// Speack result
recognition.addEventListener("result", onSpeak)




