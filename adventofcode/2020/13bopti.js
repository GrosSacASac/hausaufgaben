
import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(`${__dirname}/13inputtest.txt`, 'utf-8')
let [unused , busIdsString] = input.split("\n")
const busIds = busIdsString.split(",")
const ignore = "x"
console.time("Time")

let biggestBusId = 0
let biggestBusOffset;
const busIdsWithOffset =  busIds.map((busId, i) => {
    if (busId === ignore) {
        return
    }
    const busIdNumber = Number(busId)
    if (busIdNumber > biggestBusId) {

        biggestBusId = busIdNumber
        biggestBusOffset = i
    }
    return [busIdNumber, i]
}).filter(Boolean)

let found;
// use biggest to be faster
// const firstBusIdNumber = busIdsWithOffset[0][0]
let baseTime = -biggestBusOffset;

while (!found) {
    baseTime += biggestBusId
    // console.log(baseTime)
    found = busIdsWithOffset.every(([busIdNumber, offset]) => {
        const targetTime = baseTime + offset
        return targetTime % busIdNumber === 0
    })
}


// travel()
console.timeEnd("Time")
console.log("1068781 for test input:")
console.log({baseTime})
