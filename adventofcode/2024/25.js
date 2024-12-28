import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/25input.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n");

const keys = [];
const locks = [];
let keyHeight = 0;

const STATES = {
    NOTHING: 0,
    KEY: 1,
    LOCK: 2,
}
let state = STATES.NOTHING; 
let currentKey;
let currentLock;

lines.forEach((line) => {
    const trimmed = line.trim();
    if (state === STATES.NOTHING) {
        if (trimmed === "#".repeat(trimmed.length)) {
            state = STATES.LOCK;
            currentLock = [];
            currentLock.length = trimmed.length;
            currentLock.fill(0);
            keyHeight = -1;
        } else /* condition ?*/{
            state = STATES.KEY;
            currentKey = [];
            currentKey.length = trimmed.length;
            currentKey.fill(-1);
        }
    } else if (trimmed === "") {
        if (state === STATES.KEY) {
            keys.push(currentKey);
        } else if (state === STATES.LOCK) {
            locks.push(currentLock);
        }
        state = STATES.NOTHING;
    } else if (state === STATES.KEY) {
        Array.from(trimmed).forEach((c, i) => {
            if (c === "#") {
                currentKey[i] += 1;
            }
        });
    } else if (state === STATES.LOCK) {
        keyHeight += 1;
        Array.from(trimmed).forEach((c, i) => {
            if (c === "#") {
                currentLock[i] += 1;
            }
        });
    }
});

let keyMatch = 0;

keys.forEach((key) => {
    locks.forEach((lock) => {
        keyMatch += Number(lock.every((lockPart, partNumber) => {
            return lockPart + key[partNumber] <= keyHeight;
        }));
    });
});
console.timeEnd("Time");
console.log(currentKey);
console.log(currentLock);
console.log("keys");
console.log(keys);
console.log("locks");
console.log(locks);
console.log({keyHeight});
console.log({keyMatch});
