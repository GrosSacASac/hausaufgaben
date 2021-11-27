import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* */
const input = fs.readFileSync(`${__dirname}/7input.txt`, 'utf-8')
const rules = input.split("\n").filter(Boolean)

const target = "shiny gold"
const containMap = {}
rules.forEach(function (rule) {
    let [container, contains] = rule.split("contain")
    if (contains === " no other bags.") {
        return
    }
    container = container.replace("bags", "").trim()
    const containList = contains.split(",").map(containItem => {
        containItem = containItem.replace("bags", "").replace("bag", "").replace(".", "").trim()
        let [number, ...color] = containItem.split(" ")
        return [Number(number), color.join(" ")]
    })
    containMap[container] = containList;    
})

const countInside = (color) => {
    if (!containMap[color]) {
        return 0
    }
    return containMap[color].reduce(function (previous, current) {
        const [number, color] = current
        return previous + number + number * countInside(color)
    }, 0)
};
console.log(countInside(target));