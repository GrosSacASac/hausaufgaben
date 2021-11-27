import {input} from "./3input.js";


const lines = input.split("\n");

let hits = 0;
const speedLeft = 3;
const tree = `#`
let xPosition = 0

lines.forEach(function (patternString) {
    const {length} = patternString;
    if (patternString[xPosition % length] === tree) {
        hits +=1
    }
    xPosition += speedLeft;
});
console.log(hits)