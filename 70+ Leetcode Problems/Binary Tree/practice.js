// NOTE: 39 (637) ->  Average levels in a binary tree

class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

var averageOfLevels = function (root) {
  if (!root) return [];
  let queue = [root];
  const result = [];
  while (queue.length) {
    let levelSize = queue.length;
    let sum = 0;
    for (let i = 0; i < levelSize; i++) {
      let node = queue.shift();
      sum += node.value;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(sum / levelSize);
  }

  return result;
};

// NOTE: 40 (111) -> Minimum Depth of a tree
var minimumDepth = function (root) {
  if (!root) return 0;
  let sum = 0;
  let queue = [[root, 1]];
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
      sum += 1;
    }
  }

  return 0;
};

// Recursive
var minimumDepthRec = function (root) {
  if (!root) return 0;
  if (!root.left) return 1 + minimumDepthRec(root.left);
  if (!root.right) return 1 + minimumDepthRec(root.right);

  return 1 + Math.min(minimumDepthRec(root.left), minimumDepthRec(root.right));
};

// NOTE: 41 (104) -> maximum depth of a tree
var maxDepth = function (root) {
  if (!root) return 0;
  let queue = [[root, 1]];
  let sumLevel = 1;
  while (queue.length) {
    const [node, level] = queue.shift();

    if (node.right) {
      queue.push([node.right, level + 1]);
    }
    if (node.left) {
      queue.push([node.left, level + 1]);
    }
    sumLevel = level;
  }
  return sumLevel;
};

// Recursive
var maxDepthRec = function (root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

// NOTE: 42 ->  NOT A LEETCODE QUESTION -> Max value in a binary tree (remember binary tree are not sorted compare to binary search tree)
var minMaxTree = function (root) {
  const queue = [root];
  let max_node = 0;
  while (queue.length) {
    const currentNode = queue.shift();
    if (currentNode.left) {
      queue.push(currentNode.left);
    }
    if (currentNode.right) {
      queue.push(currentNode.right);
    }
    max_node = Math.max(max_node, currentNode.value);
  }

  return max_node;
};

var minMaxTreeRec = function (root) {
  if (!root) return -Infinity;
  return Math.max(
    root.value,
    minMaxTreeRec(root.left),
    minMaxTreeRec(root.right),
  );
};

// NOTE:  43 (102) -> Binary Level order Traversal

var levelOrder = (root) => {
  if (!root) return [];
  const queue = [root];
  const order = [];
  while (queue.length) {
    const size = queue.length;
    const level = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
      level.push(node.value);
    }
    order.push(level);
  }
  return order;
};

// NOTE: 44 (100) -> same tree
var isSameTree = function (p, q) {
  // if (!p || !q) return false;
  const stack = [[p, q]];
  while (stack.length) {
    const [node1, node2] = stack.pop();
    if (!node1 && !node2) continue;
    if (!node1 || !node2 || node1.value !== node2.value) {
      return false;
    }
    stack.push([node1.left, node2.left]);
    stack.push([node1.right, node2.right]);
  }
  return true;
};

var isSameTreeRec = function (p, q) {
  if (!p && !q) return true;
  if (!p || !q || q.value !== p.value) return false;
  return isSameTreeRec(p.left, q.left) && isSameTreeRec(p.right, q.right);
};

// NOTE: 45 (112) -> Path sum
var pathSum = function (root, targetSum) {
  if (!root) return false;
  const stack = [[root, root.value]];
  while (stack.length) {
    const [node, val] = stack.pop();
    if (!node.left && !node.right && val === targetSum) {
      return true;
    }
    if (node.right) {
      stack.push([node.right, val + node.right.value]);
    }
    if (node.left) {
      stack.push([node.left, val + node.left.value]);
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
  function depth(node) {
    if (!node) return 0;
    let leftHeight = depth(root.left);
    let rightHeight = depth(root.right);
    diameter = Math.max(diameter, leftHeight + rightHeight);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(root);
  return diameter;
};

// NOTE: 47 (226) -> Invert a binary tree
var invertTree = function (root) {
  const stack = [root];
  while (stack.length) {
    let curr = stack.pop();
    if (curr) {
      [curr.left, curr.right] = [curr.right, curr.left];
      stack.push(curr.left, curr.right);
    }
  }
  return root;
};

// NOTE: Recursive
var invertTreeRec = function (root) {
  if (root) {
    [root.left, root.right] = [
      invertTreeRec(root.right),
      invertTreeRec(root.left),
    ];
  }
  return root;
};

// NOTE: 48(236) -> Lowest common Ancestor of a Binary Tree
var lowestCommonAncestor = function (root, p, q) {
  const queue = [root];
  const parents = new Map();
  parents.set(root, null);
  while (queue.length) {
    const node = queue.shift();
    if (node.left) {
      queue.push(node.left);
      parents.set(node.left, node);
    }
    if (node.right) {
      queue.push(node.right);
      parents.set(node.right, node);
    }
    if (parents.has(p) && parents.has(q)) {
      break;
    }
  }

  // HACK: more time complexity

  // const ancestors = new Set();
  // while (p) {
  //   ancestors.add(p);
  //   p = parents.get(p);
  // }
  // while (q) {
  //   if (ancestors.has(q)) {
  //     return q;
  //   }
  //   q = parents.get(q);
  // }

  // HACK: MORE Good sol^n
  let [pointer1, pointer2] = [p, q];
  while (pointer1 !== pointer2) {
    pointer1 = parents.get(pointer1) ?? q;
    pointer2 = parents.get(pointer2) ?? p;
  }

  return pointer1;
};

//NOTE: Recursive solution
var lowestCommonAncestorRec = function (root, p, q) {
  if (!root || p === root || q === root) return root;
  let left = lowestCommonAncestorRec(root.left, p, q);
  let right = lowestCommonAncestorRec(root.right, p, q);
  if (right && left) return root;
  return right || left;
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

const root3 = new TreeNode(
  5,
  new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))),
  new TreeNode(8, new TreeNode(13), new TreeNode(4, null, new TreeNode(1))),
);
// const test4 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
const root4 = new TreeNode(
  4,
  new TreeNode(2, new TreeNode(1), new TreeNode(3)),
  new TreeNode(7, new TreeNode(6), new TreeNode(9)),
);

// console.log(averageOfLevels(root));
// console.log(minimumDepth(root));
// console.log(minimumDepthRec(root));
// console.log(maxDepth(root));
// console.log(maxDepthRec(root));
// console.log(minMaxTree(root));
// console.log(minMaxTreeRec(root));
// console.log(levelOrder(root));
// console.log(isSameTree(root, root2));
// console.log(isSameTreeRec(root, root2));
// console.log(pathSum(root3, 22));
// console.log(pathSum(test4, 22));
// console.log(invertTree(root4, 22));
// console.log(invertTreeRec(root4, 22));

const root5 = new TreeNode(
  3,
  new TreeNode(
    5,
    new TreeNode(6),
    new TreeNode(2, new TreeNode(7), new TreeNode(4)),
  ),
  new TreeNode(1, new TreeNode(0), new TreeNode(8)),
);

console.log(lowestCommonAncestor(root5, 5, 1));
