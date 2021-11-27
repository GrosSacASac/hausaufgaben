
import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* 
use bigint for 36 bit bitwise operations
*/
const input = fs.readFileSync(`${__dirname}/14input.txt`, 'utf-8')
const instructions = input.split("\n").filter(Boolean)
console.time("Time")
let currentMask
const maskPrefix = "mask = "
const binaryPrefix = "0b"
const regex = /[0-9]+/g
const adressSpace = new Map();
const bitSize = 36;
const ignore = "X"
instructions.forEach(instruction => {
    if (instruction.startsWith(maskPrefix)) {
        currentMask = Array.from(instruction.substr(maskPrefix.length))
        // console.log(currentMask)
        return
    }
    // mem[9822] = 2044
    const [adress, initialValue] = instruction.match(regex)
    // console.log(adress, initialValue)
    let value = BigInt(initialValue)
    currentMask.forEach((letter, i) => {
        if (letter === ignore){
            return
        }
        const position = bitSize - i
        if (letter === "1"){
            // craft a 100000... and OR it
            const partialMask = BigInt(`${binaryPrefix}1${"0".repeat(position - 1)}`)
            value = value | partialMask
            return
        }
        if (letter === "0"){
            // craft a 1111101111111... and AND it
            const partialMask = BigInt(`${binaryPrefix}${"1".repeat(i)}0${"1".repeat(position - 1)}`)
            value = value & partialMask
            return
        }
    })
    adressSpace.set(adress, value)
})

let sum = Array.from(adressSpace.values()).reduce((previous, current) => {
    // console.log(current)
    // console.log(current.toString(2))
    return previous + current
}, 0n)

console.timeEnd("Time")
// console.log(adressSpace)
// console.log(Number.MAX_SAFE_INTEGER)
// const x =2**36-1
// // console.log(x)
// console.log(x.toString(2))
// console.log((x ^ 1).toString(2))
// console.log((x | 0).toString(2))
// const y =2**31-1
// console.log(y.toString(2))
// console.log((y ^ 1).toString(2))
// const z =2n**36n-1n
// console.log(z.toString(2))
// console.log((z ^ 1n).toString(2))
// console.log(x.toString(2).length)
console.log()
console.log("sum", sum)

