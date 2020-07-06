const toggle = document.getElementById("toggle")
const close  = document.getElementById("close")
const open   = document.getElementById("open")
const modal  = document.getElementById("modal")


// Toggle functions
function toggle_nav() {
    document.body.classList.toggle("show-nav")
}

// Show modal
function show_modal() {
    modal.classList.add("show-modal");
}

function close_modal() {
    modal.classList.remove("show-modal")
}

// Hide modal on outside click
function hide_modal_outside(event) {
    event.target == modal ? modal.classList.remove("show-modal") : false
}

// Event listeners
toggle.addEventListener("click",toggle_nav)
open.addEventListener("click", show_modal)
close.addEventListener("click", close_modal)
window.addEventListener("click", hide_modal_outside)
