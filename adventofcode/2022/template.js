import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/xinput.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n");

const l = lines.filter(Boolean);

const x = (a) => {
    
};


console.timeEnd("Time");
console.log(result);