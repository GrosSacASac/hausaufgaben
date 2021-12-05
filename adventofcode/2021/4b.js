import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/4input.txt`, 'utf-8');
console.time("Time");

// console.log(input.split("\n")[0].split(","));
const numbers = input.split("\n")[0].split(",").map(Number);
let rowLength = 0;
let [ignoredNumbers, ...boards] = input.split("\n\n").filter(Boolean);
// console.log(boards[0]);
boards = boards.map(boardAsString => {
    return boardAsString.split("\n").map(boardRow => {
        const rowNumbers = [];
        let buff = ``;
        for (let i = 0; i <= boardRow.length; i += 1) {
            const c = boardRow[i];
            if (c === " " || c === undefined) {
                if (buff) {
                    rowNumbers.push(Number(buff));
                    buff = ``;
                }
            } else {
                buff += c;
            }
        }
        return rowNumbers;
    }).flat(Infinity);
})

if (!rowLength) {
    rowLength = boards[0].length**0.5;
}

// console.log(numbers);
// console.log(rowLength);
// console.log(boards);
const isBoardWinning = (boardHighlight => {
    // probably not optimal
    // assume board is square (rowLength)
    // checks horizontally ----
    for (let i = 0; i < rowLength; i += 1) {
        let winning = true;
        for (let j = 0; j < rowLength; j += 1) {
            if (boardHighlight.includes(i * rowLength + j)) {

            } else {
                winning = false;
            }
        }
        if (winning) {
            return true;
        }
    }
    // checks vertically |||||
    
    for (let i = 0; i < rowLength; i += 1) {
        let winning = true;
        for (let j = 0; j < rowLength; j += 1) {
            if (boardHighlight.includes(j * rowLength + i)) {

            } else {
                winning = false;
            }
        }
        if (winning) {
            return true;
        }
    }
    return false;
});

let last;
let winnerBoard;
let winnerBoardMarked;
while (boards.length) {
    let numberCopy = Array.from(numbers)
    let winner = undefined;
    
    const boardsHighlights = boards.map(() => {
        return [];
    });
    while (winner === undefined && numberCopy.length) {
        const selectedNumber = numberCopy.shift();
        boards.some((board, i) => {
            const atIndex = board.indexOf(selectedNumber);
            if (/*board.includes(selectedNumber)*/ atIndex !== -1) {
                boardsHighlights[i].push(atIndex);
                if (isBoardWinning(boardsHighlights[i])) {
                    winner = i;
                    last = selectedNumber;
                    winnerBoard = board;
                    winnerBoardMarked = boardsHighlights[i];
                    return true;
                }
            }
        });
    }
    // console.log(winner)
    boards.splice(winner, 1);

}

const sumOfUnmarked = function (board, markedIndexes) {
    return board.reduce(function (sum, v, i) {
        if (markedIndexes.includes(i)) {
            v = 0
        }
        return sum + v
    }, 0)
};

const answer = sumOfUnmarked(winnerBoard, winnerBoardMarked) * last;
console.timeEnd("Time")
console.log(winnerBoard)
console.log(answer)
