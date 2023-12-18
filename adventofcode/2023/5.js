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
        const description = line.split(" ")[0].trim();;
        const [source, TO, destination] = description.split("-");
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
        lastObject = undefined;
    }
});
if (lastObject) {
    
    maps.push(lastObject);
    lastObject.detailedMapping = makeDetailedMapping(lastObject.numbers);
}

let lowestLocation = 999999999;
seedIds.forEach(function(seedId) {
    const initialSource = "seed";
    const finalObjective = "location";
    
    let sourceId = seedId;
    let sourceType = initialSource;
    while (sourceType !== finalObjective) {
        const correctMap = maps.find(function (map) {
            return map.source === `${sourceType}`;
        });
        sourceId = correctMap.detailedMapping[sourceId];
        sourceType = correctMap.destination;
    }
    lowestLocation = Math.min(sourceId, lowestLocation);
});



console.timeEnd("Time");
console.log(lowestLocation);