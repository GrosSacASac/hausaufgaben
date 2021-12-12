import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/8input.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n");

const both = lines.filter(Boolean).map(line => {
    const split = line.split(" | ");
    
    return split.map(words => {
        return words.split(" ").filter(Boolean).map(word => {
            const asLetters = Array.from(word);
            return asLetters.sort().join("")
        })
    });
});

// dddd
// e    a
// e    a
//  ffff
// g    b
// g    b
//  cccc

const originalMapHelpers =  [
    [1, "cf"],
    [7, "acf"],
    [8, "abcdefg"],
    [4, "bdcf"],
];


/*.map(([digit, letters]) => {
    return [digit, Array.from(letters).map(l => {
        return replacements[l];
    }).join("")]
});*/

const count = {}
let total = 0;

const everyLetterInside = (string1, string2) => {
    return Array.from(string2).every(letter => {
        return string1.includes(letter);
    })
}
both.forEach(([pattern, encodedNumber]) => {
    // console.log(pattern)
    const replacements = {
    };
    const indexMap = {
        // digit -> index in the pattern 

    }
    originalMapHelpers.forEach(([digit, chars]) => {
        pattern.some((demo, i) => {
            if (demo.length === chars.length) {
                indexMap[digit] = i;
                return true
            }
        });
    });
    
    // 9 is the only one that includes 4 and 7
    indexMap[9] = pattern.findIndex((demo) => {
        return demo.length === 6 &&
            everyLetterInside(demo, pattern[indexMap[4]]) &&
            everyLetterInside(demo, pattern[indexMap[7]]);
    });
    // 0 is not an 9 and includes a 7
    indexMap[0] = pattern.findIndex((demo, index) => {
        return demo.length === 6 &&
            index !== indexMap[9] &&
            everyLetterInside(demo, pattern[indexMap[7]]);
    });
    // 6 is not 9,0 and only remaining with length 6
    indexMap[6] = pattern.findIndex((demo, index) => {
        return demo.length === 6 &&
            index !== indexMap[9] &&
            index !== indexMap[0];
    });

    // 3 includes a 7
    indexMap[3] = pattern.findIndex((demo) => {
        return demo.length === 5 &&
            everyLetterInside(demo, pattern[indexMap[7]]);
    });
    // 5 is included inside 6
    indexMap[5] = pattern.findIndex((demo) => {
        return demo.length === 5 &&
            everyLetterInside(pattern[indexMap[6]], demo);
    });
    // 2 is the last remaining with length 5
    indexMap[2] = pattern.findIndex((demo, index) => {
        return demo.length === 5 &&
            index !== indexMap[5] &&
            index !== indexMap[3];
    });
    // console.log(`index: digit`);
    // Object.entries(indexMap).forEach(([key, value]) => {
    //     console.log(`${value}: ${Number(key)}`);
    // });

    const reverseMap = Object.fromEntries(Object.entries(indexMap).map(([key, value]) => {
        return [value, key];
    }));
    let numberString = ``;
    encodedNumber.forEach(encoded => {
        const indexInDemo = pattern.indexOf(encoded);
        const actualValue = reverseMap[indexInDemo];
        numberString = `${numberString}${actualValue}`;
        // console.log(actualValue)
    })
    // console.log(numberString);
    total += Number(numberString);
    
});


console.timeEnd("Time");
console.log(total);

