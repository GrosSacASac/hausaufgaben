import {input} from "./4input.js";


const passportStrings = input.split("\n\n");

const required = [
    `byr` ,
    `iyr` ,
    `eyr` ,
    `hgt` ,
    `hcl` ,
    `ecl` ,
    `pid` ,
    // `cid` , //optional
]
let valid = 0

const passports = passportStrings.map(function (passportString) {
    return passportString.split(" ").flatMap(partial => {
        return partial.split("\n")
    }).filter(Boolean).map(keyValueString => {
        const [key] = keyValueString.split(":")
        return key
    });
});

passports.forEach(passportKeys => {
    console.log(passportKeys)
    valid += Number(required.every(function (requiredKey) {
      return passportKeys.includes(requiredKey);  
    }))
})
console.log(valid)