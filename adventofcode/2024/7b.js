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


const operators = ["+", "*", "concat"];

const solva = (calibrationEquations) => {
    let total = 0;
    calibrationEquations.forEach(([result, factors]) => {
        // use operators, * has no priority, try every combination
        const currentResults = [factors[0]];
        factors.forEach((factor, i) => {
            currentResults.forEach((currentResult, j) => {
                if (i !== 0) {
                    operators.forEach((operator, b) => {
                        let newResult;
                        if (operator === "concat") {
                            newResult = Number(`${currentResult}${factor}`);
                        } else {
                            newResult = eval(`${currentResult} ${operator} ${factor}`);
                        }
                        
                        if (b) {
                            currentResults.push(newResult);
                        } else {
                            currentResults[j] = newResult
                        } 
                        
                    });
                }
            });
        });
        // console.log(currentResults)
        const has1Result = currentResults.some((r) => {
            return r === result;
        })
        if (has1Result) { 
            total += result;
        }
    });
    return total;
};

const total = solva(calibrationEquations);
console.timeEnd("Time");
console.log(total);
