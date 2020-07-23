const draggable_list = document.getElementById("draggable-list")
const check = document.getElementById("check")

const richestPeople = [
    "Jeff Bezos",
    "Bill Gates",
    "Warren Buffett",
    "Bernard Arnault",
    "Carlos Slim Helu",
    "Amancio Ortega",
    "Larry Ellison",
    "Mark Zuckerberg",
    "Michael Bloomberg",
    "Larry Page"
]

// Store listItems
const listItems = []

let dragStartIndex

createList()

// Insert list items into DOM
function createList() {
    [...richestPeople]
        .map(a => ({ value: a, sort:Math.random() }))
    // sort with compare
        .sort((a, b) => a.sort - b.sort)
    // Mapped back into array of string
        .map (a => a.value)
        .forEach((person, index) => {
            console.log(person)
        const listItem = document.createElement("li")

        listItem.setAttribute("data-index", index)

        listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;

        listItems.push(listItem)

        draggable_list.appendChild(listItem)
    })
}
