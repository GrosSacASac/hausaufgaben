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
const totalAvailable = 70000000
const minSpaceNeeded = 30000000

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

const totalSize = (dir) => {
    let size = 0;
    Object.values(dir).forEach(folderOrDir => {
        if (typeof folderOrDir === `object`) {
            size += totalSize(folderOrDir);
        } else if (typeof folderOrDir === `number`) {
            size += folderOrDir;
        }
    });
    return size;
};
const walk = (dir, name, callback) => {
    Object.entries(dir).forEach(([name, folderOrDir]) => {
        if (typeof folderOrDir === `object`) {
            walk(folderOrDir, name, callback);
            callback(folderOrDir);
        }
    });
};

const collectSizesOfAtMost100000 = (map) => {
    let total = 0
    walk(map, "/", (dir) => {
        const size = totalSize(dir);
        if (size <= 100000) {
            total += size;
        }
    })
    return total;
};


const findToDeleteSmallest = (map) => {
    let smallest = Number.MAX_SAFE_INTEGER;
    walk(map, "/", (dir) => {
        const size = totalSize(dir);
        if (size >= needToDelete && size < smallest) {
            smallest = size
        }
    })
    return smallest;
}

const totalUsed = totalSize(map);
const unusedSpace = totalAvailable - totalUsed;
const needToDelete = minSpaceNeeded + totalUsed - totalAvailable;
const collectedSizesOfAtMost100000 = collectSizesOfAtMost100000(map);
const smallesToDelete = findToDeleteSmallest(map);
console.timeEnd("Time");
console.log(map);
console.log({collectedSizesOfAtMost100000});
console.log({totalUsed, totalAvailable, minSpaceNeeded, unusedSpace});
console.log({needToDelete});
console.log({smallesToDelete});
