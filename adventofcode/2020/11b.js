
import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* 
--- Day 11: Seating System ---
Your puzzle answer was 2470.

The first half of this puzzle is complete! It provides one gold star: *
--- Part Two ---

As soon as people start to arrive, you realize your mistake. People don't just care about adjacent seats - they care about the first seat they can see in each of those eight directions!

Now, instead of considering just the eight immediately adjacent seats, consider the first seat in each of those eight directions. For example, the empty seat below would see eight occupied seats:

.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....

The leftmost empty seat below would only see one empty seat, but cannot see any of the occupied ones:

.............
.L.L.#.#.#.#.
.............

The empty seat below would see no occupied seats:

.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.

Also, people seem to be more tolerant than you expected: it now takes five or more visible occupied seats for an occupied seat to become empty (rather than four or more from the previous rules). The other rules still apply: empty seats that see no occupied seats become occupied, seats matching no rule don't change, and floor never changes.

Given the same starting layout as above, these new rules cause the seating area to shift around as follows:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL

#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##

#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#

#.L#.##.L#
#L#####.LL
L.#.#..#..
##L#.##.##
#.##.#L.##
#.#####.#L
..#.#.....
LLL####LL#
#.L#####.L
#.L####.L#

#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##LL.LL.L#
L.LL.LL.L#
#.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLL#.L
#.L#LL#.L#

#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.#L.L#
#.L####.LL
..#.#.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#

#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.LL.L#
#.LLLL#.LL
..#.L.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#

Again, at this point, people stop shifting around and the seating area reaches equilibrium. Once this occurs, you count 26 occupied seats.

Given the new visibility method and the rule change for occupied seats becoming empty, once equilibrium is reached, how many seats end up occupied?

*/
const input = fs.readFileSync(`${__dirname}/11input.txt`, 'utf-8')
const split = input.split("\n")
const rowLength = split[0].length
const seats = Array.from(split.join("")) // removed line return
const floor = "."
const emptySeat = "L"
const occupiedSeat = "#"
console.time("Time")

const isAgainstLeftCorner = (i) => i % rowLength === 0;
const isAgainstRightCorner = (i) => i % rowLength === rowLength - 1
const directionsAndConditions = [
    [(i) => i - 1, isAgainstLeftCorner], // left
    [(i) => i + 1, isAgainstRightCorner],
    [(i) => i - rowLength, undefined], 
    [(i) => i + rowLength, undefined], 
    [(i) => i - rowLength - 1, isAgainstLeftCorner], 
    [(i) => i - rowLength + 1, isAgainstRightCorner], 
    [(i) => i + rowLength - 1, isAgainstLeftCorner], 
    [(i) => i + rowLength + 1, isAgainstRightCorner],
]

const getNumberOfVisibleOccupiedSeats = function (i, seats) {
    // for each direction add 1 if there is a visible occupied seat
    return directionsAndConditions.reduce((previous, [direction, condition]) => {
        let firstSeatPosition = undefined
        let currentPosition = i;
        // stop at first visible seat or out of bounds
        while (currentPosition >= 0 && currentPosition < seats.length) {
            if (condition && condition(currentPosition)) {
                return previous
            }
            currentPosition = direction(currentPosition)
            if (seats[currentPosition] === emptySeat || seats[currentPosition] === occupiedSeat) {
                firstSeatPosition = currentPosition
                break;
            }
        }
        return previous + Number(seats[firstSeatPosition] === occupiedSeat);
    }, 0);

}

const nextSeatState = (i, seats) => {
    const currentState = seats[i];
    if (currentState === floor) {
        return floor // the floor is made out of floor
    }
    const occupiedVisibleSeat = getNumberOfVisibleOccupiedSeats(i, seats)
    if (currentState === emptySeat && occupiedVisibleSeat === 0) {
        return occupiedSeat
    }
    if (currentState === occupiedSeat && occupiedVisibleSeat >= 5) {
        return emptySeat
    }
    return currentState
}

const nextState = (seats) => {
    return seats.map((unused, i) => {
        return nextSeatState(i, seats)
    });
}

const isEqual = (seatsPrevious, seatsCurrent) => {
    return String(seatsPrevious) === String(seatsCurrent)
}


let previousSeats;
let currentSeats = seats;
let i = 0;
do {
    i += 1
    previousSeats = currentSeats
    currentSeats = nextState(currentSeats)
    // console.log()
    // console.log(previousSeats)
    // console.log(currentSeats)
} while (!isEqual(previousSeats, currentSeats));

const totalOccupied = currentSeats.reduce((previous, unused, i) => {
    return previous + Number(currentSeats[i] === occupiedSeat);
}, 0);

console.timeEnd("Time")
console.log("iterations", i)
console.log("rowLength",rowLength)
console.log("totalOccupied 26 for test input",totalOccupied)
