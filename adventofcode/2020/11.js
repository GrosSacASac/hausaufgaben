
import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* 
--- Day 11: Seating System ---

Your plane lands with plenty of time to spare. The final leg of your journey is a ferry that goes directly to the tropical island where you can finally start your vacation. As you reach the waiting area to board the ferry, you realize you're so early, nobody else has even arrived yet!

By modeling the process people use to choose (or abandon) their seat in the waiting area, you're pretty sure you can predict the best place to sit. You make a quick map of the seat layout (your puzzle input).

The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L), or an occupied seat (#). For example, the initial seat layout might look like this:

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

Now, you just need to model the people who will be arriving shortly. Fortunately, people are entirely predictable and always follow a simple set of rules. All decisions are based on the number of occupied seats adjacent to a given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat). The following rules are applied to every seat simultaneously:

    If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
    If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
    Otherwise, the seat's state does not change.

Floor (.) never changes; seats don't move, and nobody sits on the floor.

After one round of these rules, every seat in the example layout becomes occupied:

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

After a second round, the seats with four or more occupied adjacent seats become empty again:

#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##

This process continues for three more rounds:

#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##

#.#L.L#.##
#LLL#LL.L#
L.L.L..#..
#LLL.##.L#
#.LL.LL.LL
#.LL#L#.##
..L.L.....
#L#LLLL#L#
#.LLLLLL.L
#.#L#L#.##

#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##

At this point, something interesting happens: the chaos stabilizes and further applications of these rules cause no seats to change state! Once people stop moving around, you count 37 occupied seats.

Simulate your seating area by applying the seating rules repeatedly until no seats change state. How many seats end up occupied?

*/
const input = fs.readFileSync(`${__dirname}/11input.txt`, 'utf-8')
const split = input.split("\n")
const rowLength = split[0].length
const seats = Array.from(split.join("")) // removed line return
const floor = "."
const emptySeat = "L"
const occupiedSeat = "#"
console.time("Time")

const getAdjacentCoordinates = function(i) {
    const isAgainstLeftCorner = i % rowLength === 0;
    const isAgainstRightCorner = i % rowLength === rowLength - 1
    return [
        !isAgainstLeftCorner && i - 1, // left
        !isAgainstRightCorner && i + 1, // right
        i - rowLength, // top
        i + rowLength, // bottom
        !isAgainstLeftCorner && i - rowLength - 1, // diagonale top left
        !isAgainstRightCorner && i - rowLength + 1, // diagonale top right
        // cant exist for seats against the wall
        !isAgainstLeftCorner && i + rowLength - 1, // diagonale bottom left
        !isAgainstRightCorner && i + rowLength + 1, // diagonale bottom right
    ].filter(potentialIndex => {
        return potentialIndex !== false && potentialIndex >= 0 && potentialIndex < seats.length
    }).sort(function (a, b) {
        return a -b
    })
}

const getAdjacentOccupiedSeats = (i, seats) => {
    return getAdjacentCoordinates(i).reduce((previous, adjacentIndex) => {
        return previous + Number(seats[adjacentIndex] === occupiedSeat);
    }, 0);
}

const nextSeatState = (i, seats) => {
    const currentState = seats[i];
    if (currentState === floor) {
        return floor
    }
    const occupiedAdjacentSeats = getAdjacentOccupiedSeats(i, seats)
    if (currentState === emptySeat && occupiedAdjacentSeats === 0) {
        return occupiedSeat
    }
    if (currentState === occupiedSeat && occupiedAdjacentSeats >= 4) {
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
console.log("totalOccupied",totalOccupied)
