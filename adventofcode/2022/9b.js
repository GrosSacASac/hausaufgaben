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
const fnumbers = 9;
const followers = Array.from({length: fnumbers}, () => {
    return [hposX, hposY];
})

const height = 5000;
const width = 5000;
const grid = [];
for (let i = 0; i < height; i += 1) {
    grid.push([]);
    for (let k = 0; k < width; k += 1) {
        grid[i].push(false);
    }
}
grid[hposY][hposX] = true;// starting position

const visualize = () => {
    let startDrawing = false;
    let minx=width;
    let maxX=0;
    const linesToDraw = [];
    let lastLine = 0;
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
            for (let f = 0; f < fnumbers; f += 1) {
                const [x, y] = followers[f];
                if (y === i && x === k) {
                    thing = `${f+1}`
                }
            }
            if (thing !== `.`) {
                startDrawing = true;
                minx =Math.min(minx, k);
                maxX =Math.max(maxX, k);
                lastLine = i;
            }
            line = `${line}${thing}`;
        }
        if (startDrawing) {
            linesToDraw.push(line);
        }
    }
    linesToDraw.forEach((lineToDraw,i) => {
        if (i <= lastLine) {
            console.log(lineToDraw.substring(minx, maxX));

        }
    });
    console.log();
};
const moveOne = (deltax, deltay) => {
    hposX += deltax;
    hposY += deltay;
    // hposX = Math.min(width - 1, Math.max(0, hposX + deltax));
    // hposY = Math.min(height - 1, Math.max(0, hposY + deltay));
    // move t maybe
    let preX = hposX;
    let preY = hposY;
    for (let f = 0; f < fnumbers; f += 1) {
        let [x, y] = followers[f];
        if ((Math.abs(preX - x) >= 2 || Math.abs(preY - y) >= 2)) {
            if (preX > x) {
                x +=1;
            } else if (preX < x) {
                x -= 1;
            }
            
            if (preY > y) {
                y +=1;
            } else if (preY < y) {
                y -= 1;
            }
        }
        followers[f] = [x, y];
        preX = x;
        preY = y;
        
    }
    
    
    grid[followers[8][1]][followers[8][0]] = true;
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
