// NOTE: 1 -> remove duplicate elements from array;

function removeDuplicateElements(nums) {
  const newArr = [...new Set(nums)];
  return newArr.length !== nums.length;
}

// console.log(removeDuplicateElements([1, 2, 3, 1, 4, 2, 4, 4]));
// console.log(removeDuplicateElements([1, 2, 3, 1]));
// console.log([...new Set([1, 2, 2, 3, 3, 4, 1])]);

//NOTE: 2 -> missing number in range

var missingNumber = function (nums) {
  const sorted = nums.sort((a, b) => a - b);

  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] !== i) return i;
  }
  return sorted.length;
};

var missingNumber = function (nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  let actualSum = nums.reduce((sum, num) => sum + num, 0);

  return expectedSum - actualSum;
};

// console.log(missingNumber([0, 1]));

// NOTE: 3 -> find all the disappeared number in an array;

//TODO: this sol^n will take O(n) time

// var findDisappearedNumbers = function (arr) {
//   const uniqueSortedArr = [...new Set([...arr])];
//   const missingArr = [];
//   for (let i = 1; i <= arr.length; i++) {
//     if (!uniqueSortedArr.includes(i)) {
//       missingArr.push(i);
//     }
//   }
//   return missingArr;
// };

//TODO: this sol^n will take O(1) time

var findDisappearedNumbers = function (nums) {
  // Mark numbers that exist
  for (const num of nums) {
    const index = Math.abs(num) - 1;
    // HACK: this will help mark every value at index, only missing values will remain positive in the end. for example -> 8, 2 at index 4, 5 will be positive which mean 5 & 6 is missing in the array
    nums[index] = -Math.abs(nums[index]);
  }

  let res = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      res.push(i + 1);
    }
  }

  return res;
};

//TODO: this sol^n will take O(n) time

// var findDisappearedNumbers = function (nums, set = new Set(nums)) {
//   return nums.map((_, index) => index + 1).filter((v) => !set.has(v));
// };

// console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]));
// console.log(findDisappearedNumbers([1, 1]));
// console.log(Math.abs(-1.44545));

//NOTE: 4 -> two sum -> return indices of numbers whose sum === target

// var twoSum = function (nums, target) {
//   let indices = [];
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[i] + nums[j] === target) {
//         indices = [...indices, i, j];
//       }
//     }
//   }
//
//   return [...new Set(indices)];
// };

var twoSum = function (nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const remaining = target - nums[i];

    if (map.has(remaining)) {
      return [map.get(remaining), i];
    }

    map.set(nums[i], i);
  }
};

// console.log(twoSum([1, 3, 4, 6], 7));

// console.log(twoSum([-1, -2, -3, -4, -5], -8));

//NOTE: 5 -> how many numbers are smaller than the current number;

var smallerNumbersThanCurrent = function (nums) {
  const numsShorter = [];
  for (let i = 0; i < nums.length; i++) {
    let counter = 0;
    for (let j = 0; j < nums.length; j++) {
      if (nums[i] > nums[j]) {
        counter += 1;
      }
    }
    numsShorter.push(counter);
  }
  return numsShorter;
};

var smallerNumbersThanCurrent = function (nums) {
  const sortedArr = [...nums].sort((a, b) => a - b);
  return nums.map((el) => sortedArr.indexOf(el));
};

var smallerNumbersThanCurrent = function (nums) {
  let result = [];
  let obj = {};
  let order = [...nums].sort((a, b) => a - b);

  for (let i = 0; i < order.length; i++) {
    if (obj[order[i]] == null || undefined) {
      obj[order[i]] = i;
    }
  }

  for (let j = 0; j < nums.length; j++) {
    result.push(obj[nums[j]]);
  }

  return result;
};

var smallerNumbersThanCurrent = function (nums) {
  const sortedNums = [...nums].sort((a, b) => a - b);
  const rank = new Map();
  for (let i = 0; i <= sortedNums.length; i++) {
    if (!rank.has(sortedNums[i])) {
      rank.set(sortedNums[i], i);
    }
  }
  return nums.map((num) => rank.get(num));
};

// console.log(smallerNumbersThanCurrent([1, 4, 2, 3]));
// console.log(smallerNumbersThanCurrent([7, 7, 7, 7]));
// console.log(smallerNumbersThanCurrent([6, 5, 4, 8]));

//NOTE: 6 -> Minimum time visiting all the points;

var minTimeToVisitAllPoints = function (nums) {
  let [x1, y1] = nums.pop();
  let res = 0;
  while (nums.length > 0) {
    let [x2, y2] = nums.pop();
    res += Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    x1 = x2;
    y1 = y2;
  }
  return res;
};

var minTimeToVisitAllPoints = function (points) {
  let minTime = 0;

  for (let i = 0; i < points.length - 1; i++) {
    let [x1, y1] = points[i];
    let [x2, y2] = points[i + 1];

    minTime += Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
  }

  return minTime;
};

var minTimeToVisitAllPoints = function (points) {
  let totalTime = 0;
  for (let i = 0; i < points.length - 1; i++) {
    let dx = Math.abs(points[i + 1][0] - points[i][0]);
    let dy = Math.abs(points[i + 1][1] - points[i][1]);
    totalTime += Math.max(dx, dy);
  }
  return totalTime;
};

// console.log(
//   minTimeToVisitAllPoints([
//     [1, 1],
//     [3, 4],
//     [-1, 0],
//   ]),
// );
//
// console.log(
//   minTimeToVisitAllPoints([
//     [3, 2],
//     [-2, 2],
//   ]),
// );

// NOTE: 7 -> Spiral Matrix
var spiralOrder = function (matrix) {
  let result = [];
  if (matrix.length === 0) return result;

  let top = 0,
    bottom = matrix.length - 1;
  let left = 0,
    right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // Traverse from left to right
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++;

    // Traverse from top to bottom
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;

    if (top <= bottom) {
      // Traverse from right to left
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }

    if (left <= right) {
      // Traverse from bottom to top
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }

  return result;
};
// console.log(
//   spiralOrder([
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//   ]),
// );
// console.log(
//   spinalOrder([
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//   ]),
// );
// console.log(
//   spinalOrder([
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//     [13, 14, 15, 16],
//     [17, 18, 19, 20],
//     [21, 22, 23, 24],
//   ]),
// );

// NOTE: 8 -> Number of Islands

var numIslands = function (grid) {
  let count = 0;
  let rows = grid.length;
  let cols = grid[0].length;

  // HACK: with DFS
  const dfs = (i, j) => {
    if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] === "0") return;
    grid[i][j] = "0";

    // Explore all directions
    dfs(i + 1, j); // Down
    dfs(i - 1, j); // Up
    dfs(i, j - 1); // Left
    dfs(i, j + 1); // Right
  };

  // HACK: with BFS

  const directions = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
  ];

  const bfs = (i, j) => {
    let queue = [[i, j]];
    grid[i][j] = "0"; // Mark as visited

    while (queue.length > 0) {
      let [r, c] = queue.shift();

      for (let [dr, dc] of directions) {
        let nr = r + dr,
          nc = c + dc;

        if (
          nr >= 0 &&
          nc >= 0 &&
          nr < rows &&
          nc < cols &&
          grid[nr][nc] === "1"
        ) {
          queue.push([nr, nc]);
          grid[nr][nc] = "0";
        }
      }
    }
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === "1") {
        count++;
        // bfs(i, j);
        dfs(i, j);
      }
    }
  }

  return count;
};

// console.log(
//   numIslands([
//     ["1", "1", "1", "1", "0"],
//     ["1", "1", "0", "1", "0"],
//     ["1", "1", "0", "0", "0"],
//     ["0", "0", "0", "0", "0"],
//   ]),
// );
//
// console.log(
//   numIslands([
//     ["1", "1", "0", "0", "0"],
//     ["1", "1", "0", "0", "0"],
//     ["0", "0", "1", "0", "0"],
//     ["0", "0", "0", "1", "1"],
//   ]),
// );

// NOTE: 9 (121) -> Best time to buy & sell stock

var maxProfit = function (prices) {
  let l = 0,
    r = 1;
  let maxP = 0;
  while (r != prices.length) {
    if (prices[l] < prices[r]) {
      let prof = prices[r] - prices[l];
      maxP = Math.max(maxP, prof);
    } else {
      l = r;
    }
    r += 1;
  }
  return maxP;
};

// var maxProfit = function (prices) {
//   let maxProfit = 0,
//     minStock = prices[0];
//   for (let i = 1; i < prices.length; i++) {
//     if (prices[i] < minStock) {
//       minStock = prices[i];
//     } else if (prices[i] - minStock > maxProfit) {
//       maxProfit = prices[i] - minStock;
//     }
//   }
//   return maxProfit;
// };

// console.log(maxProfit([7, 1, 5, 3, 6, 4]));
// console.log(maxProfit([7, 6, 4, 3, 1]));

// NOTE: 10 (977) ->  Squares of a Sorted Array

// var sortedSquares = function (nums) {
//   let squareArr = [];
//   for (let i = 0; i < nums.length; i++) {
//     squareArr.push(Math.abs(Math.pow(nums[i], 2)));
//   }
//   return squareArr.sort((a, b) => a - b);
// };

var sortedSquares = function (nums) {
  const n = nums.length;
  const ans = new Array(n);
  let start = 0,
    end = n - 1;
  for (let i = n - 1; i >= 0; i--) {
    if (Math.abs(nums[start]) >= Math.abs(nums[end])) {
      ans[i] = nums[start] * nums[start];
      start++;
    } else {
      ans[i] = nums[end] * nums[end];
      end--;
    }
  }
  return ans;
};

// console.log(sortedSquares([-4, -1, 0, 3, 10]));
// console.log(sortedSquares([-7, -3, 2, 3, 11]));

// NOTE:  11 (15) --> 3 Sum Triplets
var threeSum = function (nums) {
  let triplets = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    if (nums[i] > 0) break;
    const val = nums[i]; // current value as per current index
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const currentSum = val + nums[left] + nums[right];
      if (currentSum < 0) {
        // Move the left pointer +1 cause the current sum < 0
        left++;
      } else if (currentSum > 0) {
        // Move the right pointer +1 cause the current sum > 0
        right--;
      } else {
        triplets.push([nums[i], nums[left], nums[right]]);
        right--;
        left++;
        // if the current left pointer === previous left pointer, we don't want to repeat the same process, therefore increase it by one
        while (left < right && nums[left] === nums[left - 1]) {
          left++;
        }

        while (left < right && nums[right] === nums[right + 1]) {
          left++;
        }
      }
    }
  }
  return triplets;
};
// console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// const arr = [-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4];
// console.log(threeSum(arr));

//NOTE: 12 (845) -> Longest Mountain in Array

// var mountainArr = function (arr) {
//   let ret = 0;
//   for (let i = 1; i < arr.length - 1; i++) {
//     if (arr[i - 1] < arr[i] && arr[i] > arr[i + 1]) {
//       let left = i;
//       let right = left;
//       while (arr[left] > arr[left - 1] && left >= 0) {
//         left--;
//       }
//       while (arr[right] > arr[right + 1] && right <= arr.length - 1) {
//         right++;
//       }
//
//       ret = Math.max(ret, right - left + 1);
//     }
//   }
//   return ret;
// };

var mountainArr = function (arr) {
  let ret = 0;
  let n = arr.length;
  let i = 1;
  while (i < n - 1) {
    if (arr[i - 1] < arr[i] && arr[i] > arr[i + 1]) {
      let left = i;
      let right = left;
      while (arr[left] > arr[left - 1] && left >= 0) {
        left--;
      }
      while (arr[right] > arr[right + 1] && right <= arr.length - 1) {
        right++;
      }

      ret = Math.max(ret, right - left + 1);
      // change the current index to right to value
      i = right;
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
//   const n = nums.length;
//   let i = 0;
//   let j = 1;
//   while (i <= n - 1) {
//     if (j > n - 1) {
//       i++;
//       j = i + 1;
//     }
//     console.log({j})
//     if (nums[i] === nums[j] && Math.abs(i - j) <= k) {
//       // console.log({i, j});
//       return true;
//     } else {
//       j++;
//     }
//   }
//   return false;
// };

var containsNearbyDuplicate = function (nums, k) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i]) && Math.abs(i - map.get(nums[i]) <= k)) {
      return true;
    }
    map.set(nums[i], i);
  }
  return false;
};

// console.log(containsNearbyDuplicate([1, 2, 3, 1], 3));
// console.log(containsNearbyDuplicate([1, 0, 1, 1], 1));
// console.log(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2));

// NOTE: 14 (1200) -> Minimum Absolute Difference

// var minimumAbsDifference = function (arr) {
//   arr.sort((a, b) => a - b);
//   let min = Math.abs(arr[0] - arr[1]);
//   let results = [];
//   for (let i = 0; i < arr.length; i++) {
//     // const val = Math.abs(arr[i] - arr[i + 1]);
//     if (Math.abs(arr[i] - arr[i + 1]) < min) {
//       min = Math.abs(arr[i] - arr[i + 1]);
//     }
//   }
//   for (let j = 0; j < arr.length; j++) {
//     if (Math.abs(arr[j] - arr[j + 1]) === min) {
//       results.push([arr[j], arr[j + 1]]);
//     }
//   }
//   return results;
// };

// var minimumAbsDifference = function (arr) {
//   arr.sort((a, b) => a - b);
//   let minDiff = Infinity;
//   let result = [];
//   for (let i = 0; i < arr.length; i++) {
//     const currDiff = Math.abs(arr[i] - arr[i + 1]);
//     if (currDiff === minDiff) result.push([arr[i], arr[i + 1]]);
//     else if (currDiff < minDiff) {
//       minDiff = currDiff;
//       result = [[arr[i], arr[i + 1]]];
//     }
//   }
//   return result;
// };

// NOTE: BFS & DFS Problems starts here

var minimumAbsDifference = function (arr) {
  let minDiff = Infinity;
  let result = [];
  arr = new Int32Array(arr).sort();
  for (let i = 0; i < arr.length; i++) {
    const currDiff = Math.abs(arr[i + 1] - arr[i]);
    if (currDiff == minDiff) result.push([arr[i], arr[i + 1]]);
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
  let res = Infinity;
  let total = 0;
  nums = new Int32Array(nums).sort();
  let l = 0;
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

// console.log(minSubArrayLen(7, [4, 2, 1, 3]));
// console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
// console.log(minSubArrayLen(4, [1, 4, 4]));
// console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]));

// NOTE: 16 (136) -> Single Number

var singleNumber = function (nums) {
  let xor = 0;
  for (let i = 0; i < nums.length; i++) {
    // It returns 1 when bits are different
    xor ^= nums[i];
  }
  return xor;
};

// console.log(singleNumber([2, 2, 1]));

// NOTE:  17 (322) -> Coin Change

// var coinChange = function (nums, amount) {
//   if (amount === 0) return 0;
//   if (nums.includes(amount)) return 1;
//   nums = new Int32Array(nums).sort();
//   let pointer = nums.length - 1;
//   let start = nums[pointer];
//   let diff = Math.abs(amount - start);
//   let counter = 0;
//   console.log({ nums, diff, start, pointer });
//   while (diff > 0 && pointer >= 0) {
//     start = nums[pointer];
//     console.log({diff, start, counter});
//     // console.log(counter);
//     if (start > amount) {
//       pointer--;
//       start = nums[pointer];
//       diff = Math.abs(amount - start);
//     }
//     if (diff >= start) {
//       counter++
//       diff -= start;
//     }
//     else if (nums.indexOf(diff) !== -1) {
//       const index = nums.indexOf(diff)
//       diff = diff - nums[index];
//       counter++
//     }
//     else {
//       pointer--;
//     }
//   }
//   return diff !== 0 ? -1 : counter + 1;
// }

var coinChange = function (coins, amount) {
  let dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let c of coins) {
      if (i - c >= 0) {
        dp[i] = Math.min(dp[i], 1 + dp[i - c]);
      }
    }
  }
  return dp[amount - 1] === Infinity ? -1 : dp[amount];
};

// console.log(coinChange([1, 2, 5], 11)) // 3
// console.log(coinChange([2], 3)) // -1
// console.log(coinChange([1, 24584], 3)) // 3
// console.log(coinChange([1, 24584], 2)) // 2
// console.log(coinChange([1, 3, 5], 1)) //  1
// console.log(coinChange([1, 3, 5], 7))
// console.log(coinChange([1], 0)) // 0
// console.log(coinChange([1], 2)) // 2
// console.log(coinChange([1], 1)) // 1
// console.log(coinChange([2, 5, 10, 1], 27)) // 4
// console.log(coinChange([186, 419, 83, 408], 6249)) // 20

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

// console.log(climbStairs(3))

// NOTE: 19 (53) -> Maximum SubArray

// var maxSubArray = function (nums) {
//   if (nums.length === 1) return nums[0];
//   let dp = new Array(nums.length).fill(0);
//   for (let i = 0; i < nums.length; i++) {
//     const n = nums[i];
//     if (i === 0) {
//       dp[i] = n;
//     } else {
//       dp[i] = Math.max(n, dp[i - 1] + n);
//     }
//   }
//   return Math.max(...dp);
// };

// var maxSubArray = function (nums) {
//   if (!nums || nums.length === 0) return 0;
//   let maxSum = nums[0],
//     currentSum = 0;
//   for (const num of nums) {
//     if (currentSum < 0) {
//       currentSum = 0;
//     }
//     currentSum += num;
//     maxSum = Math.max(maxSum, currentSum);
//   }
//   return maxSum;
// };

var maxSubArray = function (nums) {
  if (!nums || nums.length === 0) return 0;
  let maxSum = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
};

// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// console.log(maxSubArray([1]));
// console.log(maxSubArray([5, 4, -1, 7, 8]));

// NOTE: 20 (338) -> Couting Bits
var countBits = function (n) {
  let arr = new Array(n + 1).fill(0);
  // NOTE this will be the starting offset, means we know that O has O 1's therefore start with offset === 1.
  let slidingNumber = 1;
  for (let i = 1; i <= n; i++) {
    if (slidingNumber * 2 === i) {
      slidingNumber = i;
    }
    arr[i] = 1 + arr[i - slidingNumber];
  }
  return arr;
};

var countBits = function (n) {
  let arr = new Array(n + 1).fill(0);
  // NOTE this will be the starting offset, means we know that O has O 1's therefore start with offset === 1.
  for (let i = 1; i <= n; i++) {
    // Bitwise Right shift every bit to right for ex 5 -> 101 shift's every bit to right so right most bit will be removed & becomes (010 -> 2);
    arr[i] = arr[i >> 1] + (i % 2);
  }
  return arr;
};
// console.log(countBits(2));
// console.log(countBits(3));
// console.log(countBits(4));

// NOTE: 21 (303) -> Range Sum Query - Immutable

var NumArray = function (nums) {
  const arr = new Array(nums.length);
  arr[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    arr[i] = arr[i - 1] + nums[i];
  }

  return arr;
};

function sumRange(arr, left, right) {
  if (left === 0) return arr[right];
  return arr[right] - arr[left - 1];
}
//

// const nums = [-2, 0, 3, -5, 2, -1];
// var obj = NumArray(nums);
// console.log(obj);
// var param_1 = sumRange(obj, 2, 5);
// console.log(param_1);

// NOTE: 22 (784) -> Letter Case Permuation

// var letterCasePermuation = function (s) {
//   let result = [];
//   function backTrack(index, path) {
//     if (index === s.length) {
//       result.push(path);
//       return;
//     }
//     const char = s[index];
//     if (!isNaN(char)) {
//       backTrack(index + 1, path + char);
//     } else {
//       backTrack(index + 1, path + char.toLowerCase());
//       backTrack(index + 1, path + char.toUpperCase());
//     }
//   }

//   backTrack(0, "");

//   return result;
// };

// var letterCasePermuation = function (s) {
//   let queue = [s];

//   for (let i = 0; i < s.length; i++) {
//     if (!isNaN(s[i])) continue; // Skip digits

//     let size = queue.length;
//     for (let j = 0; j < size; j++) {
//       let cur = queue.shift();

//       // Toggle case and push both versions
//       let chars = cur.split("");
//       chars[i] = chars[i].toLowerCase();
//       queue.push(chars.join(""));

//       chars[i] = chars[i].toUpperCase();
//       queue.push(chars.join(""));
//       console.log(queue);
//     }
//   }
//   return queue;
// };

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
//       dp[i] = [...dp[i - slidingNumber], nums[startIndex]];
//     }
//   }
//   return dp;
// }

// NOTE: more good sol^n from the video

var subsets = function (nums) {
  let result = [];
  function backTrack(start, path) {
    // result.push([...path]);
    //HACK: you can also do this instead of above syntax
    result.push(path.slice());

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backTrack(i + 1, path);
      path.pop();
    }
  }

  backTrack(0, []);

  return result;
};

// var subsets = function (nums) {
//   let res = [];
//
//   function helper(nums, i, subset) {
//     if (i === nums.length) {
//       res.push(subset.slice());
//       return;
//     }
//     helper(nums, i + 1, subset);
//     subset.push(nums[i]);
//     helper(nums, i + 1, subset);
//     subset.pop();
//   }
//   helper(nums, 0, []);
//   return res;
// };

// console.log(subsets([1, 2, 3]));

// const arr = [4, 44, 35, 100];
// const arrCloned = [...arr];

// NOTE: 24 (77) -> Combinations
var combine = function (n, k) {
  let result = [];
  function backTrack(start, path) {
    if (path.length === k) {
      result.push(path.slice());
      return;
    }

    for (let i = start; i <= n; i++) {
      path.push(i);
      backTrack(i + 1, path);
      path.pop();
    }
  }

  backTrack(1, []);

  return result;
};

// console.log(combine(4, 2));

// NOTE: 25 (46) MEDIUM -> Permutations

var permute = function (nums) {
  let result = [];
  function backtrack(start, end) {
    if (start === end) {
      result.push(nums.slice());
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

// const arr = [4, 44, 30];
// const str = "hello";
