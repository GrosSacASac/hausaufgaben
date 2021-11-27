
import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* 
*/
const input = fs.readFileSync(`${__dirname}/13input.txt`, 'utf-8')
let [earlieastTime , busIdsString] = input.split("\n")
earlieastTime = Number(earlieastTime)
const busIds = busIdsString.split(",")
const ignore = "x"
console.time("Time")


let earliestMatch = Number.MAX_VALUE
let earliestBusId;
const travel = function () {
    busIds.forEach(busId => {
        if (busId === ignore) {
            return
        }
        const busIdNumber = Number(busId)
        const d = Math.ceil(earlieastTime / busIdNumber)
        const earliestMatchTime = d * busIdNumber;
        if (earliestMatchTime < earliestMatch) {
            earliestMatch = earliestMatchTime
            earliestBusId = busIdNumber
        }
        console.log(busIdNumber)
        // console.log(position, wayPointPosition)
    })
}

travel()
const waitTime = earliestMatch - earlieastTime
console.timeEnd("Time")
console.log({earliestMatch, earliestBusId, waitTime, earlieastTime})
console.log("waitTime * id", waitTime * earliestBusId)
