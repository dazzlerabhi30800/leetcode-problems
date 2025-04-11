class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
class BST {
  constructor() {
    this.root = null;
  }
  insert(val) {
    const node = new TreeNode(val);
    if (!this.root) {
      this.root = node;
      return;
    }
    let temp = this.root;
    while (true) {
      if (node.val === temp.val) return undefined;
      if (node.val > temp.val) {
        if (!temp.right) {
          temp.right = node;
          return this;
        }
        temp = temp.right;
      } else {
        if (!temp.left) {
          temp.left = node;
          return this;
        }
        temp = temp.left;
      }
    }
  }
  find(val) {
    if (!this.root) return null;
    if (this.root.val === val) return this.root;
    let temp = this.root;
    while (temp) {
      if (temp.val > val) {
        temp = temp.left;
      } else if (temp.val < val) {
        temp = temp.right;
      } else {
        return temp;
      }
    }

    return null;
  }
}

let myTree = new BST();
myTree.insert(4);
myTree.insert(8);
myTree.insert(3);
myTree.insert(2);
myTree.insert(7);
console.log(myTree.find(8));
// console.log(myTree);

//NOTE: 51 (108) -> converted sorted array into binary tree
var sortedArray = function (arr) {
  if (!arr.length) return null;
  const n = arr.length;
  let mid = Math.floor(n / 2);
  const root = new TreeNode(arr[mid]);
  const queue = [
    [root, 0, mid - 1],
    [root, mid + 1, n - 1],
  ];
  while (queue.length) {
    const [parent, left, right] = queue.shift();
    if (right >= left) {
      mid = Math.floor((left + right) / 2);
      const child = new TreeNode(arr[mid]);
      if (parent.val > child.val) {
        parent.left = child;
      } else {
        parent.right = child;
      }
      queue.push([child, left, mid - 1]);
      queue.push([child, mid + 1, right]);
    }
  }

  return root;
};

var sortedArrayBstRec1 = function (arr) {
  function convert(left, right) {
    if (left > right) return null;
    let mid = Math.floor((left + right) / 2);
    let node = new TreeNode(arr[mid]);
    node.left = convert(left, mid - 1);
    node.right = convert(mid + 1, right);
    return node;
  }

  return convert(0, arr.length - 1);
};

var sortedArrayBstRec2 = function (arr) {
  if (!arr.length) return null;
  let mid = Math.floor(arr.length / 2);
  let node = new TreeNode(arr[mid]);
  node.left = sortedArrayBstRec2(arr.slice(0, mid));
  node.right = sortedArrayBstRec2(arr.slice(mid + 1));

  return node;
};

// console.log(sortedArray([-10, -3, 0, 5, 9]));
// console.log(sortedArrayBstRec1([-10, -3, 0, 5, 9]));

// NOTE: 52 (653) -> Two Sum BST
var findTarget = function (root, k) {
  const queue = [root];
  const numSet = new Set();
  while (queue.length) {
    const currNode = queue.shift();
    if (!currNode) continue;
    if (numSet.has(k - currNode.val)) return true;
    numSet.add(currNode.val);
    if (currNode.left) {
      queue.push(currNode.left);
    }
    if (currNode.right) {
      queue.push(currNode.right);
    }
  }
  return false;
};

// NOTE:  using DFS
var findTargetDFS = function (root, k) {
  const set = new Set();
  function dfs(root) {
    if (!root) return false;
    if (set.has(k - root.val)) return true;
    set.add(root.val);
    return dfs(root.left) || dfs(root.right);
  }
  return dfs(root);
};

// NOTE: 53(235) -> Lowest Common Ancestor
var lowestCommonAncestorBST = function (root, p, q) {
  const small = Math.min(p.val, q.val);
  const large = Math.max(p.val, q.val);
  while (root) {
    if (root.val > large) {
      root = root.left;
    } else if (root.val < small) {
      root = root.right;
    } else {
      return root;
    }
  }
  return root;
};

// NOTE:  54(530) -> Minimum Absolute Difference in a BST
var getMinimumDifference = function (root) {
  let minDiff = Infinity;
  let prevVal = -Infinity;
  const stack = [];
  while (root || stack.length) {
    if (root) {
      stack.push(root);
      root = root.left;
    } else {
      root = stack.pop();
      minDiff = Math.min(minDiff, root.val - prevVal);
      prevVal = root.val;
      root = root.right;
    }
  }

  return minDiff;
};

//NOTE: 55 (1382) -> Balance a binary search tree

var balanceBST = function (root) {
  let nodes = [];
  function sortBST(root) {
    if (!root) return;
    sortBST(root.left);
    nodes.push(root.val);
    sortBST(root.right);
  }

  sortBST(root);

  function sortedArrBST(left, right) {
    if (left > right) return null;
    let mid = Math.floor((left + right) / 2);
    let newNode = new TreeNode(nodes[mid]);
    newNode.left = sortedArrBST(left, mid - 1);
    newNode.right = sortedArrBST(mid + 1, right);
    return newNode;
  }

  return sortedArrBST(0, nodes.length - 1);
};

// NOTE:  56 (450) -> delete a node in a BST
var deleteNode = function (root, key) {
  if (!root) return null;
  if (root.val > key) {
    root.left = deleteNode(root.left);
  } else if (root.val < key) {
    root.right = deleteNode(root.right);
  } else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    let successor = getMin(root.right);
    root.val = successor.val;
    root.right = deleteNode(root.right, successor.val);
  }
};

function getMin(node) {
  while (node.left) {
    node = node.left;
  }
  return node;
}
