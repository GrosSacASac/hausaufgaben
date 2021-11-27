
import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* 
*/
const input = fs.readFileSync(`${__dirname}/12input.txt`, 'utf-8')
const instructions = input.split("\n").filter(Boolean)

let position = [0,0] 
let wayPointPosition = [10,-1] // right, vector down ,
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
    let rotation;
    if (action === moveTop) {
        wayPointPosition[1] -= value
    } else if (action === moveBottom) {
        wayPointPosition[1] += value
    } else if (action === moveLeft) {
        wayPointPosition[0] -= value
    } else if (action === moveRight) {
        wayPointPosition[0] += value
    }  else if (action === forward) {
        position[0] += value * wayPointPosition[0]
        position[1] += value * wayPointPosition[1]
    }  else if (action === turnLeft) {
        rotation = -value
    }  else if (action === turnRight) {
        rotation = value
    } 
    if (action === turnLeft || action === turnRight) {
        rotation = normalizeAngle(rotation)
        if (rotation === 90) {
            wayPointPosition = [-wayPointPosition[1], wayPointPosition[0]]
        }
        if (rotation === 180) {
            wayPointPosition = [-wayPointPosition[0], -wayPointPosition[1]]
        }
        if (rotation === 270) {
            wayPointPosition = [wayPointPosition[1], -wayPointPosition[0]]
        }
    }
}
const travel = function () {
    instructions.forEach(instruction => {
        const action = instruction.substring(0, 1)
        const value = Number(instruction.substring(1))
        executeActionValue(action, value)
        console.log(action , value)
        // console.log(position, wayPointPosition)
    })
}
const manhattanDistance = function (position) {
    return Math.abs(position[0]) + Math.abs(position[1])
}
travel()

console.timeEnd("Time")
console.log("distance", manhattanDistance(position))
