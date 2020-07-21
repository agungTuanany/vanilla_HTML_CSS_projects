// Bring DOM element
const rulesBtn = document.getElementById("rules-button")
const closeBtn = document.getElementById("close-button")
const rules    = document.getElementById("rules")
const canvas   = document.getElementById("canvas")
const ctx      = canvas.getContext("2d")


// Global variable
const blue_science     = "#0095DD"
let score              = 0
const brickRowCount    = 9
const brickColumnCount = 5

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

// Create brick props
const brickInfo = {
    width        : 70,
    height       : 20,
    padding      : 10,
    offsetX_axis : 45,
    offsetY_axis : 60,
    visible      : true
}

// Create bricks
const bricks = []
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = []

    for (let j = 0; j < brickColumnCount; j++) {
        const x_axis = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX_axis
        const y_axis = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY_axis

        bricks[i][j] = { x_axis, y_axis, ...brickInfo }
    }
}

// Draw ball on canvas
const drawBall = () => {
    ctx.beginPath()
    ctx.arc(ball.x_axis, ball.y_axis, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = blue_science
    ctx.fill()
    ctx.closePath()
}

// Draw paddle on canvas
const drawPaddle = () => {
    ctx.beginPath()
    ctx.rect(paddle.x_axis, paddle.y_axis, paddle.width, paddle.height)
    ctx.closePath()
    ctx.fillStyle = blue_science
    ctx.fill()
}

// Draw score on canvas
const drawScore = () => {
    ctx.font = "20px Arial"
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

// Draw bricks on canvas
const drawBricks = () => {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x_axis, brick.y_axis, brick.width, brick.height)
            ctx.fllStyle = brick.visible ? blue_science : "transparent"
            ctx.fill()
            ctx.closePath()
        })
    })
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
    drawBricks()
}

run()

// Event Listner
rulesBtn.addEventListener("click", rulesBtnOnClick)
closeBtn.addEventListener("click", closeBtnOnClick)


