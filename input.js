let inputDirection = { x:0, y:0};
let lastInputDirection = {x:0, y:1}

// define a type of event (keydown) and a listener (arrow function)
window.addEventListener('keydown', e => {
    switch (e.key) {

        case 'ArrowUp' : 
            if (lastInputDirection.y !==0) break;
            inputDirection = {x:0, y:-1};
         break;

        case 'ArrowDown' :
            if (lastInputDirection.y !==0) break;
             inputDirection = {x:0, y:1};
         break;

        case 'ArrowLeft' : 
            if (lastInputDirection.x !==0) break;
            inputDirection = {x:-1, y:0};
         break;

        case 'ArrowRight' : 
            if (lastInputDirection.x !==0) break;
             inputDirection = {x:1, y:0};
         break;
    }
})

export function getInputDirection() {
    //the snake should not be able to fold on itself and go from R to L directly. Therefore we store the last direction
    lastInputDirection = inputDirection
    return inputDirection
}