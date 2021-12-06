import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/6input.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n");
const fish = lines[0].split(",").map(Number).filter(Boolean);

const period = 7;
const initial = 8;

// from utilsac
// speed X 8
const memoizeAsStrings = function (functionToMemoize, separator = `-`) {
    /* joins together the args as strings to
    decide if arguments are the same
    fast memoizer
    but infinitely growing */

    const previousResults = new Map();
    return function (...args) {
        const argumentsAsStrings = args.map(String).join(separator);
        /*
        without .map(String) works but undefined and null become empty strings
        const argumentsAsStrings = args.join(separator);
        */
        if (!previousResults.has(argumentsAsStrings)) {
            // not yet in cache
            previousResults.set(argumentsAsStrings, functionToMemoize(...args));
        }
        return previousResults.get(argumentsAsStrings);
    };
};

const fishCountAfterDaysForOneFish = memoizeAsStrings((initialState, days) => {
    if (initialState > days - 1) {
        return 1;
    }
    return fishCountAfterDaysForOneFish(period -1, days - initialState - 1) + fishCountAfterDaysForOneFish(initial, days - initialState -1);
});

const daysPassingBy = 256; // part 1 is 80
const evolution = fish.map(initialStateOfFish => {
    return fishCountAfterDaysForOneFish(initialStateOfFish, daysPassingBy);
})
const total = evolution.reduce((sum, v) => {
    return sum + v;
}, 0);
console.timeEnd("Time");
// console.log(fishCountAfterDaysForOneFish(1,80));
// console.log("initialFishPool", fish);
// console.log("evolution", evolution);
console.log(total);

