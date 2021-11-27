import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* 

*/
const input = fs.readFileSync(`${__dirname}/10input.txt`, 'utf-8')
const numbers = input.split("\n").filter(Boolean).map(Number)
console.time("Time")

const deviceBuiltin = Math.max(...numbers) + 3
const chargingOutlet = 0
numbers.push(deviceBuiltin, chargingOutlet)
numbers.sort(function(a, b) {
    return a -b
})

let numbers1 = 0
let numbers3 = 0
numbers.forEach((jolt, i) => {
    let previousJolt = numbers[i-1]
    if (previousJolt === undefined) {
        return
    }
    const diff = jolt - previousJolt;
    if (diff === 3) {
        numbers3 += 1
    }
    if (diff === 1) {
        numbers1 += 1
    }

})

console.timeEnd("Time")
console.log(numbers)
console.log(`numbers1, numbers3 
    `);
    console.log({numbers1, numbers3});
        console.log(` numbers1 * numbers3 ${numbers1 * numbers3}
            `);