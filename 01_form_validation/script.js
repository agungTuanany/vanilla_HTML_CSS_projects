// Bring every element from DOM
const form      = document.getElementById("form")
const username  = document.getElementById("username")
const email     = document.getElementById("email")
const password  = document.getElementById("password")
const password2 = document.getElementById("password2")


// Show input error message
function showError(input, message) {
    const formControl = input.parentElement
    const small = formControl.querySelector("small")

    formControl.className = "form-control error"
    small.innerText = message
}

// Show success outline
function showSuccess (input) {
    const formControl = input.parentElement
    formControl.className = "form-control success"

}

//  Email validation
function isValidEmail(email) {
  const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return email_regex.test(String(email).toLowerCase())
}

// add event listener on form
form.addEventListener("submit", (e) => {
    e.preventDefault()

    // console.log(username.value)
    if (username.value === "") {
        showError(username, "User name is required")
    }
    else {
        showSuccess(username)
    }

    if (email.value === "") {
        showError(email, "Emall is required")
    }
    else if (!isValidEmail(email.value)) {
        showError(email, "Email is not valid")
    }
    else {
        showSuccess(username)
    }

    if (password.value === "") {
        showError(password, "Password is required")
    }
    else {
        showSuccess(username)
    }

    if (password2.value === "") {
        showError(password2, "Password is required")
    }
    else {
        showSuccess(username)
    }
})
