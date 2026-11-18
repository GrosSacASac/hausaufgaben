/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const joined = nums1.concat(nums2);
    joined.sort((a, b) => a - b);
    const middleIndex = (joined.length / 2);
    if (!isInteger(middleIndex)) {
        return joined[Math.floor(middleIndex)];
    }
    return (joined[middleIndex-1] + joined[middleIndex]) / 2;
};

var isInteger = (a) => {
    return Math.trunc(a) === a;
};
const cases = [
    [[1,3], [2]],
    [[1,2], [3,4]],
    [[1,1,1,1], [9,9,9]],
];

const myfunction = findMedianSortedArrays;
cases.forEach(inputs => {
    console.log("\nRunning for input");
    console.log(...inputs);
    console.time("time")
    console.log(myfunction(...inputs));
    console.timeEnd("time")
});