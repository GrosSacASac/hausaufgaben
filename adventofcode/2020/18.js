import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const input = fs.readFileSync(`${__dirname}/17input.txt`, 'utf-8')
const input = `
(5 + 3) * 2
`
const lines = input.split("\n").filter(Boolean)

console.time("Time")

const evaluate = (line, initial) => {
    const {length} = line
    if (!initial) {
        const first = line.substr(0,1)
        if (first === "(") {
            const endPosition = line.indexOf(")")
            console.log(0, endPosition)
            const insideParantheses = line.substring(1, endPosition)
            const rest = line.substring(endPosition + 1)
            return evaluate() // todso
        }
        const operator = line.substr(2,1)
        const second = line.substr(4,1)
        const rest = line.substr(6)
        return evaluate(rest, `(${first} ${operator} ${second})`)
    }
    if (!length) {
        return eval(initial)
    }
    const operator = line.substr(0,1)
    const second = line.substr(2,1)
    const rest = line.substr(4)
    return evaluate(rest, `(${initial} ${operator} ${second})`)
}
let total = 0;
lines.forEach(line => {
    total += evaluate(line)
});
console.timeEnd("Time")
// console.log(initialState)
console.log(total)
// console.log(state)