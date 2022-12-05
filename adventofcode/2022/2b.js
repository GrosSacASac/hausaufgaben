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
    B: 'P',
    C: 'S',
};
const possiblePicks = Object.values(map);
const scoreFromPick = {
    R: rock,
    P: paper,
    S: scissors,
}
let lines = input.split("\n").filter(Boolean);


const scoreForLine = (line) => {
    const lineSplit = line.split(" ")
    const [opponentCode, strat] = lineSplit;
    const opponent = map[opponentCode];
    let us;
    if (strat === `X`) {
        us = pickToLose(opponent);
    } else if (strat === `Y`) {
        us = pickToDraw(opponent);
    } else if (strat === `Z`) {
        us = pickToWin(opponent);
    }
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

const pickToWin = (opponent) => {
    return possiblePicks.find(pick => {
        return winnerScore(opponent, pick) === win;
    });
};
const pickToDraw = (opponent) => {
    return possiblePicks.find(pick => {
        return winnerScore(opponent, pick) === draw;
    });
};
const pickToLose = (opponent) => {
    return possiblePicks.find(pick => {
        return winnerScore(opponent, pick) === lost;
    });
};

const totalScore = lines.map(scoreForLine).reduce((total, score) => {
    return total + score;
}, 0)


console.timeEnd("Time");
console.log(totalScore);
