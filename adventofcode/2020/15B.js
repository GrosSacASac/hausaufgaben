const startingNumbers =[10,16,6,0,1,17]
const end = 30000000


console.time("time")
const seenNumbers = new Set(startingNumbers)
let iterations = startingNumbers.length;
let last = startingNumbers[iterations-1]

while(iterations < end) {
    let previousSpokePosition = -1;
    if (seenNumbers.has(last)) {
        let previousSpokePosition = iterations - 2;
        while (startingNumbers[previousSpokePosition] !== last) {
            previousSpokePosition -=1
        }
    }
    
    if (previousSpokePosition === -1) {
        seenNumbers.add(last)
        last = 0
        // console.log("speak", 0)
        startingNumbers.push(0)
    } else {
        let diff = iterations - 1 - previousSpokePosition
        last = diff
        // console.log("speak", diff)
        startingNumbers.push(diff)
        
    }
    iterations +=1
}

console.timeEnd("time")
console.log(last)