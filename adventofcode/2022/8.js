import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/8input.txt`, 'utf-8');
console.time("Time");
const lines = input.split("\n").filter(Boolean);
//A tree is visible if all of the other trees between it and an edge of the grid are shorter than it (one side is enough)
//how many trees are visible from outside the grid?

const height = lines.length;
const width = lines[0].length;
const trees = [];
lines.forEach((line, i) => {
    trees.push([]);
    Array.from(line).forEach(tree => {
        const treeHeight = Number(tree);
        trees[i].push({treeHeight});
    });
});
[[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(directions => {
    const [directionX, directionY] = directions;
    const code = `max|${directionX},${directionY}`;// direction as string for signature
    
    const loopCore = (x, y) => {
        const tree = trees[y][x];
        const adjacentTree = trees?.[y+directionY]?.[x+directionX];
        let adjacentHeight;
        let maxInDirection;
        if (adjacentTree) {
            adjacentHeight = adjacentTree.treeHeight;
            maxInDirection = Math.max(adjacentTree[code], adjacentHeight);
            if (maxInDirection < tree.treeHeight) {
                tree.isVisible = true;
            }
        } else {
            adjacentHeight = 0;
            maxInDirection = 0;
            tree.isVisible = true;
        }
        tree[code] = maxInDirection;
    }
    if (directionY === 1) {
        for (let y = height -1; y >= 0; y -= 1) {
            if (directionX === 1) {
                for (let x = width -1; x >= 0; x -= 1) {
                    loopCore(x, y);
                }
            } else {
                for (let x = 0; x < width; x += 1) {
                    loopCore(x, y);
                }
            }
        }
        
    } else {
        for (let y = 0; y < height; y += 1) {
            if (directionX === 1) {
                for (let x = width -1; x >= 0; x -= 1) {
                    loopCore(x, y);
                }
            } else {
                for (let x = 0; x < width; x += 1) {
                    loopCore(x, y);
                }
            }
        }
    }

});

let visibleTrees = 0;
for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
        if (trees[y][x].isVisible) {
            visibleTrees += 1;
        }
    }
}




console.timeEnd("Time");
console.log(visibleTrees);
