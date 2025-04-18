import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = fs.readFileSync(`${__dirname}/7input.txt`, 'utf-8');

console.time("Time");


const calibrationEquations = input.trim().split("\n").map(line => {
    if (!line) {
        return;
    }
    const [resultS, factorsS] = line.split(":");
    const result = Number(resultS);
    const factors = factorsS.trim().split(" ").filter(Boolean).map(Number);
    return [result, factors];
});


const operators = ["+", "*"];

const solva = (calibrationEquations) => {
    let total = 0;
    calibrationEquations.forEach(([result, factors]) => {
        // use operators, * has no priority, try every combination
        if (eval(factors.map(String).join("*")) === result) { 
            total += result;
        }
    });
    return total;
};

const total = solva(calibrationEquations);
console.timeEnd("Time");
console.log(total);
