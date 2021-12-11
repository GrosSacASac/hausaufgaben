import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/888input.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n");
const helpers = [];
const patterns = lines.filter(Boolean).map(line => {
    const split = line.split(" | ");
    helpers.push(split[0])
    return split[1];
});

// dddd
// e    a
// e    a
//  ffff
// g    b
// g    b
//  cccc
// todo, deduce replament on every line using the helpers

//  const replacements = Object.fromEntries(Object.entries(replacementsA).map(([key, value]) => {
//     return [value, key];
// }));
const originalMapHelpers =  [
    [1, "cf"],
    [7, "acf"],
    [8, "abcdefg"],
    [4, "bdcf"],
];
const originalMap = [
    [0, "abcefg"],
    [2, "acdeg"],
    [3, "acdfg"],
    [5, "abdfg"],
    [6, "abdefg"],
    [9, "abcdfg"],
].concat(originalMapHelpers);

/*.map(([digit, letters]) => {
    return [digit, Array.from(letters).map(l => {
        return replacements[l];
    }).join("")]
});*/

const count = {}
let total = 0;

patterns.forEach((pattern, j) => {
    const replacements = {
    };
    const words = pattern.split(" ").filter(Boolean);
    const helperWords = helpers[j].split(" ").filter(Boolean);
    helperWords.forEach(word => {
        originalMapHelpers.some(([digit, chars]) => {
            if (chars.length === word.length) {
                for (let i = 0; i < word.length; i += 1) {
                    
                    for (let k = 0; k < word.length; k += 1) {
                        // replacements[word[i]] = `${replacements[word[i]] || ''} | ${chars[k]}`
                    }
                }
                return true
            }
        });
    });
    
    console.log(replacements);
    const mapForLine = originalMap.map(([digit, letters]) => {
        return [digit, Array.from(letters).map(l => {
            return replacements[l];
        }).join("")]
    });
    console.log(mapForLine);
    words.forEach(word => {
        const digit = mapForLine.find(([digit, chars]) => {
            if (chars.length === word.length) {
                return Array.from(word).every(l => {
                    return chars.includes(l)
                })
            }
        });
        console.log(digit?.[0])
    })
});


console.timeEnd("Time");
// console.log(count);

