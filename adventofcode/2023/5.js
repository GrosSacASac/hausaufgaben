import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let day = ``;
Array.from(__filename.split(__dirname)[1]).forEach(function (c) {
    if (Number.isFinite(parseInt(c))) {
        day = `${day}${c}`;
    }
});
const input = fs.readFileSync(`${__dirname}/${day}input.txt`, 'utf-8');
console.time("Time");


const makeDetailedMapping = function (numbers) {
    const map = {};
    for (let i = 0; i < 100; i+= 1) {
        map[i] = i;
    }
    numbers.forEach(function ({destinationStart, sourceStart, range}) {
        console.log({destinationStart, sourceStart, range});
        let destination = destinationStart;
        for (let i = sourceStart; i < sourceStart + range; i += 1, destination += 1) {
            
            map[i] = destination;
        }
    });
    return map;
};

let lines = input.split("\n");
const [seeds, blank, ...restLines] = lines;
const seedDigits = seeds.split(":")[1].trim();
const seedIds = seedDigits.split(" ").map(Number).filter(Boolean);
const maps = [];
let lastObject;
restLines.forEach(function (line) {
    if (line.includes(":")) {
        const description = line.split(" ")[0];
        source,
        destination,
        lastObject = {
            source,
            destination,
            description,
            numbers: [],
            detailedMapping: undefined,
        }
    } else if (line.trim().length) {
        // lastObject.numbers.push(line);
        const [destinationStart, sourceStart, range] = line.trim().split(" ").map(Number);
        lastObject.numbers.push({destinationStart, sourceStart, range});
    } else {
        maps.push(lastObject);
        lastObject.detailedMapping = makeDetailedMapping(lastObject.numbers);
    }
});
// console.log({seedIds});
// console.log(maps);
// console.log(maps[0].detailedMapping);
// console.log(current);

const initialSource = "seed";
const objective = "soil";
const finalObjective = "location";

let sourceId = seedIds[0];
let sourceType = initialSource;
while (sourceType !== finalObjective) {
    const correctMap = maps.find(function (map) {
        return map.description.startsWith(`${sourceType}`);
    });
    const soil = correctMap.detailedMapping[seedIds[0]];
}


console.timeEnd("Time");
console.log(soil);