import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/6input.txt`, 'utf-8');
console.time("Time");

let found = false;
let i = 0;
const size= 14//4
while (!found && i < input.length) {
    const last4 = input.substring(i, i+size);
    const asSet = new Set(last4);
    if (asSet.size === size) {
        found = i + size
    }
    i+=1;

}


console.timeEnd("Time");
console.log(found);
