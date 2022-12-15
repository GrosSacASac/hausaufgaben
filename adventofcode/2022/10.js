import fs from "node:fs";
import url from "node:url";
import path from "node:path";
// node ./adventofcode/2022/10.js > 10.txt

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/10input.txt`, 'utf-8');
console.time("Time");
const lines = input.split("\n").filter(Boolean);
const width = 40;
const height = 6;
let  pixelCursorPosition = 0;
let x = 1;
const notable = [20,60, 100,140,180,220]

let signalStrength ;
let result = 0;
let cycleNumber = 0;


const note = (cycleNumber, x) => {
    if (notable.includes(cycleNumber)) {
        signalStrength = x * (cycleNumber);
        result += signalStrength;
    }

}
let crtRow=``;
const printLine = (x) => {
    if (pixelCursorPosition === 0) {
        console.log(crtRow)
        crtRow = ``;
    }
    let c = `.`;
    if (pixelCursorPosition >= x -1 && pixelCursorPosition <= x + 1) {
        c = `#`;
    }
    crtRow = `${crtRow}${c}`;
    pixelCursorPosition = (pixelCursorPosition + 1) % width;

}
for (let i = 0; i < notable.at(-1) +1; i += 1) {
    const line = lines[i];
    printLine(x);
    cycleNumber += 1;
    note(cycleNumber, x);
    let xduring = x
    if (line && !line.startsWith("noop")) {
        
        const [addInstruction, numberS] = line.split(" ");
        const number = Number(numberS);
        printLine(x);
        cycleNumber += 1;
        note(cycleNumber, x);
        x += number;
    }
    if (!line) {
        break;
    }
}


console.timeEnd("Time");
console.log(result);
