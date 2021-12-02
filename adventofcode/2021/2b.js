import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/2input.txt`, 'utf-8')
console.time("Time")
let lines = input.split("\n")
const orders = lines.filter(Boolean).map(rawLine => {
    return rawLine.trim();
}).filter(Boolean);

let x = 0;
let y = 0;
let aim = 0;

orders.forEach(order => {
    const [verb, quantity] = order.split(" ");
    const asNumber = Number(quantity);
    if (verb === "forward") {
        x += asNumber;
        y += -(aim * asNumber);
    } else if (verb === "up") {
        aim -= asNumber;
    } else if (verb === "down") {
        aim += asNumber;
    }
});

const depth = -y;

console.timeEnd("Time")
console.log(x, depth, x*depth)
