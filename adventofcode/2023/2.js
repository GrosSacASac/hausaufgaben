import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/2input.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n");
const redMax = 12;
const greenMax = 13;
const blueMax = 14;
const maxDict = {
    blue: blueMax,
    red: redMax,
    green: greenMax,
}

let current = 0;
lines.forEach(line => {
    if (!line) {
        return;
    }
    let possible = true;
    const [gameIdString, gameData] = line.split(":");
    const [GAME, Id]  = gameIdString.split(" ");
    const sets = gameData.split(";");
    sets.forEach(function (set) {
        const colorsShown = set.split(",");
        colorsShown.forEach(function(colorShown) {
            const [ numberString, color ] = colorShown.trim().split(" ");
            const localMax = maxDict[color];
            const number = Number(numberString);
            if (number > localMax) {
                possible = false;
            }
        });
    });
    if (possible) {
        console.log(Id);
        current += Number(Id);
    }

});


console.timeEnd("Time");
console.log({current});
