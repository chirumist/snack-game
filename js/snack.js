import { getInputDirection } from './input.js'
import { SCORE } from './scores.js'
import { GRID_SIZE} from './grid.js'
import { Sounds } from './sounds.js'

export const SNACK_BODY = [{ x: 11, y: 11 }]
let newSegment = 0

export const SNACK_SPEED = SCORE.getSpeed()

export const SNACK = {
    RESET() {
        SNACK_BODY.length = 0
        newSegment = 0
        SCORE.setScore(0)
    },
    UPDATE() {
        this.ADD_SEGMENT()
        const inputDirection = getInputDirection()
        for (let index = SNACK_BODY.length - 2; index >= 0; index--) {
            SNACK_BODY[index + 1] = { ...SNACK_BODY[index] }
        }

        if (inputDirection.x == 0 && inputDirection.y == 0) {
        } else {
            Sounds.snackSFX('play')
            SNACK_BODY[0].x += inputDirection.x
            SNACK_BODY[0].y += inputDirection.y
            if(inputDirection.x == 1) {
                console.log(SNACK_BODY[0].x, GRID_SIZE)
                if(SNACK_BODY[0].x > GRID_SIZE) {
                    SNACK_BODY[0].x = 1
                }
            } else {
                if (SNACK_BODY[0].x == 0) {
                    SNACK_BODY[0].x = GRID_SIZE
                }
            }
            if(inputDirection.y == 1) {
                if(SNACK_BODY[0].y > GRID_SIZE) {
                    SNACK_BODY[0].y = 1
                }
            } else {
                if(SNACK_BODY[0].y == 0) {
                    SNACK_BODY[0].y = GRID_SIZE
                }
            }
        }
    },
    DRAW(gameBoard) {
        SNACK_BODY.forEach((segment,index) => {
            const snackElem = document.createElement('div')
            snackElem.style.gridRowStart = segment.y
            snackElem.style.gridColumnStart = segment.x
            snackElem.classList.add('snack')
            if (index == 0) {
                snackElem.classList.add('snack-head')
            }
            
            if (SNACK_BODY.length !== 1 &&(SNACK_BODY.length - 1) == index) {
                snackElem.classList.add('snack-tail')
            }
            gameBoard.append(snackElem)
        })
    },
    EXPAND_SNACK(amount, score) {
        Sounds.foodSFX('play')
        SCORE.setScore(score)
        if (SCORE.getScore() >= SCORE.getHighScore()) {
            SCORE.setHighScore(score)
        }
        newSegment += amount
    },
    OnCollision(position, { ignoreHead = false } = {}) {
        return SNACK_BODY.some((segments, index) => {
            if(ignoreHead && index === 0) return false
            return position !== undefined ? this.SamePosition(segments, position) : true
        })
    },
    getHead() {
        return SNACK_BODY[0]
    },
    TOUCH_BODY() {
        return this.OnCollision(this.getHead(), {ignoreHead: true})
    },
    SamePosition(pos1, pos2) {
        return pos1.x === pos2.x && pos1.y === pos2.y
    },
    ADD_SEGMENT() {
        for (let i = 0; i < newSegment; i++) {
            SNACK_BODY.push({...SNACK_BODY[SNACK_BODY.length - 1]})
        }
        newSegment = 0
    }
}
