import { SNACK } from './snack.js'
import {GRID} from './grid.js'
let food = RANDOM_POSITION()

const EXPANSION_RATE = 1

export const FOOD = {
    UPDATE() {
        if (SNACK.OnCollision(food)) {
            SNACK.EXPAND_SNACK(EXPANSION_RATE)
            food = RANDOM_POSITION()
        }
    },
    DRAW(gameBoard) {
        const foodElem = document.createElement('div')
        foodElem.style.gridRowStart = food.y
        foodElem.style.gridColumnStart = food.x
        foodElem.classList.add('snack-food')
        gameBoard.prepend(foodElem)
    }
}

function RANDOM_POSITION() {
    let newFoodPosition
    while (newFoodPosition === null || SNACK.OnCollision(newFoodPosition)) {
        newFoodPosition = GRID.random()
    }

    return newFoodPosition
}