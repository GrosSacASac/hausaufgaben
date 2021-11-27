const startingNumbers =[10,16,6,0,1,17]
const end = 2020

console.time("time")
let iterations = startingNumbers.length;
let last = 0
while(iterations < end) {
    let lastSpoken = startingNumbers[iterations - 1];
    let previousSpokePosition = iterations - 2;
    while (startingNumbers[previousSpokePosition] !== lastSpoken && previousSpokePosition > -1) {
        previousSpokePosition -=1
    }
    if (previousSpokePosition === -1) {
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