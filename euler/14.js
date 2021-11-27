// https://projecteuler.net/problem=14
/*


The following iterative sequence is defined for the set of positive integers:

n → n/2 (n is even)
n → 3n + 1 (n is odd)

Using the rule above and starting with 13, we generate the following sequence:
13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
3 10 5 16 8 4 2 1

It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.

Which starting number, under one million, produces the longest chain?

NOTE: Once the chain starts the terms are allowed to go above one million.

*/

const memoizeAsStrings = function (functionToMemoize, separator = `-`) {
    /* joins together the args as strings to
    decide if arguments are the same
    fast memoizer
    but infinitely growing */

    const previousResults = {};
    return function (...args) {
        const argumentsAsStrings = args.map(String).join(separator);
        /*
        without .map(String) works but undefined and null become empty strings
        const argumentsAsStrings = args.join(separator);
        */
        if (!Object.prototype.hasOwnProperty.call(previousResults, argumentsAsStrings)) {
            // not yet in cache
            previousResults[argumentsAsStrings] = functionToMemoize(...args);
        }
        return previousResults[argumentsAsStrings];
    };
};

const getNext = (x) => {
    if (x % 2 === 0) {
        return x / 2;
    }
    return 3 * x + 1;
}

const getChainLength = memoizeAsStrings((x) => {
    if (x === 1) {
        return 1;
    }
    return 1 + getChainLength(getNext(x))
})

const getStartingNumberWithBiggestChainLength = (MAX) => {
    let maxStarting = 0;
    let maxChainLength = 0
    
    for (let i = 1; i < MAX; i += 1) {
        const chainLength = getChainLength(i);
        if (chainLength > maxChainLength) {
            maxChainLength = chainLength;
            maxStarting = i
        }
    }
    // console.log(`answer ${maxStarting}, chain length ${maxChainLength}`)
    return maxStarting;
}


const MAX = 10 ** 6
console.time("time")
const asnwer = getStartingNumberWithBiggestChainLength(MAX)
console.timeEnd("time")
console.log(`answer ${asnwer}`)
