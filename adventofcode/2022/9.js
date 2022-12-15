import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/9input.txt`, 'utf-8');
console.time("Time");
const lines = input.split("\n").filter(Boolean);

const up = `U`;
const left = `L`;
const right = `R`;
const down = `D`;
const x = (a) => {
    
};
// the grid is infinite
let hposY = 2500;
let hposX = 2500;
let tposY = hposY;
let tposX = hposX;

const height = 5000;
const width = 5000;
const grid = [];
for (let i = 0; i < height; i += 1) {
    grid.push([]);
    for (let k = 0; k < width; k += 1) {
        grid[i].push(false);
    }
}
grid[tposY][tposX] = true;// starting position

const visualize = () => {
    let startDrawing = false;
    let minx=width;
    let maxX=0;
    const linesToDraw = [];
    for (let i = 0; i < height; i += 1) {
        let line = ``;
        for (let k = 0; k < width; k += 1) {
            let thing = `.`
            if (grid[i][k]) {
                thing = `#`
            }
            if (hposY === i && hposX === k) {
                thing = `H`
            }
            if (tposY === i && tposX === k) {
                thing = `T`
            }
            if (thing !== `.`) {
                startDrawing = true;
                minx =Math.min(minx, k);
                maxX =Math.max(maxX, k);
            }
            line = `${line}${thing}`;
        }
        if (startDrawing) {
            linesToDraw.push(line);
        }
    }
    linesToDraw.forEach(lineToDraw => {
        console.log(lineToDraw.substring(minx, maxX));
    });
    console.log();
};
const moveOne = (deltax, deltay) => {
    hposX += deltax;
    hposY += deltay;
    // hposX = Math.min(width - 1, Math.max(0, hposX + deltax));
    // hposY = Math.min(height - 1, Math.max(0, hposY + deltay));
    // move t maybe
    if (!(Math.abs(hposX - tposX) >= 2 || Math.abs(hposY - tposY) >= 2)) {
        return;
    }
    if (hposX > tposX) {
        tposX +=1;
    } else if (hposX < tposX) {
        tposX -= 1;
    }
    
    if (hposY > tposY) {
        tposY +=1;
    } else if (hposY < tposY) {
        tposY -= 1;
    }
    
    grid[tposY][tposX] = true;
};
lines.forEach(line => {
    const [direction, numberS] = line.split(" ");
    const number = Number(numberS);
    let deltax = 0;
    let deltaY = 0;
    if (direction === up) {
        deltaY = -1;
    } else if (direction === down) {
        deltaY = 1;
    } else if (direction === right) {
        deltax = 1;
    } else if (direction === left) {
        deltax = -1;
    } 
    for (let m = 0; m < number; m += 1) {
        moveOne(deltax, deltaY);
    }
    // visualize();

})

let result = 0;
for (let i = 0; i < height; i += 1) {
    for (let k = 0; k < width; k += 1) {
        result += Number(grid[i][k]);
    }
}
console.timeEnd("Time");
visualize();
console.log(result);
