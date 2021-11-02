import { onSnake, expandSnake } from './snake.js'
import {randomGridPosition} from './grid.js'

// NB: grid starts at 1,1 not 0,0.

let food = getRandomFoodPosition()

// how much the snake grows when it eats the food
const EXPANSION_RATE = 1

export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
    }
}

// function to draw the food on the gameboard
export function draw(gameBoard) {
  
    //assign to a variable a div element
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    // apply css properties of the right class
    foodElement.classList.add('food')    
    gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}