const main               = document.getElementById("main")
const addUserBtn         = document.getElementById("add_user")
const doubleBtn          = document.getElementById("double")
const showMilionairsBtn   = document.getElementById("show_millioners")
const sortBtn            = document.getElementById("sort")
const calculateWealthBtn = document.getElementById("calculate_wealth")

let data = []

getRandomUser()

// Fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()

    const user = data.results[0]

    const newUser = {
        name:  `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser)
}

// Double user money
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 }
    })

    updateDOM()
}

// Sort users by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money)

    updateDOM()
}

// Filter only milionaires
function showMillionairs() {
    data = data.filter(user => user.money > 1000000)

    updateDOM()
}

// Calculate the total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0)

    const wealthElement = document.createElement("div")
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`

    main.appendChild(wealthElement)
}

// Add new object to data array
function addData(obj) {
    data.push(obj)

    updateDOM()
}

// Update DOM
function updateDOM(provideData = data) {
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>'

    provideData.forEach(item => {
        const element = document.createElement("div")
        element.classList.add("person")
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element)
    })
}

// https://stackoverflow/questions/149005/howt-to-format-numbers-as-currency-string
// Formant number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

// Event listeners
addUserBtn.addEventListener("click", getRandomUser)
doubleBtn.addEventListener("click", doubleMoney)
sortBtn.addEventListener("click", sortByRichest)
showMilionairsBtn.addEventListener("click", showMillionairs)
calculateWealthBtn.addEventListener("click", calculateWealth)
