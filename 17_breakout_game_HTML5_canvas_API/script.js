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
    direction_x : 4,
    direction_y : -4
}

// Create paddle props
const paddle = {
    x_axis      : canvas.width / 2 - 40,
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
    ctx.fillStyle = blue_science
    ctx.fill()
    ctx.closePath()
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
            ctx.fillStyle = brick.visible ? blue_science : "transparent"
            ctx.fill()
            ctx.closePath()
        })
    })
}

// Move paddle on canvas
const movePaddle = () => {
    paddle.x_axis += paddle.direction_x

    // Wall detection
    if (paddle.x_axis + paddle.width > canvas.width) {
        paddle.x_axis = canvas.width - paddle.width
    }

    if (paddle.x_axis < 0) {
        paddle.x_axis = 0
    }
}

// Move ball on canvas
const  moveBall = () => {
    ball.x_axis += ball.direction_x
    ball.y_axis += ball.direction_y

    // Wall collision (right/left)
    if (ball.x_axis + ball.size > canvas.width || ball.x_axis - ball.size < 0) {
        ball.direction_x *= -1
    }

    // Wall collision (top/bottom)
    if (ball.y_axis + ball.size > canvas.height || ball.y_axis - ball.size < 0) {
        ball.direction_y *= -1
    }

    // Paddle collision
    if (ball.x_axis - ball.size > paddle.x_axis &&                          // check right side
        ball.x_axis + ball.size < paddle.x_axis + paddle.width &&           // check left side
        ball.y_axis + ball.size > paddle.y_axis                             // check top & bottom
    ){
        ball.direction_y = -ball.speed
    }

    // Brick collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visible) {
                if (
                    ball.x_axis - ball.size > brick.x_axis &&                   // left brick side check
                    ball.x_axis + ball.size < brick.x_axis + brick.width &&     // right brick side check
                    ball.y_axis + ball.size > brick.y_axis &&                   // top brick side check
                    ball.y_axis - ball.size < brick.y_axis + brick.height       // bottom brick side check
                ){
                    ball.direction_y *= -1
                    brick.visible = false

                    increaseScore()
                }
            }
        })
    })

    // Hit bottom wall = lose
    if (ball.y_axis + ball.size > canvas.height) {
        showAllBricks()
        score = 0
    }
}

// Increase score
const increaseScore = () => {
    score++

    if (score % (brickRowCount * brickColumnCount) === 0) {
        ball.visible = false
        paddle.visible =false

        // After 0.5sec restart the game

        setTimeout(() => {
            showAllBricks()
            paddle.x_axis = canvas.width / 2 - 40
            paddle.y_axis = canvas.height - 20
            ball.x_axis = canvas.width / 2
            ball.y_axis = canvas.height / 2
            ball.visible = true
            paddle.visible = true
        }, 500)
    }
}

// Make all bricks appear
const showAllBricks = () => {
    bricks.forEach(column => {
        column.forEach(brick => brick.visible = true)
    })
}


// Init Draw onto screen
const draw = () => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawBall()
    drawPaddle()
    drawScore()
    drawBricks()
}

// Update the canvas drawing and animation
const update = () => {
    // Move paddle
    movePaddle()

    // Move ball
    moveBall()

    // Draw everything
    draw()

    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFramehttps://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    requestAnimationFrame(update)
}

// Init update
update()

// Rules event handlers
const rulesBtnOnClick = () => rules.classList.add("show")

// Close event handlers
const closeBtnOnClick = () => rules.classList.remove("show")

// Keyboard Up event handlers
const keyDown = (event) => {
    if (event.key === "Right" || event.key === "ArrowRight") {
        paddle.direction_x = paddle.speed
    }
    else if (event.key === "Left" || event.key === "ArrowLeft") {
        paddle.direction_x = -paddle.speed
    }
}

// Keyboard down event handlers
const keyUp = (event) => {
    if (
        event.key === "Right" ||
        event.key === "ArrowRight" ||
        event.key === "Left" ||
        event.key === "ArrowLeft") {
        paddle.direction_x = 0
    }
}

// Event Listener
rulesBtn.addEventListener("click", rulesBtnOnClick)
closeBtn.addEventListener("click", closeBtnOnClick)
document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)


