import {numbers} from "./1input.js";

let a = 0;
let b = 0;

numbers.some((n1, i) => {
    for (let j = i + 1;  j <numbers.length; j+=1) {
      const n2 = numbers[j];
      if (n1+n2===2020){
        a = n1
        b = n2
        return true
      }  
    }
})

const result = a * b
console.log(result)