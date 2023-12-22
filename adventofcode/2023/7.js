import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let day = ``;
Array.from(__filename.split(__dirname)[1]).forEach(function (c) {
    if (Number.isFinite(parseInt(c))) {
        day = `${day}${c}`;
    }
});
const input = fs.readFileSync(`${__dirname}/${day}input.txt`, 'utf-8');
console.time("Time");

let power = 0;
const highHand = power;
power += 1;
const pair = power;
power += 1;
const doublePair = power;
power += 1;
const triple = power;
power += 1;
const house = power;
power += 1;
const quatriple = power;
power += 1;
const quantiple = power;
power += 1;

const powerFromHand = (hand) => {
    const asArray = Array.from(hand);
    const asSet = new Set(asArray);
    if (asSet.size === 1) {
        return quantiple;
    }
    if (asSet.size === 5) {
        return highHand;
    }
    if (asSet.size === 2) {
        // house or quadriple
        const first = asArray[0];
        let count = 1;
        for (let i=1; i < 5; i+=1) {
            if (asArray[i] === first) {
                count += 1;
            }
        }
        if (count === 1 || count === 4) {
            return quatriple;
        }
        return house;
    }
    if (asSet.size === 3) {
        // triple or double pair
        const first = asArray[0];
        let countA = 1;
        for (let i=1; i < 5; i+=1) {
            if (asArray[i] === first) {
                countA += 1;
            }
        }
        const second = asArray[1];
        let countB = 0;
        for (let i=0; i < 5; i+=1) {
            if (asArray[i] === second) {
                countB += 1;
            }
        }
        if (countA === 2 || countB === 2) {
            return doublePair;
        }
        return triple;
    }
    return pair;
};
const cardPowers = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10
}
const powerFromCard = (c) => {
    return cardPowers[c] || Number(c);
}
let handsAndBids = input.split("\n").filter(Boolean);
const hands = [];
const bids = [];
handsAndBids = handsAndBids.map(function (line) {
    let [hand, bid] = line.split(" ");
    bid = Number(bid);
    hands.push(hand);
    bids.push(bid);
    return {
        hand,
        bid,
        power: powerFromHand(hand),
    }
});
const ranks = hands.length;
handsAndBids.sort(function (a, b) {
    if (a.power !== b.power) {
        return a.power - b.power;
    }
    for (let i=0; i < 5; i+=1) {
        const codeA = powerFromCard(a.hand[i]);
        const codeB = powerFromCard(b.hand[i]);
        if (codeA !== codeB) {
            return codeA - codeB;
        }
    }
});

let totalWinnings = 0;

handsAndBids.forEach(function (handAndBid, i) {
    totalWinnings += handAndBid.bid * (i + 1);
})

console.timeEnd("Time");
console.log(handsAndBids);
console.log({totalWinnings});