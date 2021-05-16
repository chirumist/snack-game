export const SCORE = {
    getScore() { return Number(localStorage.getItem('score') || 0)},
    getHighScore () {return Number(localStorage.getItem('highScore') || 0)},
    setScore(score) { localStorage.setItem('score', score != 0 ? this.getScore() + score : score) },
    setHighScore(score) { localStorage.setItem('highScore', score != 0 ? this.getScore() + score : score) },
    getSpeed() { return Number(localStorage.getItem('speed')) },
    setSpeed(speed) {localStorage.setItem('speed', speed)},
    DRAW(gameBoard) {
        const scoreElem = document.createElement('div')
        scoreElem.innerText = 'Your: ' + this.getScore()
        scoreElem.classList.add('score')
        gameBoard.append(scoreElem)

        const highScoreElem = document.createElement('div')
        highScoreElem.innerText = 'YourHigh: ' + this.getHighScore()
        highScoreElem.classList.add('high-score')
        gameBoard.append(highScoreElem)
    }
}