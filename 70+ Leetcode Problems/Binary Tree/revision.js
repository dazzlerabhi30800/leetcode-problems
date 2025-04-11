// NOTE: 39 (637) ->  Average levels in a binary tree

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

var averageOfLevels = function (root) {
  if (!root) return 0;
  const queue = [root];
  let result = [];
  while (queue.length) {
    const size = queue.length;
    let sum = 0;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      sum += node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(sum / size);
  }

  return result;
};

// NOTE: 40 (111) -> Minimum Depth of a tree

var minimumDepth = function (root) {
  if (!root) return 0;
  const queue = [[root, 1]];
  while (queue.length) {
    for (let i = 0; i < queue.length; i++) {
      const [node, level] = queue.shift();
      if (!node.left && !node.right) {
        return level;
      }
      if (node.left) {
        queue.push([node.left, level + 1]);
      }
      if (node.right) {
        queue.push([node.right, level + 1]);
      }
    }
  }
  return 0;
};

// NOTE: 40 (104) -> Maximum Depth of a tree
var maxDepth = function (root) {
  if (!root) return;
  const queue = [[root, 1]];
  let sum = 0;
  while (queue.length) {
    const [node, level] = queue.shift();
    if (node.left) {
      queue.push([node.left, level + 1]);
    }
    if (node.right) {
      queue.push([node.right, level + 1]);
    }
    sum = Math.max(level, sum);
  }
  return sum;
};
var maxDepthRec = function (root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepthRec(root.left), maxDepthRec(root.right));
};

//NOTE: NOT A LEETCODE QUESTION -> Max value in a binary tree (remember binary tree are not sorted compare to binary search tree)

var minMaxTree = function (root) {
  const queue = [root];
  let maxSum = 0;
  while (queue.length) {
    const currNode = queue.shift();
    if (currNode.left) {
      queue.push(currNode.left);
    }
    if (currNode.right) {
      queue.push(currNode.right);
    }
    maxSum = Math.max(maxSum, currNode.val);
  }
  return maxSum;
};

// NOTE:  43 (102) -> Binary Level order Traversal
var levelOrder = function (root) {
  const queue = [root];
  const result = [];
  while (queue.length) {
    const size = queue.length;
    const order = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      order.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    result.push(order);
  }

  return result;
};

var levelOrderRec = function (root) {
  const res = [];
  function dfs(node, level) {
    if (!node) return;
    if (!res[level]) {
      res[level] = [];
    }
    res[level].push(node.val);
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }

  dfs(root, 0);
  return res;
};

// NOTE: 44 (100) -> same tree

var isSameTree = function (p, q) {
  const stack = [[p, q]];
  while (stack.length) {
    const [node1, node2] = stack.shift();
    if (!node1 && !node2) continue;
    if (!node1 || !node2 || node1.val !== node2.val) return false;
    stack.push([node1.left, node2.left]);
    stack.push([node1.right, node2.right]);
  }
  return true;
};

var isSameTreeRec = function (p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTreeRec(p.left, q.left) && isSameTreeRec(p.right, q.right);
};

// NOTE: 45 (112) -> Path sum
var pathSum = function (root, targetSum) {
  if (!root) return false;
  const stack = [[root, root.val]];
  while (stack.length) {
    const [node, val] = stack.pop();
    if (!node.left && !node.right && val === targetSum) {
      return true;
    }
    if (node.right) {
      stack.push([node.right, val + 1]);
    }
    if (node.left) {
      stack.push([node.left, val + 1]);
    }
  }
  return false;
};

// NOTE: 46 (543) -> Diameter of a binary tree
var diameterOfBinaryTree = function (root) {
  const stack = [[root, false]];
  const depthMap = new Map();
  let diameter = 0;
  while (stack.length) {
    const [node, visit] = stack.pop();
    if (!visit) {
      stack.push([node, true]);
      if (node.left) {
        stack.push([node.left, false]);
      }
      if (node.right) {
        stack.push([node.right, false]);
      }
    } else {
      let leftHeight = node.left ? depthMap.get(node.left) || 0 : 0;
      let rightHeight = node.right ? depthMap.get(node.right) || 0 : 0;
      diameter = Math.max(diameter, leftHeight + rightHeight);
      depthMap.set(node, Math.max(leftHeight, rightHeight) + 1);
    }
  }
  return diameter;
};

var diameterOfBinaryTreeRec = function (root) {
  let diameter = 0;
  function depth(root) {
    if (!root) return 0;
    let leftHeight = depth(root.left);
    let rightHeight = depth(root.right);
    diameter = Math.max(diameter, leftHeight + rightHeight);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  depth(root);
  return diameter;
};

// NOTE: 47 (226) -> Invert a binary tree
var invertBinaryTree = function (root) {
  if (!root) return [];
  const stack = [root];
  while (queue.length) {
    let currNode = stack.pop();
    if (curr) {
      [currNode.left, currNode.right] = [currNode.right, currNode.left];
      stack.push(currNode.left, currNode.right);
    }
  }

  return root;
};

var invertBinaryTreeRec = function (root) {
  if (root) {
    [root.left, root.right] = [
      invertBinaryTreeRec(root.right),
      invertBinaryTreeRec(root.left),
    ];
  }
  return root;
};

// NOTE: 48(236) -> Lowest common Ancestor of a Binary Tree
var lowestCommonAncestor = function (root, p, q) {
  const queue = [root];
  const parentsMap = new Map();
  while (queue.length) {
    const node = queue.shift();
    if (node.left) {
      queue.push(node.left);
      parentsMap.set(node.left, node);
    }
    if (node.right) {
      queue.push(node.right);
      parentsMap.set(node.right, node);
    }
    if (parentsMap.has(p) || parentsMap.has(q)) {
      break;
    }
  }
  let pointer1 = p,
    pointer2 = q;
  while (pointer1 !== pointer2) {
    pointer1 = pointer1.get(p) ?? q;
    pointer2 = pointer2.get(q) ?? p;
  }

  return pointer1;
};

var lowestCommoneAncestorRec = function (root, p, q) {
  if (!root || root === q || root === p) return root;
  let left = lowestCommoneAncestorRec(root.left, p, q);
  let right = lowestCommoneAncestorRec(root.right, p, q);
  if (left && right) return root;
  return left || right;
};

const root = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7)),
);

const root2 = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7)),
);
// console.log(averageOfLevels(root));
// console.log(minimumDepth(root));
// console.log(maxDepth(root));
// console.log(maxDepthRec(root));
// console.log(minMaxTree(root));
// console.log(levelOrder(root));
// console.log(levelOrderRec(root));
console.log(isSameTree(root, root2));
console.log(isSameTreeRec(root, root2));
