import fs from "node:fs";
import url from "node:url";
import path from "node:path";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(`${__dirname}/5input.txt`, 'utf-8');
console.time("Time");
let [stacksInput, commands] = input.split("\n\n");
stacksInput = stacksInput.split("\n").filter(Boolean);
commands = commands.split("\n").filter(Boolean);


const createStacks = (stacksInput) => {
    const stacksLines = stacksInput.slice(0, stacksInput.length - 1);
    const numbers = stacksInput[stacksInput.length - 1];
    // the number don't matter, we just take the last one to know the length
    const length = Number(Array.from(numbers).filter(character => {
        return character !== " ";
    }).at(-1));
    const stacks = Array.from({length}, () => {
        return [];
    });

    for (let i = stacksLines.length - 1; i >= 0; i -= 1) {
        const stackLine = stacksLines[i];
        // every 4 there is a character
        for (let k = 1, m = 0; k < stackLine.length; k += 4, m += 1) {
            const c = stackLine[k];
            if (c !== " ") {
                stacks[m].push(c)
            }
        }

    }
    return stacks;
};


const commandRegex = /move (?<quantity>[0-9]+) from (?<source>[0-9]+) to (?<target>[0-9]+)/;
const executeCommand = (command) => {
    // move 1 from 3 to 9
    let {quantity, source, target} = command.match(commandRegex).groups;
    quantity = Number(quantity);
    source = Number(source) - 1;// array start at 0
    target = Number(target) - 1;
    for (let i = 0; i < quantity; i += 1) {
        if (stacksa[source].length) {
            const moved = stacksa[source].pop();
            stacksa[target].push(moved);
        }
    }
};

const executeCommand9001 = (command) => {
    // move 1 from 3 to 9
    let {quantity, source, target} = command.match(commandRegex).groups;
    quantity = Number(quantity);
    source = Number(source) - 1;// array start at 0
    target = Number(target) - 1;
    const temp = []
    for (let i = 0; i < quantity; i += 1) {
        if (stacksb[source].length) {
            const moved = stacksb[source].pop();
            temp.push(moved);
        }
    }
    temp.reverse()
    stacksb[target].push(...temp);
};

const stacksa = createStacks(stacksInput);
commands.forEach(executeCommand);
let resulta = ``;
stacksa.forEach(stack => {
    if (stack.length) {
        resulta = `${resulta}${stack.at(-1)}`;
    }
});


const stacksb = createStacks(stacksInput);
commands.forEach(executeCommand9001);
let resultb = ``;
stacksb.forEach(stack => {
    if (stack.length) {
        resultb = `${resultb}${stack.at(-1)}`;
    }
});

console.timeEnd("Time");
console.log(resulta);
console.log(resultb);
