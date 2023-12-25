// https://leetcode.com/problems/two-sum/description/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const numMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const complement = target - num;

    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }

    numMap.set(num, i);
  }

  return [];
};

export default function run() {
  const nums = [2, 7, 11, 16];
  const target = 9; // [0, 1];
  // const nums = [3, 2, 4];
  // const target = 6; // [1, 2]

  console.log(twoSum(nums, target));
}
