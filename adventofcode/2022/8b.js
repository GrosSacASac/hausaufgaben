import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/8input.txt`, 'utf-8');
console.time("Time");
const lines = input.split("\n").filter(Boolean);
//if you reach an edge or at the first tree that is the same height or taller
//A tree's scenic score is found by multiplying together its viewing distance in each of the four directions

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

let heighestScenicScore = 0;
for (let y = 1; y < height -1; y += 1) {
    for (let x = 1; x < width -1; x += 1) {
        const tree = trees[y][x];
        [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(directions => {
            const [directionX, directionY] = directions;
            const sceniceCode = `visible|${directionX},${directionY}`;// direction as string for signature
            let visibleInDirection = 0;
  
            
            const loopCore = (x2, y2) => {
                const adjacentTree = trees[y2][x2];
                if (!adjacentTree) {
                    return true
                }
                if (adjacentTree.treeHeight >= tree.treeHeight) {
                    visibleInDirection += 1;
                    return true
                };
                visibleInDirection += 1;
            }
            if (directionY === 0) {
                if (directionX === 1) {
                    for (let x2 = x+directionX; x2 < width; x2 += 1) {
                        if (loopCore(x2, y)) {
                            break;
                        };
                    }
                } else {
                    for (let x2 = x+directionX; x2 >= 0; x2 -= 1) {
                        if (loopCore(x2, y)) {
                            break;
                        };
                    }
                }                
            } else {
                if (directionY === 1) {
                    for (let y2 = y+directionY; y2 < height; y2 += 1) {
                        if (loopCore(x, y2)) {
                            break;
                        };
                    }
                } else {
                    for (let y2 = y+directionY; y2 >= 0; y2 -= 1) {
                        if (loopCore(x, y2)) {
                            break;
                        };
                    }
                } 
            }
            tree[sceniceCode]=visibleInDirection;

        });
        const score = 
            tree[`visible|0,-1`] * 
            tree[`visible|0,1`] * 
            tree[`visible|-1,0`] * 
            tree[`visible|1,0`];
        // tree.score = score;
        if (Number.isFinite(score)) {
            heighestScenicScore = Math.max(heighestScenicScore, score);
        }
    }
}



console.timeEnd("Time");
console.log(heighestScenicScore);
// console.log(trees);
