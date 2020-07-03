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

// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach((input) => {

        if(input.value.trim() === "") {
            showError(input, `${getFieldName(input)} required`)
        }
        else {
            showSuccess(input)
        }
    })
}

// Get fieldNanme
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Check inputLenght
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} character's`)
    }
    else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be at last then ${max} character's`)
    }
    else {
        showSuccess(input)
    }
}

//  Email validation
function checkEmail(input) {
  const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    // return email_regex.test(String(email).toLowerCase())
    if (!email_regex.test(input.value.trim())) {
        showError(input, "Email is not valid")
    }
    else {
        showSuccess(input)
    }
}

// XXX TODO: Add more validation, password must have number and character XXX
// Check passwords match
function checkPasswordmatch(input1, input2) {
    if (input1.value !== input2.value) {
        return showError(input2, "Password not match")
    }
}

// add event listener on form
form.addEventListener("submit", (e) => {
    e.preventDefault()

    checkRequired([username, email, password, password2])
    checkLength(username, 6, 15)
    checkLength(password, 6, 15)
    checkEmail(email)
    checkPasswordmatch(password, password2)
})
