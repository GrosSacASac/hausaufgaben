import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/7input.txt`, 'utf-8');
// To begin, find all of the directories with a total size of at most 100000, then calculate the sum of their total sizes.
console.time("Time");
const lines = input.split("\n").filter(Boolean);
const currentPosition = [];
const map = {};
let currentDirectoryObject = map;


const executeCommand = (command) => {
    if (command.startsWith("cd")) {
        navigate(command.substring(3))
    } else if (command.startsWith("ls")) {

    }
};

const navigate = (target) => {
    if (target === `..`) {
        currentPosition.pop();
    } else if (target === `/`) {
        currentPosition.length = 0;
    } else {
        currentPosition.push(target);
    }
    
    currentDirectoryObject = map;
    currentPosition.forEach(subdir => {
        currentDirectoryObject = currentDirectoryObject[subdir]
    })
};

const readLine = (line) => {
    if (line.startsWith("$")) {
        executeCommand(line.substring(2));
    } else if (line.startsWith("dir")) {
        const dirname = line.substring(4);
        noteDirectory(dirname);
    } else {
        noteFile(...line.split(" "))
    }
}


const noteDirectory = (dirname) => {
    currentDirectoryObject[dirname] ||= {};
};
const noteFile = (size, name) => {
    currentDirectoryObject[name] = Number(size);
};
lines.forEach(readLine);


console.timeEnd("Time");
console.log(map);
