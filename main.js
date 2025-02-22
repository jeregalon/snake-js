const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 700;

/* variables del juego */

const longPixel = 26;
const pixelPadding = 2;
const colorPixel = 'green';
const colorFruit = 'red';
let posFruitX;
let posFruitY;

posFruitX;
posFruitY; 

/* variables de la serpiente */

let snakeSpeed = 8;
let posSnakeX = 10;
let posSnakeY = 15;
let orientation = 0; // 0 arriba, 1 derecha, 2 abajo, 3 izquierda

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let segmentsPosition = [
    10, 15,
    10, 16,
    10, 17,
    10, 18
];

fruitPosition();

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawWall() {

    for (let p = 0; p < canvas.width / (longPixel + pixelPadding); p++) {
        ctx.fillStyle = colorPixel;
    
        ctx.fillRect(
            p * (longPixel + pixelPadding),
            0,
            longPixel,
            longPixel
        ) // pared de arriba

        ctx.fillRect(
            p * (longPixel + pixelPadding),
            canvas.height - (longPixel + pixelPadding),
            longPixel,
            longPixel
        ) // pared de abajo

        if (
            p != 0 &&
            p != canvas.width / (longPixel + pixelPadding)
        ) {
            ctx.fillRect(
                0,
                p * (longPixel + pixelPadding),
                longPixel,
                longPixel
            ) // pared izquierda

            ctx.fillRect(
                canvas.width - (longPixel + pixelPadding),
                p * (longPixel + pixelPadding),
                longPixel,
                longPixel
            ) // pared derecha
        }
        
    }

    
}

function drawSnake() {
    ctx.fillStyle = colorPixel;
    for (let s = 0; s < segmentsPosition.length; s += 2) {
        ctx.fillRect(
            segmentsPosition[s] * canvas.width / (longPixel + pixelPadding),
            segmentsPosition[s + 1] * canvas.height / (longPixel + pixelPadding),
            longPixel,
            longPixel
        )
    }
    
}

function fruitPosition() {
    posFruitX = Math.floor(Math.random() * (canvas.width / (longPixel + pixelPadding) - 2)) + 1;
    posFruitY = Math.floor(Math.random() * (canvas.height / (longPixel + pixelPadding) - 2)) + 1; 
}

function drawFruit() {
    ctx.fillStyle = colorFruit;
    ctx.fillRect(
        posFruitX * canvas.width / (longPixel + pixelPadding),
        posFruitY * canvas.height / (longPixel + pixelPadding),
        longPixel,
        longPixel
    )

}

function collisionDetection() {
    if (
        posSnakeX == posFruitX &&
        posSnakeY == posFruitY
    ) {
        fruitPosition(); 
        segmentsPosition.push(segmentsPosition[segmentsPosition.length - 1]);
        segmentsPosition.push(segmentsPosition[segmentsPosition.length]);
    } else if (
        posSnakeX == 0 ||
        posSnakeY == 0 ||
        posSnakeX == canvas.width / (longPixel + pixelPadding) + 2 ||
        posSnakeY == canvas.height / (longPixel + pixelPadding) + 2
    ) {
        console.log('Game Over');
        document.location.reload();
    }
}

function snakeMovement() {
    if (orientation == 0) posSnakeY -= 1;
    if (orientation == 1) posSnakeX += 1;
    if (orientation == 2) posSnakeY += 1;
    if (orientation == 3) posSnakeX -= 1;

    let newPos = [posSnakeX, posSnakeY];

    segmentsPosition = [...newPos, ...segmentsPosition];

    segmentsPosition.pop();
    segmentsPosition.pop();

    console.log({posSnakeX, posSnakeY})
}

setInterval(snakeMovement, 1000 / snakeSpeed);

function refreshOrientation() {
    if (rightPressed && orientation != 3) {
        orientation = 1;
    }

    if (leftPressed && orientation != 1) {
        orientation = 3;
    }

    if (upPressed && orientation != 2) {
        orientation = 0;
    }

    if (downPressed && orientation != 0) {
        orientation = 2;
    }
}

function initEvents () {
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    function keyDownHandler (event) {
        const { key } = event;
        if (key === 'Right' || key === 'ArrowRight') {
            rightPressed = true;
        } else if (key === 'Left' || key === 'ArrowLeft') {
            leftPressed = true;
        } else if (key === 'Up' || key === 'ArrowUp') {
            upPressed = true;
        } else if (key === 'Down' || key === 'ArrowDown') {
            downPressed = true;
        }
    }

    function keyUpHandler (event) {
        const { key } = event;
        if (key === 'Right' || key === 'ArrowRight') {
            rightPressed = false;
        } else if (key === 'Left' || key === 'ArrowLeft') {
            leftPressed = false;
        } else if (key === 'Up' || key === 'ArrowUp') {
            upPressed = false;
        } else if (key === 'Down' || key === 'ArrowDown') {
            downPressed = false;
        }
    }
}

function draw() {
    // limpiar pantalla
    clearCanvas();

    // dibujar los elementos
    drawWall();
    drawSnake();
    drawFruit();

    // actualizar la orientación
    refreshOrientation();

    // colisiones y movimientos
    collisionDetection();

    window.requestAnimationFrame(draw);

}

draw();
initEvents();