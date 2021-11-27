import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* 
--- Part Two ---
The final step in breaking the XMAS encryption relies on the invalid number you just found: you must find a contiguous set of at least two numbers in your list which sum to the invalid number from step 1.

Again consider the above example:

35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576

In this list, adding up all of the numbers from 15 through 40 produces the invalid number from step 1, 127. (Of course, the contiguous set of numbers in your actual list might be much longer.)

To find the encryption weakness, add together the smallest and largest number (can be in the middle) in this contiguous range; in this example, these are 15 and 47, producing 62.

What is the encryption weakness in your XMAS-encrypted list of numbers?
*/
const input = fs.readFileSync(`${__dirname}/9input.txt`, 'utf-8')
const numbers = input.split("\n").filter(Boolean).map(Number)
console.time("Time")

const preambleLength = 25

// returns the sum of the numbers in the array
// the worst sum function that works
// but it does work !
const calculateSum = (x) => {
    const [n, ...rest] = x;
    if (!rest.length) {
        return n;
    }
    return n + calculateSum(rest);
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
numbers.find((number, i) => {
    let sum = 0;
    let additions = 0;
    while (sum < myNumber) {
        additions += 1
        sum += calculateSum(numbers.slice(i, i + additions));
    }
    if (sum === myNumber) {
        // console.log(`sum found ${sum}`)
        // console.log(`additions ${additions} i ${i}`)
        smallest = Math.min(...numbers.slice(i, i + additions))
        biggest = Math.max(...numbers.slice(i, i + additions))
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