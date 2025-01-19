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
    // handle do()
    D: "d",
    O: "o",
    LEFTPDO: "do(",
    // don't()
    N: "N",
    APOSTROPHE: "'",
    T: "T",
    LEFTPDONT: "dont(",

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
let dontMode = false;
let reevaluate = false; // go back 1 letter when going back to states OTHER
// important in case of mul(5do()) 
// where mul is invalid because of the d, but we have to reevalute the d to enter a state where we can confirm
// the do

do {
    c = input[i];
    if (state === states.OTHER) {
        if (c === "m") {
            state = states.M;
        } else if (c === "d") {
            state = states.D;
        }
    } else if (state === states.M) {
        if (c === "u") {
            state = states.U;
        } else {
            reevaluate = true;
            state = states.OTHER;
        }
    } else if (state === states.U) {
        if (c === "l") {
            state = states.L;
        } else {
            reevaluate = true;
            state = states.OTHER;
        }
    } else if (state === states.L) {
        if (c === "(") {
            state = states.LEFTP;
        } else {
            reevaluate = true;
            state = states.OTHER;
        }
    } else if (state === states.LEFTP) { //start of numbers, or middle of numbers from a
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
                reevaluate = true;
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
                    if (!dontMode) {
                        sum += a * b;
                    }
                }
            } else {
                reevaluate = true;
            }
            a = undefined;
            b = undefined;
            bString = "";
            state = states.OTHER;
        }
    } else if (state === state.D) {
        if (c === "o") {
            state = states.O;
        } else {
            reevaluate = true;
            state = states.OTHER;
        }
    } else if (state === state.O) {
        if (c === "(") {
            state = states.LEFTPDO;
        } else if (c === "n") {
            state = states.N;
        } else {
            reevaluate = true;
            state = states.OTHER;
        }
    } else if (state === states.LEFTPDO) {
        if (c === ")") {
            dontMode = false;
        } else {
            reevaluate = true;
        }
        state = states.OTHER
    } else if (state === states.N) {
        if (c === "'") {
            state = states.APOSTROPHE;
        } else {
            reevaluate = true;
            state = states.OTHER;
        }
    } else if (state === states.APOSTROPHE) {
        if (c === "t") {
            state = states.T;
        } else {
            reevaluate = true;
            state = states.OTHER;
        }
    } else if (state === states.T) {
        if (c === "(") {
            state = states.LEFTPDONT;
        } else {
            reevaluate = true;
            state = states.OTHER;
        }
    } else if (state === states.LEFTPDONT) {
        if (c === ")") {
            dontMode = true;
        } else {
            reevaluate = true;
        }
        state = states.OTHER;
    }
    i += 1;
    if (reevaluate) {
        i -= 1;
    }
    reevaluate = false;
} while (i < input.length);


console.timeEnd("Time");
console.log({sum});
