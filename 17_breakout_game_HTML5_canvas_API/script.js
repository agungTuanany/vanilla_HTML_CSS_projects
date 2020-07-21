const rulesBtn = document.getElementById("rules-button")
const closeBtn = document.getElementById("close-button")
const rules = document.getElementById("rules")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")


const blue_science = "#0095DD"
let score = 0

// Create ball props
const ball = {
    x_axis      : canvas.width / 2,
    y_axis      : canvas.height / 2,
    size        : 10,
    speed       : 4,
    direction_x : 4,                      // direction
    direction_y : -4
}

// Create paddle props
const paddle = {
    x_axis      : canvas.width / 2 -40,
    y_axis      : canvas.height - 20,
    width       : 80,
    height      : 10,
    speed       : 8,
    direction_x : 0
}

// Draw ball on canvas
const drawBall = () => {
    ctx.beginPath()
    ctx.arc(ball.x_axis, ball.y_axis, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = blue_science
    ctx.fill()
    ctx.closePath()
}

// Draw paddle
const drawPaddle = () => {
    ctx.beginPath()
    ctx.rect(paddle.x_axis, paddle.y_axis, paddle.width, paddle.height)
    ctx.closePath()
    ctx.fillStyle = blue_science
    ctx.fill()
}

// Draw score
const drawScore = () => {
    ctx.font = "20px Arial"
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}



// Rules event
const rulesBtnOnClick = () => rules.classList.add("show")

// Close event
const closeBtnOnClick = () => rules.classList.remove("show")


// Init functionality
const run = () => {
    drawBall()
    drawPaddle()
    drawScore()
}

run()

// Event Listner
rulesBtn.addEventListener("click", rulesBtnOnClick)
closeBtn.addEventListener("click", closeBtnOnClick)


