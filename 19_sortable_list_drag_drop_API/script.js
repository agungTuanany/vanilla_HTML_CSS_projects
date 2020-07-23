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
            const listItem = document.createElement("li")

            // listItem.classList.add("over")

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

    addEventListeners()
}

// All drag Event listener
function dragStart() {
    // console.log("Event: ", "dragstart")
    dragStartIndex = +this.closest("li").getAttribute("data-index")
    console.log(dragStartIndex)
}

function dragEnter() {
    // console.log("Event: ", "dragenter")
    this.classList.add("over")
}

function dragLeave() {
    // console.log("Event: ", "dragleave")
    this.classList.remove("over")

}

function dragOver(event) {
   // console.log("Event: ", "dragover")
    event.preventDefault()

}

function dragDrop() {
    // console.log("Event: ", "drop")
    const dragEndIndex = +this.getAttribute("data-index")

    swapItems(dragStartIndex, dragEndIndex)

    this.classList.remove("over")

}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector(".draggable")
    const itemTwo = listItems[toIndex].querySelector(".draggable")

    // Swap into DOM
    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}

//  Check the order of list items
function checkOrderOnClick() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector(".draggable").innerText.trim()

        if (personName !== richestPeople[index]) {
            listItem.classList.add("wrong")
        }
        else {
            listItem.classList.remove("wrong")
            listItem.classList.add("right")
        }
    })
}


function addEventListeners() {
    const draggables    = document.querySelectorAll(".draggable")
    const dragListItems = document.querySelectorAll(".draggable-list li")

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", dragStart)
    })

    dragListItems.forEach(item => {
        item.addEventListener("dragover", dragOver)
        item.addEventListener("drop", dragDrop)
        item.addEventListener("dragenter", dragEnter)
        item.addEventListener("dragleave", dragLeave)
    })
}

// Event Listener
check.addEventListener("click", checkOrderOnClick)
