import fs from "fs";
import url from "url";
import path from "path";
import { cpuUsage } from "process";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**.
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

const ids= []
input.split("\n").filter(Boolean).forEach(function (boardingPass) {
    const id = getId(getRowColumnFromString(boardingPass))
    ids.push(id)
});
ids.sort(function (a, b) {
    return a-b;
})

ids.forEach((id, i) => {
    if (id + 1 === ids[i+1] -1) {
        console.log(`my seat id is ${id+1} in between ${id} and ${ids[i+1]}`)
    }
})
