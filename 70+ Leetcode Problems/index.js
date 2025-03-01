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

// NOTE: 9 ->

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

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([7, 6, 4, 3, 1]));
