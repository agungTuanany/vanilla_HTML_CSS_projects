const container   = document.querySelector(".container")
const seats       = document.querySelectorAll(".row .seat:not(.occupied)")
const count       = document.getElementById("count")
const total       = document.getElementById("total")
const movieSelect = document.getElementById("movie")

// '+' change the string into number (int) data type
// or can use 'parseInt'
let ticketPrice = +movieSelect.value


function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected")
    const selectedSeatsCount = selectedSeats.length

    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
    console.log (selectedSeats)
}

// Movie select event
movieSelect.addEventListener("change", (event) => {
    ticketPrice = parseInt(event.target.value)
    updateSelectedCount()
})

// Seat click event
container.addEventListener("click", (event) => {
    // console.log (event.target)

    // Only select not occupied seat
    if (event.target.classList.contains("seat") &&
        !event.target.classList.contains("occupied")
    ) {
        event.target.classList.toggle("selected")

        updateSelectedCount()
    }
})
