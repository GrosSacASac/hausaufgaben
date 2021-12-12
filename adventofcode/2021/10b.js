import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/10input.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n").filter(Boolean);

const pointsMap = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
}
const m = 5;
const closing = Object.keys(pointsMap);
const opening = ["(", "[", "{", "<"];

lines = lines.filter(line => {
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
    // if (faultyCharacter) {
    //     total += pointsMap[faultyCharacter];
    // }
    return !faultyCharacter;
});



const scores = lines.map(line => {
    let stack = [];
    const faultyCharacter = Array.from(line).find(c => {
        if (opening.includes(c)) {
            stack.push(c);
        } else {
            stack.pop();
        }
    });
    let score = 0;
    const needed = stack.map(openingC => {
        return closing[opening.indexOf(openingC)];
    }).reverse().forEach(c => {
        score *= m;
        score += pointsMap[c];
    })
    
    // if (faultyCharacter) {
    //     total += pointsMap[faultyCharacter];
    // }
    return score;
}).sort(function (a, b) {
    return a-b;
});

const middle = scores[(scores.length -1)/2]


console.timeEnd("Time");
console.log(scores);
console.log(middle);

