
import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* 
*/
const input = fs.readFileSync(`${__dirname}/12input.txt`, 'utf-8')
const instructions = input.split("\n").filter(Boolean)

let rotation = 90; // starting facing top from left to right
let position = [0,0] // vector down , right
const moveTop = "N"
const moveBottom = "S"
const moveRight = "E"
const moveLeft = "W"
const turnLeft = "L"
const turnRight = "R"
const forward = "F"
console.time("Time")

const normalizeAngle = (rotation) => {
    let normalized =  rotation %360
    if (normalized >= 0) {
        return normalized
    }
    return normalizeAngle(rotation + 360)
}

const executeActionValue = function(action, value) {
    if (action === moveTop) {
        position[1] -= value
    } else if (action === moveBottom) {
        position[1] += value
    } else if (action === moveLeft) {
        position[0] -= value
    } else if (action === moveRight) {
        position[0] += value
    }  else if (action === turnLeft) {
        rotation -= value
        rotation = normalizeAngle(rotation)
    }  else if (action === turnRight) {
        rotation += value
        rotation = normalizeAngle(rotation)
    }  else if (action === forward) {
        let translatedAction;
        if (rotation === 90) {
            translatedAction = moveRight
        } else if (rotation == 180) {
            translatedAction = moveBottom
        } else if (rotation == 270) {
            translatedAction = moveLeft
        } else if (rotation == 0) {
            translatedAction = moveTop
        } else {
            console.error(rotation)
            throw rotation
        }
        executeActionValue(translatedAction, value)
    } 
}
const travel = function () {
    instructions.forEach(instruction => {
        const action = instruction.substring(0, 1)
        const value = Number(instruction.substring(1))
        executeActionValue(action, value)
        console.log(action , value)
        console.log(position, rotation)
    })
}
const manhattanDistance = function (position) {
    return Math.abs(position[0]) + Math.abs(position[1])
}
travel()

console.timeEnd("Time")
console.log("distance", manhattanDistance(position))
