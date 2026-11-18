/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let searching = true;
    let i=0;
    //let j=1;
    while (searching) {
        for (let j=i+1; j < nums.length; j+=1) {
            const tentative = nums[i] + nums[j];
            if (tentative === target) {
                searching = false;
                return [i, j];
            }
        }
        i += 1; // assume we find something
    }
};
const cases = [
    [[2,7,11,15], 9],
    [[3,2,4], 6],
    [[3,3], 6],
];

cases.forEach(inputs => {
    console.log("Running for input");
    console.log(...inputs);
    console.time("time")
    console.log(twoSum(...inputs));
    console.timeEnd("time")
});