function isDuplicateElements(nums) {
  const newArr = [...new Set(nums)];
  return newArr.length !== nums.length;
}

// NOTE: 2

// var missingNumber = function (nums) {
//   const sorted = nums.sort((a, b) => a - b);
//   for (let i = 0; i < sorted.length; i++) {
//     if (sorted[i] !== i) return i;
//   }
//   return sorted.length;
// };

var missingNumber = function (nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  let actualSum = nums.reduce((sum, num) => sum + num, 0);

  return expectedSum - actualSum;
};

// console.log(missingNumber([0, 1, 2, 4, 5]));

// var findDisappearedNumbers = function (arr) {
//   const uniqueArr = [...new Set([...arr])];
//   const missingArr = [];
//   for (let i = 1; i <= arr.length; i++) {
//     if (!uniqueArr.includes(i)) {
//       missingArr.push(i);
//     }
//   }
//   return missingArr;
// };

var findDisappearedNumbers = function (nums) {
  for (const num of nums) {
    const index = Math.abs(num) - 1;
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

// console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]));

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
//
// console.log(twoSum([-1, -2, -3, -4, -5], -8));

// NOTE: 5

var smallerNumbersThanCurrent = function (nums) {
  let obj = {};
  let order = [...nums].sort((a, b) => a - b);

  for (let i = 0; i < order.length; i++) {
    if (obj[order[i]] == null || undefined) {
      obj[order[i]] = i;
    }
  }
  return Array.from(order.keys());
};

console.log(smallerNumbersThanCurrent([1, 4, 2, 3]));

// NOTE: 8 -> Number of Islands

var numIslands = function (grid) {
  let count = 0;
  let rows = grid.length;
  let cols = grid[0].length;

  // HACK: with DFS
  const dfs = (i, j) => {
    if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] === "0") return;
    grid[i][j] = "0";

    // Search Top
    dfs(i - 1, j);
    // Search bottom
    dfs(i + 1, j);
    // Search left
    dfs(i, j - 1);
    // Search right
    dfs(i, j + 1);
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

// NOTE: 9 (121) -> Best time to buy stock

var maxProfit = function (prices) {
  let l = 0;
  let r = 1;
  let maxProf = 0;
  while (r !== prices.length) {
    if (prices[l] < prices[r]) {
      const prof = prices[r] - prices[l];
      maxProf = Math.max(maxProf, prof);
    } else {
      l = r;
    }
    r += 1;
  }

  return maxProf;
};

// console.log(maxProfit([7, 1, 5, 3, 6, 4]));
// console.log(maxProfit([7, 6, 4, 3, 1]));

// NOTE: 10 (977) -> Squares of a Sorted array

var sortedSquares = function (nums) {
  const n = nums.length;
  const arr = new Array(n);
  let start = 0,
    end = n - 1;
  for (let i = n - 1; i >= 0; i--) {
    if (Math.abs(nums[start]) >= Math.abs(nums[end])) {
      arr[i] = nums[start] * nums[start];
      start++;
    } else {
      arr[i] = nums[end] * nums[end];
      end--;
    }
  }

  return arr;
};

// console.log(sortedSquares([-4, -1, 0, 3, 10]));
// console.log(sortedSquares([-7, -3, 2, 3, 11]));

// NOTE:  11 (15) --> 3 Sum Triplets
