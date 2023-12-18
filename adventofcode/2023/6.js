import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let day = ``;
Array.from(__filename.split(__dirname)[1]).forEach(function (c) {
    if (Number.isFinite(parseInt(c))) {
        day = `${day}${c}`;
    }
});
const input = fs.readFileSync(`${__dirname}/${day}input.txt`, 'utf-8');
console.time("Time");



let [times, distances] = input.split("\n");
times = times.split(":")[1].split(" ").map(Number).filter(Boolean);
distances = distances.split(":")[1].split(" ").map(Number).filter(Boolean);
let solveA = 1;
const accelerationPms = 1;
times.forEach(function (time, i) {
    const record = distances[i];
    let waysToBreakThatRecord = 0;
    // make simulation
    for (let holdTime = 1; holdTime < time; holdTime += 1) {
        const timeLeft = time - holdTime;
        const speed = accelerationPms * holdTime;
        const distance = speed * timeLeft;
        if (distance > record) {
            waysToBreakThatRecord += 1;
        }
    }
    // console.log(waysToBreakThatRecord);
    solveA *= waysToBreakThatRecord;
})
console.timeEnd("Time");
console.log(times, distances);
console.log(solveA);