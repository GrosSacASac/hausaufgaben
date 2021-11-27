// todo find formula, start with the 100000000000000 at least
//https://www.reddit.com/r/adventofcode/comments/kcd7p7/js_13_part_2_am_i_on_the_right_track_or_should_i/
import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(`${__dirname}/13input.txt`, 'utf-8')
let [unused , busIdsString] = input.split("\n")
const busIdsWithIgnored = busIdsString.split(",")
const ignore = "x"
console.time("Time")

let biggestBusId = 0n
let biggestBusOffset;
const offsets = []
const busIds =  busIdsWithIgnored.map((busId, i) => {
    if (busId === ignore) {
        return
    }
    const busIdNumber = BigInt(busId)
    if (busIdNumber > biggestBusId) {

        biggestBusId = busIdNumber
        biggestBusOffset = i
    }
    offsets.push(BigInt(i))
    return busIdNumber
}).filter(Boolean)

// use biggest to be faster
let baseTime = -BigInt(biggestBusOffset);

do {
    baseTime += biggestBusId
    // console.log(baseTime)
} while (!busIds.every((busIdNumber, i) => {
    const offset = offsets[i]
    const targetTime = baseTime + offset
    return targetTime % busIdNumber === 0n
}));


console.timeEnd("Time")
console.log("(1068781 for test input):")
console.log({baseTime})
