// credit https://github.com/caderek/aoc2020/blob/main/src/day15/index.ts

const startingNumbers =[10,16,6,0,1,17]
const end = 30000000


console.time("time")

const turnsPerNum = new Uint32Array(end)
startingNumbers.slice(0, -1).forEach((x, i) => {
    turnsPerNum[x] = i + 1
})

let turn = startingNumbers.length
let last = startingNumbers[startingNumbers.length - 1]
while (turn < end) {
  const val = turnsPerNum[last]

  turnsPerNum[last] = turn
  last = val ? turn - val : 0
  turn+=1
}

console.timeEnd("time")
console.log(last)