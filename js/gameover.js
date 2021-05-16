import { SCORE } from './scores.js'

document.getElementById('high-score').innerText = SCORE.getHighScore()
document.getElementById('score').innerText = SCORE.getScore()