import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = fs.readFileSync(`${__dirname}/19input.txt`, 'utf-8')
console.time("Time")
let [rules, messages] = input.split("\n\n")
rules = rules.split("\n").filter(Boolean)
messages = messages.split("\n").filter(Boolean)

const ruleMap = new Map()
rules.forEach(ruleString => {
    let [number, rule] = ruleString.split(":")
    number = Number(number);
    rule = rule.trim()
    ruleMap.set(number, {rule})
});

let unresolved = true;
while (unresolved) {
    unresolved = false;
    ruleMap.forEach((ruleObject, number) => {
        if (ruleObject.ready) {
            return
        }
        unresolved = true;

        const { rule} = ruleObject;
        if (rule.includes('"')) {
            const character = rule.replaceAll('"', "");
            ruleObject.absorbs = 1;
            ruleObject._function = function (c) {
                return c === character
            }
            ruleObject.ready=true
        } else /*if (!rule.includes("|"))*/ {
            const split = rule.split(" ").filter(x => x!=="").map(Number).filter(Number.isFinite.bind(Number));
            const dependenciesReady = split.every(function (number)  {
                return ruleMap.get(number).ready
            })
            if (dependenciesReady) {
                const ors = rule.split("|")
                const orsRules = []
                ors.forEach(orRule => {
                    const split = orRule.split(" ").filter(x => x!=="").map(Number).filter(Number.isFinite.bind(Number));
                    orsRules.push(
                        function (string) {
                            let i = 0;
                            return split.every(function (number)  {
                                const {absorbs, _function } = ruleMap.get(number)
                                const result =  _function(string.substr(i, absorbs))
                                i+= absorbs;
                                return result;
                            })
                        }
                    )
                    ruleObject.absorbs = split.reduce((previous, number) => {
                        
                        const {absorbs } = ruleMap.get(number)
                        return previous + absorbs
                    }, 0)
                })
                ruleObject._function = function (string) {
                    return ruleObject.absorbs === string.length && orsRules.some(function (orRule) {
                        return orRule(string)
                    })
                }
                
                ruleObject.ready = true
            }
        }
    })
}
ruleMap.forEach((ruleObject, number) => {
    if (!ruleObject.ready) {
        return
    }
    // console.log(number, ruleObject.function.toString())
})
const rule0 = ruleMap.get(0)._function
let count = 0;
messages.forEach(message => {
    count += Number(rule0(message))
})
console.timeEnd("Time")
console.log(ruleMap.get(0))
console.log(count)
// console.log(state)