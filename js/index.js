import { SNACK_SPEED, SNACK } from "./snack.js"
import { FOOD } from "./food.js"
import { GRID } from "./grid.js"
import { SCORE } from './scores.js'
import { Sounds } from './sounds.js'

export const gameBoard = document.querySelector('.game-board')
export const scoreBoard = document.querySelector('.score-board')

let lastRenderedTime = 0
let IS_GAMEOVER = false
SCORE.setScore(0)

document.documentElement.style.setProperty('--grid-size', localStorage.getItem('grid-size'));
Sounds.bgMusic('play')
setInterval(() => {
   Sounds.bgMusic('play')
}, 3000);
function main(currentTime) {
    if (IS_GAMEOVER) {
        if (SCORE.getScore() >= SCORE.getHighScore()) {
            SCORE.setHighScore(SCORE.getScore())
        }
        return window.location = './gameover.html'
    }
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderedTime) / 1000
    if (secondsSinceLastRender < 1 / SNACK_SPEED) return

    lastRenderedTime = currentTime
    update()
    draw()
    checkGameOver()
}

window.requestAnimationFrame(main)

function update() {
    SNACK.UPDATE()
    FOOD.UPDATE()
}

function draw() {
    clear()
    SNACK.DRAW(gameBoard)
    FOOD.DRAW(gameBoard)
    SCORE.DRAW(scoreBoard)
}

function clear() {
    gameBoard.innerHTML = ''
    scoreBoard.innerHTML = ''
}

function checkGameOver(params) {
    if (GRID.touch(SNACK.getHead()) || SNACK.TOUCH_BODY()) {
        IS_GAMEOVER = true
    }
    return IS_GAMEOVER
}