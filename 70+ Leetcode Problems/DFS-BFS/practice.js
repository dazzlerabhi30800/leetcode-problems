// NOTE: 121 -> Best time to buy and Sell Stock

var maxProfit = function (prices) {
  if (prices.length <= 1) return 0;
  let maxProfit = 0,
    minProfit = prices[0];
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < minProfit) minProfit = prices[i];
    maxProfit = Math.max(maxProfit, prices[i] - minProfit);
  }
  return maxProfit;
};

// console.log(maxProfit([7, 1, 5, 3, 6, 4]));
// let arr = [7, 6, 4, 3, 1];
// console.log(maxProfit(arr));

// NOTE: 977 -> Squares of sorted Array

// var sortedSquares = function (nums) {
//   return nums.map((num) => num * num).sort((a, b) => a - b);
// };

// var sortedSquares = function (nums) {
//   let left = 0,
//     right = nums.length - 1,
//     results = [];
//   for (let i = nums.length - 1; i >= 0; i--) {
//     const leftSqr = nums[left] * nums[left];
//     const rightSqr = nums[right] * nums[right];
//     console.log({ i, left, right, leftSqr, rightSqr });
//     if (leftSqr > rightSqr) {
//       results[i] = leftSqr;
//       left++;
//     } else {
//       results[i] = rightSqr;
//       right--;
//     }
//   }
//   return results;
// };

var sortedSquares = function (nums) {
  const n = nums.length;
  let left = 0,
    right = n - 1,
    results = new Array(n),
    pos = n - 1;
  while (left <= right) {
    let leftSqr = nums[left] * nums[left];
    let rightSqr = nums[right] * nums[right];

    if (leftSqr > rightSqr) {
      results[pos] = leftSqr;
      left++;
    } else {
      results[pos] = rightSqr;
      right--;
    }
    pos--;
  }
  return results;
};

// console.log(sortedSquares([-4, -1, 0, 3, 10]));

// const arr = [, , , 44];
// console.log(arr.filter((item) => item !== undefined));

// NOTE:  11 (15) --> 3 Sum Triplets

var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let triplet = [];
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let l = 1;
    let r = n - 1;
    while (l < r) {
      const totalSum = nums[i] + nums[l] + nums[r];
      if (totalSum < 0) {
        l++;
      } else if (totalSum > 0) {
        r--;
      } else {
        triplet.push([nums[i], nums[l], nums[r]]);
        l++;
        r--;
        while (l < r && nums[l] === nums[l - 1]) {
          l++;
        }

        while (l < r && nums[r] === nums[r + 1]) {
          r++;
        }
      }
    }
  }
  return triplet;
};

// console.log(threeSum([-1, 0, 1, 2, -1, -4]));

//NOTE: 12 (845) -> Longest Mountain in Array

var mountainArr = function (arr) {
  const n = arr.length;
  let ret = 0;
  let i = 1;
  while (i < n - 1) {
    if (arr[i - 1] < arr[i] && arr[i] > arr[i + 1]) {
      let l = i;
      let r = l;

      while (arr[l] > arr[l - 1] && l >= 0) {
        l--;
      }
      while (arr[r] > arr[r + 1] && r <= n - 1) {
        r++;
      }
      ret = Math.max(ret, r - l + 1);
      i = r;
    } else {
      i++;
    }
  }

  return ret;
};

// console.log(mountainArr([2, 1, 4, 7, 3, 2, 5]));
// console.log(mountainArr([2, 2, 2]));

// NOTE: 13 (219) ->  Contains Duplicate

// var containsNearbyDuplicate = function (nums, k) {
//   const map = new Map();
//   for (let i = 0; i < nums.length; i++) {
//     if (map.has(nums[i]) && Math.abs(i - map.get(nums[i]) <= k)) {
//       return true;
//     }
//     map.set(nums[i], i);
//   }
//   return map;
// };
//
// console.log(containsNearbyDuplicate([1, 2, 3, 1], 3));
// console.log(containsNearbyDuplicate([1, 0, 1, 1], 1));
// console.log(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2));

// NOTE: 14 (1200) -> Minimum Absolute Difference

var minimumAbsDifference = function (arr) {
  let minDiff = Infinity;
  let result = [];
  arr = new Int32Array(arr).sort();
  for (let i = 0; i < arr.length; i++) {
    const currDiff = Math.abs(arr[i + 1] - arr[i]);
    if (currDiff === minDiff) result.push([arr[i], arr[i + 1]]);
    else if (currDiff < minDiff) {
      minDiff = currDiff;
      result = [[arr[i], arr[i + 1]]];
    }
  }
  return result;
};

// console.log(minimumAbsDifference([4, 2, 1, 3]));
// const arr = [1, 3, 6, 10, 15];
// console.log(minimumAbsDifference(arr));
// console.log(minimumAbsDifference([40, 11, 26, 27, -20]));
// console.log(minimumAbsDifference([-10, 23]));

// NOTE: 15 (209) -> Minimus Size SubArray Sum;
var minSubArrayLen = function (target, nums) {
  let l = 0;
  let res = Infinity;
  let total = 0;
  for (let r = 0; r < nums.length; r++) {
    total += nums[r];
    while (total >= target) {
      res = Math.min(res, r - l + 1);
      total -= nums[l];
      l += 1;
    }
  }
  return res === Infinity ? 0 : res;
};

// console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
// console.log(minSubArrayLen(4, [1, 4, 4]));

// NOTE: 16 (136) -> Single Number

var singleNumber = function (nums) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      map.delete(nums[i]);
    } else {
      map.set(nums[i], nums[i]);
    }
  }
  return [...map.values()][0];
};

// var singleNumber = function (nums) {
//   let xor = 0;
//   for (let i = 0; i < nums.length; i++) {
//     xor ^= nums[i]
//   }
//   return xor;
// }

// console.log(singleNumber([2, 2, 1]));
// console.log(singleNumber([4, 1, 2, 1, 2]));

// NOTE:  17 (322) -> Coin Change
var coinChange = function (coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 0; i <= amount; i++) {
    for (let c of coins) {
      if (i - c >= 0) {
        dp[i] = Math.min(dp[i], dp[i - c] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};

// console.log(coinChange([1, 2, 5], 11)); // 3

// NOTE: 18 (70) -> Climbing Stairs
var climbStairs = function (n) {
  let dp = new Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};

// console.log(climbStairs(3));

// NOTE: 19 (53) -> Maximum SubArray

// var maxSubArray = function (nums) {
//   const arr = new Array(nums.length).fill(0);
//   arr[0] = nums[0];
//   for (let i = 1; i < nums.length; i++) {
//     arr[i] = Math.max(nums[i], arr[i - 1] + nums[i]);
//   }
//   return Math.max(...arr);
// };

// var maxSubArray = function (nums) {
//   let currentSum = 0;
//   let maxSum = nums[0];
//   for (let i = 0; i < nums.length; i++) {
//     if (currentSum < 0) {
//       currentSum = 0;
//     }
//     currentSum += nums[i];
//     maxSum = Math.max(maxSum, currentSum);
//   }
//   return maxSum;
// };

// var maxSubArray = function (nums) {
//   let currentSum = nums[0];
//   let maxSum = nums[0];
//   for (let i = 0; i < nums.length; i++) {
//     currentSum = Math.max(nums[i], currentSum + nums[i]);
//     maxSum = Math.max(currentSum, maxSum);
//   }
//   return maxSum;
// };

// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

// NOTE: 20 (338) -> Couting Bits

var countBits = function (n) {
  const dp = new Array(n + 1).fill(0);
  let sliding = 1;
  for (let i = 1; i <= n; i++) {
    if (sliding * 2 === i) {
      sliding = i;
    }
    dp[i] = 1 + dp[i - sliding];
  }
  return dp;
};

// console.log(countBits(4));

// NOTE: 21 (303) -> Range Sum Query - Immutable

var numArray = function (nums) {
  const dp = new Array(nums.length);
  dp[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const val = nums[i];
    dp[i] = val + dp[i - 1];
  }

  return dp;
};

function sumRange(arr, left, right) {
  if (left === 0) return arr[right];
  return arr[right] - arr[left - 1];
}

// const nums = [-2, 0, 3, -5, 2, -1];
// var obj = numArray(nums);
// var param_1 = sumRange(obj, 2, 5);
// console.log(param_1);

// NOTE: 22 (784) -> Letter Case Permuation

// var letterCasePermuation = function (s) {
//   let result = [];
//   function backTrack(path, index) {
//     if (index === s.length) {
//       result.push(path);
//       return;
//     }

//     const char = s[index];
//     if (!isNaN(char)) {
//       backTrack(path + char, index + 1);
//     } else {
//       backTrack(path + char.toLowerCase(), index + 1);
//       backTrack(path + char.toUpperCase(), index + 1);
//     }
//   }
//   backTrack("", 0);

//   return result;
// }

var letterCasePermuation = function (s) {
  let queue = [s];

  for (let i = 0; i < s.length; i++) {
    if (!isNaN(s[i])) continue;

    let size = queue.length;

    for (let j = 0; j < size; j++) {
      let cur = queue.shift();

      let chars = cur.split("");
      chars[i] = chars[i].toLowerCase();
      queue.push(chars.join(""));

      chars[i] = chars[i].toUpperCase();
      queue.push(chars.join(""));
    }
  }

  return queue;
};

// console.log(letterCasePermuation("a1b2"));

// NOTE:  23 (78) subsets

// function subsets(nums) {
//   const dp = new Array(Math.pow(2, nums.length));
//   dp[0] = [];
//   let startIndex = 0;
//   let slidingNumber = 1;
//   for (let i = 1; i < dp.length; i++) {
//     if (slidingNumber * 2 === i) {
//       slidingNumber = i;
//       startIndex++;
//       dp[i] = [nums[startIndex]];
//     } else if (i === 1) {
//       dp[i] = [nums[startIndex]];
//     } else {
//       dp[i] = [...dp[i - slidingNumber], dp[startIndex]];
//     }
//   }
//   return dp;
// }

function subsets(nums) {
  let result = [];
  function backtrack(start, path) {
    result.push(path.slice());

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }

  backtrack(0, []);
  return result;
  t;
}

// console.log(subsets([1, 2, 3]));

// NOTE:  24(77) -> Combinations

var combine = function (n, k) {
  let result = [];
  function backtrack(start, path) {
    if (path.length === k) {
      result.push(path.slice());
      return;
    }

    for (let i = start; i <= n; i++) {
      path.push(i);
      backtrack(i + 1, path);
      path.pop();
    }
  }

  backtrack(1, []);
  return result;
};

// console.log(combine(4, 2));

// NOTE: 25 (478) MEDIUM -> Permute

var permute = function (nums) {
  const result = [];

  function backtrack(start, end) {
    if (start === end) {
      result.push(nums.slice());
      return;
    }
    for (let i = start; i < end; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]];
      backtrack(start + 1, end);
      [nums[start], nums[i]] = [nums[i], nums[start]];
    }
  }

  backtrack(0, nums.length);

  return result;
};

console.log(permute([1, 2, 3]));
