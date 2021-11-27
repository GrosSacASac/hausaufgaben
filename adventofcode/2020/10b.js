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

let possibilities = 1
const {length} = numbers
const findPossibilities = (previousJolt, start) => {
    for (let i = start; i < length; i +=1) {
        const jolt = numbers[i]
        if (previousJolt === -1) {
            previousJolt = jolt
            continue
        }
        const diff = jolt - previousJolt;
        if (diff === 1) {
            const nextJolt= numbers[i+1]
            if (nextJolt - previousJolt === 2) {
                possibilities += 1
                findPossibilities(-1, i+1)
                if (numbers[i+2] -previousJolt === 3 ) {
                    possibilities += 1
                    findPossibilities(-1, i+2)

                }
            }
        }
        if (diff === 2) {
            const nextJolt= numbers[i+1]
            if (nextJolt - previousJolt === 3) {
                possibilities += 1
                findPossibilities(undefined, i+1)
            }
        }
        previousJolt = jolt

    }
}
findPossibilities(-1, 0)
console.timeEnd("Time")
// console.log(numbers)
console.log(`possibilities (should be 8 or 19208 for testinput) ${possibilities}
            `);