import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * FBFBBFFRLR reveals that it is the seat at row 44, column 5.

F means to take the lower half, keeping rows 0 through 63.
B means to take the upper half, keeping rows 32 through 63.

R means to take the upper half, keeping columns 4 through 7.
L means to take the lower half, keeping columns 4 through 5.
Every seat also has a unique seat ID: multiply the row by 8, then add the column. In this example, the seat has ID 44 * 8 + 5 = 357.
 */
const input = fs.readFileSync(`${__dirname}/5input.txt`, 'utf-8')
const convertBinary = {
    F: 0,
    B: 1,
    R: 1,
    L: 0
}
const rowLetters = 7
const getRowColumnFromString = (string) => {
    const asBinaryString = Array.from(string).map(letter => {
        return convertBinary[letter];
    }).join("")
    const rowString = asBinaryString.substr(0,rowLetters)
    const columnString = asBinaryString.substr(rowLetters)
    return {
        row: parseInt(rowString, 2),
        column: parseInt(columnString, 2),
    }
}

const getId =({row, column}) => {
    return row * 8 + column
}

let maxId = 0;
input.split("\n").filter(Boolean).forEach(function (boardingPass) {
    maxId = Math.max(maxId, getId(getRowColumnFromString(boardingPass)))
});
console.log(maxId)
// const result = getRowColumnFromString("FBFBBFFRLR")
// console.log(result)
// row 44, column 5.