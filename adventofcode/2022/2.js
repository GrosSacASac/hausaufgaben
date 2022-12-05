import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/2input.txt`, 'utf-8');
console.time("Time");
const win = 6;
const draw = 3;
const lost = 0;
const rock = 1;
const paper = 2;
const scissors = 3;
const map = {
    A: 'R',
    X: 'R',
    B: 'P',
    Y: 'P',
    C: 'S',
    Z: 'S',
};
const scoreFromPick = {
    R: rock,
    P: paper,
    S: scissors,
}
let lines = input.split("\n").filter(Boolean);


const scoreForLine = (line) => {
    const [opponent, us] = line.split(" ").map(letter => {
        return map[letter];
    });
    const pickScore = scoreFromPick[us];
    const resultScore = winnerScore(opponent, us);
    return pickScore + resultScore;
};

const winnerScore = (opponent, us) => {
    if (opponent === us) {
        return draw;
    }
    if (opponent === 'R') {
        if (us === 'P') {
            return win;
        }
    }
    if (opponent === 'P') {
        if (us === 'S') {
            return win;
        }
    }
    
    if (opponent === 'S') {
        if (us === 'R') {
            return win;
        }
    }
    return lost
};

const totalScore = lines.map(scoreForLine).reduce((total, score) => {
    return total + score;
}, 0)


console.timeEnd("Time");
console.log(totalScore);
