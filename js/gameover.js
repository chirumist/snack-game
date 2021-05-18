import { SCORE } from './scores.js'
import { Sounds } from './sounds.js'

document.getElementById('high-score').innerText = SCORE.getHighScore()
document.getElementById('score').innerText = SCORE.getScore()
Sounds.gameOver('play')