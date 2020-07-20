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
const cardsData = [
    {
        question : "What must a variabe begin with ?",
        answer   : "A letter, $ or _"
    },
    {
        question : "What is a variable ?",
        answer   : "Container for a piece of data"
    },
    {
        question : "Example of Case Sensitive Variable",
        answer   : "thisIsAVariable"
    }
]

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



createCards()




