import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/3input.txt`, 'utf-8');
console.time("Time");


const states = {
    M: "m",
    U: "u",
    L: "L",
    LEFTP: "(",
    POSTCOMMA: ",",
    OTHER: "OTHER"
};
let state = states.OTHER;
let c = "";
let i = 0;
// mul(a,b)
let a;
let aString = ""; //while reading string we add character by character
let b;
let bString = "";
let sum = 0;

do {
    c = input[i];
    if (state === states.OTHER && c === "m") {
        state = states.M;
    } else if (state === states.M) {
        if (c === "u") {
            state = states.U;
        } else {
            state = states.OTHER;
        }
    } else if (state === states.U) {
        if (c === "l") {
            state = states.L;
        } else {
            state = states.OTHER;
        }
    } else if (state === states.L) {
        if (c === "(") {
            state = states.LEFTP;
        } else {
            state = states.OTHER;
        }
    } else if (state === states.LEFTP) {//start of numbers, or middle of numbers from a
        const asNumber = Number(c);
        if (Number.isFinite(asNumber)) {
            aString += c;
        } else {
            if (c === ",") {
                if (aString === "") {
                    state = states.OTHER;
                } else {
                    a = Number(aString);
                    state = states.POSTCOMMA;
                }
            } else {
                state = states.OTHER;
            }
            aString = "";
        }
    } else if (state === states.POSTCOMMA) {//start of second numbers, or middle of numbers from b
        const asNumber = Number(c);
        if (Number.isFinite(asNumber)) {
            bString += c;
        } else {
            if (c === ")") {
                if (bString === "") {
                } else {
                    b = Number(bString);
                    sum += a * b;
                    a = undefined;
                    b = undefined;
                }
            }
            bString = "";
            state = states.OTHER;
        }
    }
    i += 1;
} while (i < input.length);


console.timeEnd("Time");
console.log({sum});
