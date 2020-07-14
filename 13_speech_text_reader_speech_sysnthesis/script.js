// DOM element
const main        = document.querySelector("main")
const voiceSelect = document.getElementById("voices")
const textarea    = document.getElementById("text")
const readBtn     = document.getElementById("read")
const toggleBtn   = document.getElementById("toggle")
const closeBtn    = document.getElementById("close")


const data = [
    {
        image: "./img/angry.jpg",
        text: "I'm Angry"
    },
    {
        image: "./img/drink.jpg",
        text: "I'm Thirty"
    },
    {
        image: "./img/grandma.jpg",
        text: "I Want Go TO Grandmas"
    },
    {
        image: "./img/happy.jpg",
        text: "I'm Happy"
    },
    {
        image: "./img/home.jpg",
        text: "I Want To Go Home"
    },
    {
        image: "./img/hurt.jpg",
        text: "I,m Hurt"
    },
    {
        image: "./img/outside.jpg",
        text: "I Want Go Outside"
    },
    {
        image: "./img/sad.jpg",
        text: "I'm Sad"
    },
    {
        image: "./img/school.jpg",
        text: "I Want To Go To School"
    },
    {
        image: "./img/scared.jpg",
        text: "I'm Scared"
    },
    {
        image: "./img/tired.jpg",
        text: "I'm Tired"
    }
]

data.forEach(createBox)

// Create Speech boxes
function createBox(item) {
    const box = document.createElement("div")

    const { image, text } = item;

    box.classList.add("box")
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
    `;

    // XXX TODO: speak event

    main.appendChild(box)
}
