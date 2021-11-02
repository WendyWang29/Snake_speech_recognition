import {getInputDirection} from "./input.js"

export const SNAKE_SPEED = 5
let newSegments = 0

// array of x and y coordinates
const snakeBody = [{x:11, y:11}]

export function update() {
    addSegments()
    const inputDirection = getInputDirection()
    //we are moving one segment and the one behind goes where that one was
    for (let i=snakeBody.length-2; i>=0; i--) {
        snakeBody[i+1] = {...snakeBody[i]}
    }
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

// function to draw the snake
// this function needs as parameter gameBoard to be passed
export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        
        //assign to a variable a div element
        const snakeElement = document.createElement('div')
        
        //define properties of the div element
        // 1) grid item's positions (x and y)
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        
        // 2) set color properties
        snakeElement.classList.add('snake')

        // 3) add the div to the gamebord
        gameBoard.appendChild(snakeElement)
    })
}

export function expandSnake(amount) {
    newSegments += amount
}

// NB in the following we define a function that also takes a property
// that by default is equal to false and equal to an empty object if we don't pass anything

export function onSnake(position, {ignoreHead = false} = {}) {
    // the 'some' method tests whether at least one element in the array passes the test 
    return snakeBody.some( (segment, index) => {
        if (ignoreHead && index ===0) return false 
        //aka if ignoreHead is true and we're studying the head: don't say we're intersecting!! 

        return equalPositions (segment, position)
    })
}

function equalPositions(pos1, pos2) {
    return (
        pos1.x === pos2.x && pos1.y === pos2.y
    )
}


// snakeBody[snakeBody.length-1] is the last index of what we already have
// and there we append a new element to the end of the snake (duplicated from the last one)
// lastly we put back to zero the number of new segments
function addSegments() {
    for (let i=0; i<newSegments; i++) {
        snakeBody.push({...snakeBody[snakeBody.length -1]})
    }
    newSegments =0;
}

export function getSnakeHead() {
    return snakeBody[0]
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], {ignoreHead: true})
}