import {input} from "./2input.js";


const lines = input.split("\n");

let validNumber = 0;
lines.forEach(function (line) {
    let [rule, password] = line.split(":");
    password = password.trim()
    const [positions, requiredLetter] = rule.split(" ")
    const [positionA, positionB] = positions.split("-").map(function (i) {
        return i - 1; // index 0 based
    });
    
    
    const containsA = (password[positionA] === requiredLetter)
    const containsB = (password[positionB] === requiredLetter)
    if (containsA !== containsB) { // simplified according to boolean logic
        validNumber += 1;
    }
});
console.log(validNumber)