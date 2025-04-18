import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/*
--- Day 6: Guard Gallivant ---

The Historians use their fancy device again, this time to whisk you all away to the North Pole prototype suit manufacturing lab... in the year 1518! It turns out that having direct access to history is very convenient for a group of historians.

You still have to be careful of time paradoxes, and so it will be important to avoid anyone from 1518 while The Historians search for the Chief. Unfortunately, a single guard is patrolling this part of the lab.

Maybe you can work out where the guard will go ahead of time so that The Historians can search safely?

You start by making a map (your puzzle input) of the situation. For example:

....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...

The map shows the current position of the guard with ^ (to indicate the guard is currently facing up from the perspective of the map). Any obstructions - crates, desks, alchemical reactors, etc. - are shown as #.

Lab guards in 1518 follow a very strict patrol protocol which involves repeatedly following these steps:

    If there is something directly in front of you, turn right 90 degrees.
    Otherwise, take a step forward.

Following the above protocol, the guard moves up several times until she reaches an obstacle (in this case, a pile of failed suit prototypes):

....#.....
....^....#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#...

Because there is now an obstacle in front of the guard, she turns right before continuing straight in her new facing direction:

....#.....
........>#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#...

Reaching another obstacle (a spool of several very long polymers), she turns right again and continues downward:

....#.....
.........#
..........
..#.......
.......#..
..........
.#......v.
........#.
#.........
......#...

This process continues for a while, but the guard eventually leaves the mapped area (after walking past a tank of universal solvent):

....#.....
.........#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#v..

By predicting the guard's route, you can determine which specific positions in the lab will be in the patrol path. Including the guard's starting position, the positions visited by the guard before leaving the area are marked with an X:

....#.....
....XXXXX#
....X...X.
..#.X...X.
..XXXXX#X.
..X.X.X.X.
.#XXXXXXX.
.XXXXXXX#.
#XXXXXXX..
......#X..

In this example, the guard will visit 41 distinct positions on your map.

Predict the path of the guard. How many distinct positions will the guard visit before leaving the mapped area?

*/

console.time("Time");
const player = ["^", ">", "v", "<"]; // rotating right
let inititalPosition;
const position = [0, 0];
const direction = [0, 0];
let initialFigure;
let directionFigure = "<";

const rotate = () => {
    directionFigure = player[(player.indexOf(directionFigure) + 1) % player.length];
    setPlayer(directionFigure, position[0], position[1]);
};

const setPlayer = (c, x, y) => {
    directionFigure = c;
    position[0] = x;
    position[1] = y;
    if (c === "v") {
        direction[0] = 0;
        direction[1] = 1;
    } else if (c === "^") {
        direction[0] = 0;
        direction[1] = -1;

    } else if (c === ">") {
        direction[0] = 1;
        direction[1] = 0;

    } else if (c === "<") {
        direction[0] = -1;
        direction[1] = 0;
    }
};

const setInitialPlayer = (c, x, y) => {
    initialFigure = c;
    inititalPosition = [x, y];
};

const isOut = (x, y) => {
    if (Math.min(x, y) <= -1) {
        return true;
    }
    if (x >= rowLength) {
        return true;
    }
    return y >= columnLength;
};

const runMaze = (maze) => {
    let insideMaze = true;
    const positionVisited = maze.slice();
    setPlayer(initialFigure, inititalPosition[0], inititalPosition[1]);
    positionVisited.forEach((line, y) => {
        const row = [];
        row.length = rowLength;
        row.fill(false);
        positionVisited[y] = row;
    });
    while (insideMaze) {
        if (!positionVisited[position[1]][position[0]]) {
            positionVisited[position[1]][position[0]] = new Set();
        } else if(positionVisited[position[1]][position[0]].has(directionFigure)) {
            // detect loop
            return "loop";
            
        }
        positionVisited[position[1]][position[0]].add(directionFigure);
        const nextPositionX = position[0] + direction[0];
        const nextPositionY = position[1] + direction[1];
        if (isOut(nextPositionX, nextPositionY)) {
            insideMaze = false;
        } else if (maze[nextPositionY][nextPositionX]) { //hit obstacle ?
            rotate(); // go trough loop  to continue
        } else {
            position[0] = nextPositionX;
            position[1] = nextPositionY;
        }
    }
    return positionVisited;
};

const input = fs.readFileSync(`${__dirname}/6input.txt`, 'utf-8');
const grid = input.trim().split("\n").map((line, y) => {
    return Array.from(line).map((c, x) => {
        if (player.includes(c)) {
            setInitialPlayer(c, x, y);
        }
        return (c === "#");
    }); 
});

const rowLength = grid[0].length;
const columnLength = grid.length;


const countTotal = (positionVisited) => {
    let total= 0;
    positionVisited.forEach(line => {
        line.forEach(visited => {
            total += Number(!!visited);
        });
    });
    return total;
};

const positionVisited = runMaze(grid);
const positionVisitedTotal = countTotal(positionVisited);

const simulateObstacle = (x, y) => {
    // return a copy of the maze with the added obstacle
    const copy = grid.slice();
    grid.forEach((line, y) => {
        copy[y] = line.slice();
    });
    copy[y][x] = true;
    return copy;
};

//to determine places where to put an obstacle
// we can simulate an obstacle every step there is not one
// then run the maze with that obstacle
// detect loop when there is an insane (to be determined) amount of steps
// or when a position is visited twice with the same direction
// optimization: add obstacle only in visited positions

const solveb = () => {
    let progress = 0;
    let totalb = 0;
    positionVisited.forEach((line, y) => {
        line.forEach((visited, x) => {
            if (visited) {
                // console.log("progress", progress);
                // could set player just before obstacle to have a quicker run
                const newMaze = simulateObstacle(x, y);
                const positionVisitedInSimulation = runMaze(newMaze);
                if (positionVisitedInSimulation === "loop") {
                    totalb += 1;
                }
                progress += 1;
            }
        });
    });
    return totalb;
}

const totalb = solveb();
console.timeEnd("Time");
console.log(positionVisitedTotal);
console.log(totalb);
