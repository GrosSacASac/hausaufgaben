import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/1input.txt`, 'utf-8')
console.time("Time")
let lines = input.split("\n")
const numbers = lines.filter(Boolean).map(rawLine => {
    return rawLine.trim();
}).map(Number).filter(Boolean);

let a = 0;
let b = 0;

numbers.some((n1, i) => {
    for (let j = i + 1;  j <numbers.length; j+=1) {
      const n2 = numbers[j];
      if (n1+n2===2020){
        a = n1
        b = n2
        return true
      }  
    }
})

const result = a * b
console.log(result)