import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection} from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import {outsideGrid} from './grid.js'

let lastRenderTime = 0
//how many times does the snake move per second

let gameOver = false

const gameBoard = document.getElementById('game-board')

//setting a game loop to constantly update
function main (currentTime) {

    if (gameOver) {
        return alert('you lose')
    } 

     // 1) tell the browser we want to perform an animation. We pass a function (main itself) that updates the frame
     window.requestAnimationFrame(main);

    // 2) keep count of time passed since last render; divide by  1000 to go from ms to s
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;

    if (secondsSinceLastRender < 1/SNAKE_SPEED) return;  //do nothing

    // this happens when we reach 0.5s since last render
    console.log('Render');
    //now we keep track of the last rendered time
    lastRenderTime = currentTime;

    update()
    draw()
}

//add a point where to start
window.requestAnimationFrame(main);

//function that updates the status of the snake and the food
function update() {
    checkDeath()
    updateSnake()
    updateFood()
}

//function that actually draws
function draw() {
    //clear the gameBoard
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}