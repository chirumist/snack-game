import { getInputDirection } from './input.js'
import { SCORE } from './scores.js'

const SNACK_BODY = [{ x: 11, y: 11 }]
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
        SNACK_BODY[0].x += inputDirection.x
        SNACK_BODY[0].y += inputDirection.y
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
    EXPAND_SNACK(amount) {
        SCORE.setScore(amount)
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