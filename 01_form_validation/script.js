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
