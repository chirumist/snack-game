import { gameBoard } from './index.js'
import { SNACK, SNACK_SPEED } from './snack.js'
import { GRID } from './grid.js'
import { SCORE } from './scores.js'
import { Sounds } from './sounds.js'
let food = RANDOM_POSITION()
let powerFood = RANDOM_POSITION()

const EXPANSION_RATE = 1

let isPowerFood = false
export const FOOD = {
    UPDATE() {
        if (SNACK.OnCollision(food)) {
            let score = 1
            switch (SNACK_SPEED) {
                case 5:
                    score = 2
                    break;
                case 10:
                    score = 3
                    break;
                case 20:
                    score = 4
                    break;
                case 30:
                    score = 4
                    break;
                default:
                    break;
            }
            SNACK.EXPAND_SNACK(EXPANSION_RATE, score)
            if (!((SCORE.getScore() / score) % 5)) {
                isPowerFood = true
            }
            food = RANDOM_POSITION()
        }
        if (SNACK.OnCollision(powerFood)) {
            let score = 2
            switch (SNACK_SPEED) {
                case 5:
                    score = 2 * 2
                    break;
                case 10:
                    score = 3 * 2
                    break;
                case 20:
                    score = 4 * 2
                    break;
                case 30:
                    score = 4 * 2
                    break;
                default:
                    break;
            }
            SNACK.EXPAND_SNACK(EXPANSION_RATE + 2, score)
            powerFood = RANDOM_POSITION()
            isPowerFood = false
        }
    },
    DRAW(gameBoard) {
        const foodElem = document.createElement('div')
        foodElem.style.gridRowStart = food.y
        foodElem.style.gridColumnStart = food.x
        foodElem.classList.add('snack-food')
        gameBoard.prepend(foodElem)
        
        if (isPowerFood) {
            const powerFoodElem = document.createElement('div')
            powerFoodElem.style.gridRowStart = powerFood.y
            powerFoodElem.style.gridColumnStart = powerFood.x
            powerFoodElem.classList.add('snack-food','snack-power-food')
            gameBoard.prepend(powerFoodElem)
        }
    }
}

function RANDOM_POSITION() {
    let newFoodPosition
    while (newFoodPosition === null || SNACK.OnCollision(newFoodPosition)) {
        newFoodPosition = GRID.random()
    }

    return newFoodPosition
}