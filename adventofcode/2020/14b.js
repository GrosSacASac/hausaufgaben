
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

const createPossibilities = (initialNumber, variablePositions, index=0) => {
    if (index >= variablePositions.length) {
        return initialNumber
    }
    const position = variablePositions[index]
    return ["0" , "1"].map(bitValue => {

        if (bitValue === "1"){
            // craft a 100000... and OR it
            const partialMask = BigInt(`${binaryPrefix}1${"0".repeat(position - 1)}`)
            // console.log(initialNumber, initialNumber | partialMask)
            return  createPossibilities(initialNumber | partialMask, variablePositions, index + 1)
        }
        if (bitValue === "0"){
            // craft a 1111101111111... and AND it
            const partialMask = BigInt(`${binaryPrefix}${"1".repeat(bitSize - position)}0${"1".repeat(position - 1)}`)
            // console.log("partialMask")
            // console.log(partialMask.toString(2))
            return  createPossibilities(initialNumber & partialMask, variablePositions, index + 1)
        }
    }).flat()
    
}


instructions.forEach(instruction => {
    if (instruction.startsWith(maskPrefix)) {
        currentMask = Array.from(instruction.substr(maskPrefix.length))
        // console.log(currentMask)
        return
    }
    // mem[9822] = 2044
    const [adress, initialValue] = instruction.match(regex)
    const floating = []
    // console.log(adress, initialValue)
    let valueToSave = BigInt(initialValue)
    let value = BigInt(adress)
    currentMask.forEach((letter, i) => {
        const position = bitSize - i
        if (letter === ignore){
            floating.push(position)
            return
        }
        if (letter === "1"){
            // craft a 100000... and OR it
            const partialMask = BigInt(`${binaryPrefix}1${"0".repeat(position-1)}`)
            value = value | partialMask
            return
        }
        if (letter === "0"){
            return
        }
    })
    const possiblities = createPossibilities(value, floating)
    // possiblities.map(x => {
    //     console.log((x).toString(2))
    
    // })
    possiblities.forEach(value => {
        adressSpace.set(value, valueToSave)
    })
    // console.log(floating)
})

let sum = Array.from(adressSpace.values()).reduce((previous, current) => {
    return previous + current
}, 0n)

console.timeEnd("Time")
// const z =2n**36n-1n
// console.log(z.toString(2))
// console.log((z ^ 1n).toString(2))
// console.log(x.toString(2).length)

// console.log("debug")
// const possiblities = createPossibilities(z, [1,5])
// console.log(possiblities)
// possiblities.map(x => {
//     // console.log((x))
//     console.log((x).toString(2))

// })
// console.log(current.toString(2))
// console.log()
console.log("sum", sum)

