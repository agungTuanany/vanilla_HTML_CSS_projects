const main               = document.getElementById("main")
const addUserBtn         = document.getElementById("add_user")
const doubleBtn          = document.getElementById("double")
const showMilionersBtn   = document.getElementById("short_millionairer")
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
