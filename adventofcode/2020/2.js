import {input} from "./2input.js";


const lines = input.split("\n");

let validNumber = 0;
lines.forEach(function (line) {
    let [rule, password] = line.split(":");
    password = password.trim()
    const [minMax, requiredLetter] = rule.split(" ")
    const [min, max] = minMax.split("-");

    let letterOccurence = 0;
    Array.from(password).forEach(function (letter) {
        if (letter === requiredLetter) {
            letterOccurence += 1;
        }
    });

    if ((min <= letterOccurence) && (letterOccurence <= max)) {
        validNumber += 1;
    }
});
console.log(validNumber)