import {input} from "./3input.js";


const lines = input.split("\n");

const speeds = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
];
const tree = `#`
let hits = Array.from(speeds).fill(0);
let xPositions = Array.from(speeds).fill(0)


lines.forEach(function (patternString, downDistance) {
    const {length} = patternString;
    
    speeds.forEach(function([speedLeft, speedDown], i) {
        if (downDistance % speedDown === 0) {
            if (patternString[xPositions[i] % length] === tree) {
                hits[i] +=1
            }
            xPositions[i] += speedLeft; 
        }
    })
});
const result = hits.reduce(function(previous, current) {
    return previous * current;
}, 1)
console.log(hits, result)