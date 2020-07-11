const balance = document.getElementById("balance")
const money_plus = document.getElementById("money-plus")
const money_minus = document.getElementById("money-minus")
const list = document.getElementById("list")
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")

// const dummyTransactions = [
//     {id: 1, text: "Flower", amount: -20},
//     {id: 2, text: "Salary", amount: 300},
//     {id: 3, text: "Book", amount: -10},
//     {id: 4, text: "Hair cut", amount: -20},
// ]

// let transactions = dummyTransactions

const localStorageTransactions = JSON.parse(localStorage.getItem("transaction"))

let transactions = localStorage.getItem("transaction") !== null ? localStorageTransactions : []


// Add transaction to DOM list
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? "-" : "+"
    const item = document.createElement("li")

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? "minus" : "plus")

    item.innerHTML = `
        ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span><button
        class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item)
}

// Update the balance, income and expense
function updateValues() {
    // XXX Blueprint using high-order array method in real situation XXX
    const amounts = transactions.map(transaction => transaction.amount)

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2)

    const expense =
        (amounts
            .filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1
        ).toFixed(2)

    const total = amounts.reduce((acc, item) => (acc += item), 0)
        .toFixed(2)

    // console.log (expense)

    balance.innerText     = `IDR ${total}`
    money_plus.innerText  = `IDR ${income}`
    money_minus.innerText = `IDR ${expense}`
}

// XXX TODO: Add a date of transactions; create automatically.XXX
// Add transaction event listener
function addTransactionListener(event) {
    event.preventDefault()

    if (text.value.trim() === "" || amount.value.trim() === "") {
        // XXX TODO: Create your own modal XXX

        alert("Please add a text and amount")
    }
    else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }

        transactions.push(transaction)

        addTransactionDOM(transaction)
    }

    updateValues()

    updateLocalStorage()

    text.value = ""
    amount.value = ""
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000)

}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id)

    updateLocalStorage()
    init()
}

// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem("transaction", JSON.stringify(transactions))
}


// Init asap
function init() {
    list.innerHTML = ""

    transactions.forEach(addTransactionDOM)
    updateValues()
}

// Event Listener
form.addEventListener("submit", addTransactionListener)

init()
