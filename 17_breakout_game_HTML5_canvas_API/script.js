const rulesBtn = document.getElementById("rules-button")
const closeBtn = document.getElementById("close-button")
const rules = document.getElementById("rules")

// Rules event
const rulesBtnOnClick = () => rules.classList.add("show")

// Close event
const closeBtnOnClick = () => rules.classList.remove("show")


// Event Listner
rulesBtn.addEventListener("click", rulesBtnOnClick)
closeBtn.addEventListener("click", closeBtnOnClick)


