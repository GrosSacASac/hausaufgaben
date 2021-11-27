
const countDivisors = function(x) {
    let count = 0
    const end = x**0.5;
    for (let i = 1; i < end; i+=1) {
        if (x % i === 0) {
            count += 2;
        }
    }
    if (end * end === x)  {
        // Perfect square
        count+=1;
    }
    return count
}

let i = 0;
let divisors =0
let triangleNumber = 0
while (divisors <= 500) {
    triangleNumber += i;
    divisors = countDivisors(triangleNumber)
    i +=1 
}

console.log(triangleNumber)