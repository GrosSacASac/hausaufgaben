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
const endMoves = [];
const moves = [];
lines.forEach(function (line) {
    const [from, to] = line.split("-");
    if (from === end || to === end) {
        
        endMoves.push([from, to]);
        endMoves.push([to, from]);
    } else {

        moves.push([from, to]);
        moves.push([to, from]);
    }
});
moves.push(...endMoves);

const routes = [];
let newFoundRoute = true;


const discoverRoutes = (currentRoute, smallTaken, iSkip, routes, currentLocation) => {
    while (!currentRoute.endsWith(end)) {
        let moved = moves.some(([from, to], i) => {
            if (from === currentLocation) {
                if (isBig(to) || !smallTaken.includes(to)) {
                    if (i > iSkip) {
                        discoverRoutes(currentRoute, Array.from(smallTaken), i, routes, currentLocation);
                        currentLocation = to;
                        let potentialRoute = `${currentRoute},${to}`;
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
        iSkip = 0;
    }
    if (routes.includes(currentRoute) || !currentRoute.endsWith(end)) {

    } else {
        routes.push(currentRoute);
    }
}

while (newFoundRoute) {
    newFoundRoute = false;
    let currentRoute = start;
    let currentLocation = start;
    let smallTaken = [start];
    discoverRoutes(currentRoute, smallTaken, -1, routes, currentLocation);
    // if (routes.includes(currentRoute)) {

    // } else {
    //     // newFoundRoute = true;
    //     // routes.push(currentRoute);
    // }
    
};
console.timeEnd("Time");
console.log(routes);
console.log(routes.length   );

