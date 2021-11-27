import {input} from "./4input.js";


const passportStrings = input.split("\n\n");

const required = [
    {
        validate: function (value) {
            const number = Number(value)
            return Number.isFinite(number) && number >= 1920 && number <= 2002;

    }, key:`byr`} ,
    {
        validate: function (value) {
        
            const number = Number(value)
            return Number.isFinite(number) && number >= 2010 && number <= 2020;
;
    },key:`iyr`}  ,
    {
        validate: function (value) {
        
            const number = Number(value)
            return Number.isFinite(number) && number >= 2020 && number <= 2030
;
    },key:`eyr`}  ,
    {
        validate: function (value) {
            if (value.includes("cm")) {
                    
                const number = Number(value.replace("cm", ""))
                return Number.isFinite(number) && number >= 150 && number <= 193
            } else if (value.includes("in")) {
                const number = Number(value.replace("in", ""))
                return Number.isFinite(number) && number >= 59 && number <= 76
            }
            return false
;
    },key:`hgt`}  ,
    {
        validate: function (value) {
            return value[0] === "#" && value.length === 7 && Array.from(value).every(function (c, i) {
                return i === 0 ||
                (c.charCodeAt(0) >= 97 && c.charCodeAt(0) <= 102) ||
                (c.charCodeAt(0) >= 48 && c.charCodeAt(0) <= 57) 
            });
;
    },key:`hcl`}  ,
    {
        validate: function (value) {
            return ["amb" ,"blu" ,"brn" ,"gry" ,"grn" ,"hzl" ,"oth"].includes(value)
;
    },key:`ecl`}  ,
    {
        validate: function (value) {
        
            const number = Number(value)
            return value.length === 9 && Number.isFinite(number) ;
;
    },key:`pid`}  ,
    // `cid` , //optional
]
let valid = 0

const passports = passportStrings.map(function (passportString) {
    return passportString.split(" ").flatMap(partial => {
        return partial.split("\n")
    }).filter(Boolean).map(keyValueString => {
        const [key, value] = keyValueString.split(":")
        return [key, value]
    })
}).map(passportPairs => {
    return Object.fromEntries(passportPairs);
});

passports.forEach(passport => {
    // console.log(passport)
    valid += Number(required.every(function({key, validate}) {
        return passport[key] && validate(passport[key]);
    }))
})

console.log(valid)
