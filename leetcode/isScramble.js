/**
 * We can scramble a string s to get a string t using the following algorithm:

    If the length of the string is 1, stop.
    If the length of the string is > 1, do the following:
        Split the string into two non-empty substrings at a random index, i.e., if the string is s, divide it to x and y where s = x + y.
        Randomly decide to swap the two substrings or to keep them in the same order. i.e., after this step, s may become s = x + y or s = y + x.
        Apply step 1 recursively on each of the two substrings x and y.

Given two strings s1 and s2 of the same length, return true if s2 is a scrambled string of s1, otherwise, return false.
*/
const scramble = (string, seed=[]) => {
    if (string.length <= 1) {
        return string;
    }
    const randomIndexSplit = randomInteger(1, string.length, seed);
    const substringA = string.substring(0, randomIndexSplit);
    const substringB = string.substring(randomIndexSplit, string.length);
    const scrambleSubstringA = scramble(substringA, seed);
    const scrambleSubstringB = scramble(substringB, seed);
    const randomSwap = randomBoolean(seed);
    if (randomSwap) {
        return scrambleSubstringA + scrambleSubstringB;
    }
    return scrambleSubstringB + scrambleSubstringA;
};

let t=0;
let stbh=0;
var randomInteger = (min, max, seed) => {
    t+=1;
    let r = Math.random();
    if (seed) {
        if (seed.length) {
            r = Math.min(Math.max(seed.pop(), 0.0001), 0.9999);
        } else {
            stbh +=1
        }
    }
    return min + Math.floor(r * (max - min));
}

var randomBoolean = (seed) => {
    return Boolean(randomInteger(0, 2, seed));
}
/*
* @param {string} s1
* @param {string} s2
* @return {boolean}
*/
var isScramble = function(s1, s2) {
    let possibilities = (s1.length - 1) * 2;
    // Math.log2(possibilities)+1
    for (let i = 0; i < 2**possibilities; i += 1) {
        let binary = i.toString(2).padStart(possibilities, "0");
        let seed = Array.from(binary).map(Number);
        const possibleScramble = scramble(s1, seed);
        if (possibleScramble === s2) {
            return true;
        }
    }
    
    return false;
};


// for (let i = 0; i < 2**8; i += 1) {
//     let binary = i.toString(2).padStart(8, "0");
//     console.log(binary);
// }
// let seed = Array(10000).fill(0)
// console.log(t)
// console.log(scramble("great", seed));

    
console.log(isScramble("great", "rgeat"));
console.log(isScramble("abcde", "caebd"));
console.log(isScramble("a", "a"));