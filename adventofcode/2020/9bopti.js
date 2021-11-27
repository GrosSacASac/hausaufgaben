import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* 

*/
const input = fs.readFileSync(`${__dirname}/9input.txt`, 'utf-8')
const numbers = input.split("\n").filter(Boolean).map(Number)
console.time("Time")

const preambleLength = 25
const calculateSum = (x) => {
    const [n, ...rest] = x
    if (!rest.length) {
        return n
    }
    return n + calculateSum(rest)
};

const findSum = (array, target) => {
    return array.some(a => {
        return array.some(b => {
            return (a !== b) && (a + b === target);
        });
    });
};

const myNumber = numbers.find((number, i) => {
    if (i < preambleLength) {
        return; // still in preamble
    }
    const foundSum = findSum(
        numbers.slice(i - preambleLength, i),
        number
    )
    return !foundSum

})

let biggest = 0;
let smallest = 0;
numbers.some((number, i) => {
    let sum = 0;
    let additions = 0;
    while (sum < myNumber) {
        additions += 1
        sum += numbers[i + additions];
    }
    if (sum === myNumber) {
        // console.log(`sum found ${sum}`)
        // console.log(`additions ${additions} i ${i}`)
        const range = numbers.slice(i, i + additions)
        smallest = Math.min(...range)
        biggest = Math.max(...range)
        // for (let j = i + 1; j <= i + additions; j += 1) {
        //     console.log(`sum[${i}: ${j}] = ${calculateSum(numbers.slice(i, j))}`)
        // }
        return true
    } else {
        // console.log(`sum too hight ${sum} , additions ${additions}`)
    }
})
console.timeEnd("Time")
console.log(`myNumber ${myNumber}
    `);
    console.log({smallest, biggest});
        console.log(` smallest + biggest ${smallest+ biggest}
            `);