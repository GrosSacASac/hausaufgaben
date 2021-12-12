import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/10input.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n").filter(Boolean);

const pointsMap = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
}
const closing = Object.keys(pointsMap);
const opening = ["(", "[", "{", "<"];

let total = 0
lines.forEach(line => {
    let stack = [];
    const faultyCharacter = Array.from(line).find(c => {
        if (opening.includes(c)) {
            stack.push(c);
        } else {
            // do they match
            let lastOpened = stack[stack.length -1];
            if (opening.indexOf(lastOpened) === closing.indexOf(c)) {
                stack.pop();
            } else {
                // console.log("bad line")
                // console.log(line)  
                return true;
            }
        }
    });
    if (faultyCharacter) {
        total += pointsMap[faultyCharacter];
    }
})



console.timeEnd("Time");
console.log(total);

