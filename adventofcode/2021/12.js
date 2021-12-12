import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/12input.txt`, 'utf-8');
console.time("Time");
let lines = input.split("\n").filter(Boolean);
let total = 0;
const start = "start";
const end = "end";
const isBig = (node) => {
    return node === node.toUpperCase();
};

const moves = [];
lines.forEach(function (line) {
    const [from, to] = line.split("-");
    moves.push([from, to]);
    moves.push([to, from]);
});

const routes = [];
let newFoundRoute = true;
while (newFoundRoute) {
    newFoundRoute = false;
    let currentRoute = start;
    let currentLocation = start;
    let smallTaken = [start];
    while (!currentRoute.endsWith(end)) {
        let potentialRoute;
        let moved = moves.some(([from, to]) => {
            if (from === currentLocation) {
                if (isBig(to) || !smallTaken.includes(to)) {
                    potentialRoute = `${currentRoute}-${to}`;
                    if (true/* !routes.some(r => {
                        return r.startsWith(potentialRoute);
                    }) */) {
                        currentLocation = to;
                        currentRoute = potentialRoute;
                        smallTaken.push(to);
                        return true;
                    }
                }
            }
        });
        if (!moved) {
            break;
        }
    }
    if (routes.includes(currentRoute)) {

    } else {
        newFoundRoute = true;
        routes.push(currentRoute);
    }
    
}
console.timeEnd("Time");
console.log(routes);

