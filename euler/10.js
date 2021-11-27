const findPrimes = max => {
    const primes = []
    nextPrime:
    for (let i = 2; i < max; i+= 1) {
        const square = Math.floor(1 + i ** 0.5)
        for (let dividor=0,  primeIndex =0; dividor < square; primeIndex += 1) {
            dividor = primes[primeIndex]
            if (i % dividor === 0) {
                // console.log(`${i} is dividable by ${dividor}`)
                continue nextPrime;
            }
        }
        primes.push(i)
    }
    return primes
}

const findSumOfPrimes = max => {
    const primes = findPrimes(max);
    return primes.reduce((a, b) => {
        return a+b
    }, 0)
}

console.time("s")
const sumOfPrimes = findSumOfPrimes(2*10**6);
console.timeEnd("s")
console.log(sumOfPrimes)