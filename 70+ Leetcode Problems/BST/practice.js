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
  // NOTE: 49 (700) -> Contains a node in the BST
  contains(val) {
    let temp = this.root;
    while (temp) {
      if (temp.val === val) return temp;
      else if (temp.val > val) {
        temp = temp.left;
      } else {
        temp = temp.right;
      }
    }
  }
  // NOTE: 50 (701) -> insert a node in the BST
  insert(val) {
    const node = new TreeNode(val);
    if (!this.root) {
      this.root = node;
      return;
    }
    let temp = this.root;
    while (temp) {
      if (temp.val === val) return undefined;
      if (temp.val > val) {
        if (!temp.left) {
          temp.left = node;
          return this.root;
        }
        temp = temp.left;
      } else {
        if (!temp.right) {
          temp.right = node;
          return this.root;
        }
        temp = temp.right;
      }
    }
  }
}

let myTree = new BST();
myTree.insert(4);
myTree.insert(8);
myTree.insert(3);
myTree.insert(2);
myTree.insert(7);
console.log(myTree.contains(8));
// console.log(myTree);

// NOTE: 51(108) -> Convert sorted array into BST
var sortedArray = function (arr) {
  if (!arr.length) return null;
  const n = arr.length;
  let mid = Math.floor(arr.length / 2);
  const root = new TreeNode(arr[mid]);
  const queue = [
    [root, 0, mid - 1],
    [root, mid + 1, n - 1],
  ];
  while (queue.length) {
    const [parent, left, right] = queue.shift();
    if (right >= left) {
      const child = new TreeNode(arr[mid]);
      mid = Math.floor((left + right) / 2);
      if (child.val > parent.val) {
        parent.right = child;
      } else {
        parent.left = child;
      }
      queue.push([child, left, mid - 1]);
      queue.push([child, mid + 1, right]);
    }
  }
  return root;
};

var sortedArrBstRec1 = function (arr) {
  function convert(left, right) {
    if (left > right) return null;
    let mid = Math.floor((left + right) / 2);
    let root = new TreeNode(arr[mid]);
    root.left = convert(left, mid - 1);
    root.right = convert(mid + 1, right);

    return root;
  }
  return convert(0, arr.length - 1);
};

var sortedArrBstRec2 = function (arr) {
  if (!arr.length) return null;
  let mid = Math.floor((left + right) / 2);
  let root = new TreeNode(arr[mid]);
  root.left = sortedArrBstRec2(arr.slice(0, mid));
  root.right = sortedArrBstRec2(arr.slice(mid + 1));

  return root;
};

// NOTE: 52 (653) -> Two Sum BST

var findTarget = function (root, k) {
  // this one is using BFS
  const queue = [root];
  const numSet = new Set();
  while (queue.length) {
    const currNode = queue.shift();
    if (!currNode) continue;
    if (numSet.has(k - currNode.val)) return true;
    numSet.add(currNode.val);
    if (currNode.left) queue.push(currNode.left);
    if (currNode.right) queue.push(currNode.right);
  }
  return false;
};

var findTargetRec = function (root, k) {
  const set = new Set();
  function dfs(root) {
    if (!root) return null;
    if (set.has(k - root.val)) return true;
    set.add(root.val);
    return dfs(root.left) || dfs(root.right);
  }
  return dfs(root);
};

// NOTE: 53(235) -> Lowest Common Ancestor
var lowestCommonAncestorBST = function (root, p, q) {
  const small = Math.min(p, q);
  const large = Math.max(p, q);
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
  let node = [];
  // First sort the tree;
  function sortBST(root) {
    if (!root) return;
    sortBST(root.left);
    node.push(root.val);
    sortBST(root.right);
  }

  sortBST(root);

  function sortedArray(left, right) {
    if (left > right) return null;
    let mid = Math.floor((left + right) / 2);
    let newNode = new TreeNode(node[mid]);
    newNode.left = sortedArray(left, mid - 1);
    newNode.right = sortedArray(mid + 1, right);
    return newNode;
  }

  return sortedArray(0, node.length - 1);

}


// NOTE:  56 (450) -> delete a node in a BST
var deleteNode = function (root, key) {
  if (!root) return null;
  if (root.val > key) {
    root.left = deleteNode(root.left, key);
  }
  else if (root.val < key) {
    root.right = deleteNode(root.right, key);
  }
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    let successor = getMin(root.right);
    root.val = successor.val
    root.right = deleteNode(root.right, successor.val);
  }

  function getMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

}


//NOTE: 57 (230) -> Kth smallest element in BST
var kthSmallest = function (root, k) {
  const stack = [];
  while (true) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    k--;
    if (k === 0) return root.val;

    // move to right subtree
    root = root.right;
  }
};