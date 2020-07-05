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

// Add new object to data array
function addData(obj) {
    data.push(obj)
}

