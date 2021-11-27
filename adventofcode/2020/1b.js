import {numbers} from "./1input.js";

let a;
let b;
let c;

numbers.some((n1, i) => {
    for (let j = i + 1;  j <numbers.length; j+=1) {
      const n2 = numbers[j];
      if (n1+n2>=2020){
          continue;
      }
      for (let k = j + 1;  k <numbers.length; k+=1) {
        const n3 = numbers[k];
        if (n1+n2+n3===2020){
            a = n1
            b = n2
            c = n3
            return true
        }
      }
    }
})

const result = a * b * c
console.log(result)