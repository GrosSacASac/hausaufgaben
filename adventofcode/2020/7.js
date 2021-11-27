import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * 
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
---  */
const input = fs.readFileSync(`${__dirname}/7input.txt`, 'utf-8')
const rules = input.split("\n").filter(Boolean)

let countTotal = 0
const target = "shiny gold"
const containMap = {}
rules.forEach(function (rule) {
    let [container, contains] = rule.split("contain")
    container = container.replace("bags", "").trim()
    const containList = contains.split(",").map(containItem => {
        containItem = containItem.replace("bags", "").replace("bag", "").replace(".", "").trim()
        let [number, ...color] = containItem.split(" ")
        return color.join(" ")
    })
    containMap[container] = containList;
    // console.log(container, containList)
    
})

const alreadyCounted = []
const canContain = []
let changed = true
while (changed) {
    changed =false
    Object.entries(containMap).forEach(([container, containList]) => {
        if (container === target) {
            return;
        }
        if (alreadyCounted.includes(container)) {
            return
        }
        if (containList.includes(target)  /* direct contain*/ || containList.some(item => {
            return canContain.includes(item);
        })) {
            changed = true
            countTotal += 1
            canContain.push(container)
            alreadyCounted.push(container)
            return
        }
    
    })
}
console.log(canContain);
console.log(countTotal);