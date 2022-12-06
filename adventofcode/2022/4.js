import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/4input.txt`, 'utf-8');
console.time("Time");
const lines = input.split("\n").filter(Boolean);


const pairFromLine = (line) => {
    return line.split(",").map(pairString => {
        return pairString.split("-").map(Number);
    })
};

const doesPairContain = (pair, pairb) => {
    return pair[0] <= pairb[0] && pair[1] >= pairb[1];
};

const doesOnePairContainTheOther = (pairs) => {
    const [pair, pairb] = pairs;
    return doesPairContain(pair, pairb) || doesPairContain(pairb, pair); 
};

const doesPairOverlap = (pair, pairb) => {
    //2-4 1-2
    return (pair[0] <= pairb[0] && pair[1] >= pairb[0]) || //1-2 2-2  
           (pair[0] >= pairb[0] && pair[0] <= pairb[1]);  //2-2 1-2
};

const doesOnePairOverlap = (pairs) => {
    const [pair, pairb] = pairs;
    return doesPairOverlap(pair, pairb) || doesPairOverlap(pairb, pair); 
};


const pairs = lines.map(pairFromLine);
const result  = pairs.map(doesOnePairContainTheOther).reduce((total, bool) => {
    return total + Number(bool);
}, 0)
const resultb  = pairs.map(doesOnePairOverlap).reduce((total, bool) => {
    return total + Number(bool);
}, 0)

console.timeEnd("Time");
console.log(result);
console.log(resultb);
