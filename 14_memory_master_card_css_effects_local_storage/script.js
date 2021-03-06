// DOM selector
const cardContainer   = document.getElementById("card-container")
const prevBtn         = document.getElementById("prev")
const nextBtn         = document.getElementById("next")
const showBtn         = document.getElementById("show")
const hideBtn         = document.getElementById("hide")
const clearBtn        = document.getElementById("clear")
const currentElement  = document.getElementById("current")
const questionElement = document.getElementById("question")
const answerElement   = document.getElementById("answer")
const addCardBtn      = document.getElementById("add-card")
const addContainer    = document.getElementById("add-container")


// Keep track of current card
let currentActiveCard = 0

// Store DOM cards
const cardsElement = []

// Store card data
const cardsData = getCardsData()


// const cardsData = [
//     {
//         question : "What must a variabe begin with ?",
//         answer   : "A letter, $ or _"
//     },
//     {
//         question : "What is a variable ?",
//         answer   : "Container for a piece of data"
//     },
//     {
//         question : "Example of Case Sensitive Variable",
//         answer   : "thisIsAVariable"
//     }
// ]

// Create all cards
const createCards = () => {
    cardsData.forEach((data, index) => createCard(data, index))
}

// Create a single card in DOM
const createCard = (data, index) => {
    const card = document.createElement("div")
    card.classList.add("card")

    if (index === 0) {
        card.classList.add("active")
    }

    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>${data.question}</p>
            </div>

            <div class="inner-card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `;

    // Event listener flip
    card.addEventListener("click", () => card.classList.toggle("show-answer"))

    // Add to DOM cards
    cardsElement.push(card)

    cardContainer.appendChild(card)

    updateCurrentText()

}

// Show number of cards
const updateCurrentText = () => {
    currentElement.innerText = `${currentActiveCard + 1}/${cardsElement.length}`
}


// nextBtn event
const nextBtnOnClick = () => {
    cardsElement[currentActiveCard].className = "card left"

    currentActiveCard = currentActiveCard + 1

    if (currentActiveCard > cardsElement.length - 1) {
        currentActiveCard = cardsElement.length - 1
    }

    cardsElement[currentActiveCard].className = "card active"

    updateCurrentText()
}

// prevBtn event
const prevBtnOnClick = () => {
    cardsElement[currentActiveCard].className = "card right"

    currentActiveCard = currentActiveCard - 1

    if (currentActiveCard < 0) {
        currentActiveCard = 0
    }

    cardsElement[currentActiveCard].className = "card active"

    updateCurrentText()
}

// Show add container event
const showBtnOnClick = () => addContainer.classList.add("show")

// Hide add container evemt
const hideBtnOnClick = () => addContainer.classList.remove("show")

// Add card button event
const addCardBtnOnClick = () => {
    const question = questionElement.value
    const answer   = answerElement.value

    // console.log(question, answer)

    if (question.trim() && answer.trim()) {
        const newCard = { question, answer }

        createCard(newCard)

        questionElement.value = ""
        answerElement.value = ""

        addContainer.classList.remove("show")

        cardsData.push(newCard)
        setCardsData(cardsData)
    }

}

// Clear card button
const clearBtnOnClick = () => {
    localStorage.clear()
    cardContainer.innerHTML = ""

    window.location.reload()
}

// Get cards from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem("cards"))

    return cards === null ? [] : cards
}

// Add card to local storage
function setCardsData(cards) {
    localStorage.setItem("cards", JSON.stringify(cards))

    window.location.reload()
}





createCards()

// event Listener
nextBtn.addEventListener("click", nextBtnOnClick)
prevBtn.addEventListener("click", prevBtnOnClick)
showBtn.addEventListener("click", showBtnOnClick)
hideBtn.addEventListener("click", hideBtnOnClick)
addCardBtn.addEventListener("click", addCardBtnOnClick)
clearBtn.addEventListener("click", clearBtnOnClick)


/*
 * XXX Explanatory:
 *
 * The different using between "clasList" with "className" is:
 * classList add the calls to what's already there
 * className overwriting to what's already there
 *
 * XXX
 *
 */


