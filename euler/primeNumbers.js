// find n prime numbers
// 1. find all prime numbers from 1 to n
const primes = [2];
const n = 1000000;
for (let i = 3; i <= n; i+=2) {
    let isPrime = true;
    for (let j = 0; j < primes.length; j++) {
        if (i % primes[j] === 0) {
            isPrime = false;
            break;
        }
    }
    if (isPrime) {
        primes.push(i);
    }
}
console.log(primes);