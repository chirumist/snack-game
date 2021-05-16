import {SCORE} from './scores.js'
const speedInputs = document.querySelectorAll('[name="speed"]')

const resetHighScore = document.querySelector('#resetHighScore')

const checkHighScore = () => {
    document.getElementById('high-score').innerText = SCORE.getHighScore()
}

SCORE.setSpeed(1)

checkHighScore()

Array.from(speedInputs, (speed) => {
    speed.addEventListener("change", (e) => {
        SCORE.setSpeed(Number(speed.value))
    })
})

resetHighScore.addEventListener("click", () => {
    SCORE.setHighScore(0)
    checkHighScore()
})
