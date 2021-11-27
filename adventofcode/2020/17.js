import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(`${__dirname}/17input.txt`, 'utf-8')
const lines = input.split("\n").filter(Boolean)
console.time("Time")

const generations = 6;


const stringFromCoordinate = ([x,y,z]) => {
    return `${x},${y},${z}`
}
const coordinateFromString = (coordinateString) => {
    return coordinateString.split(",").map(Number)
}
const getNeightboursCoordinates = ([x, y, z]) => {
    const neightboursCoordinates = []
    for (let i = -1; i < 2; i += 1) {
        for (let j = -1; j < 2; j += 1) {
            for (let k = -1; k < 2; k += 1) {
                if (i === 0 && j === 0 && k === 0) {
                    continue;
                }
                neightboursCoordinates.push([x + i, y + j, z + k])
            }
        }
    }
    return neightboursCoordinates;
}
const getActiveNeighbours = (coordinate, state) => {
    return getNeightboursCoordinates(coordinate).reduce(function (previous, coordinate) {
        return previous + Number(Boolean(state.get(stringFromCoordinate(coordinate))))
    }, 0)
}

const nextGeneration = (state) => {
    const coordinatesToConsider = new Set()
    state.forEach(function(isAlive, coordinateString) {
        const coordinate = coordinateFromString(coordinateString)
        const neightboursCoordinates = getNeightboursCoordinates(coordinate)
        // console.log(neightboursCoordinates)

        neightboursCoordinates.forEach(value => {
            // convert to string to be able to remove duplicate
            coordinatesToConsider.add(stringFromCoordinate(value))
        })
    })
    const newState = new Map();
    coordinatesToConsider.forEach(coordinateString => {
        const isActive = Boolean(state.get(coordinateString));
        const coordinate = coordinateFromString(coordinateString);
        const activeNeighbours = getActiveNeighbours(coordinate, state);
        if (isActive) {
            if (activeNeighbours === 2 || activeNeighbours === 3) {
                newState.set(coordinateString, true) // remain active
            } else {
                // newState.set(coordinateString, false) // inactive (unset)
            }
        } else {
            if (activeNeighbours === 3) {
                newState.set(coordinateString, true) // become active
            }
        }

    })
    return newState;
}

const parseInitialInput = lines => {
    // const initialState = new Map([["4,5,7", true]]);
    const initialState = new Map();
    const alive = "#"
    const dead = "."
    
    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i]
        for (let j = 0; j < line.length; j += 1) {
            const isAlive = line[j] === alive;
            if (isAlive) {
                initialState.set(
                    stringFromCoordinate([i, j, 0]),
                    true
                );
            }
        }
    }
    return initialState
}
const initialState = parseInitialInput(lines);
let state = initialState;

for (let i = 0; i < generations; i+=1) {
    // console.log(state)
    state = nextGeneration(state)
}

// count alive at teh end
let count = 0
state.forEach(function(isAlive, coordinateString) {
    count += 1
})
console.timeEnd("Time")
// console.log(initialState)
console.log(count)
// console.log(state)