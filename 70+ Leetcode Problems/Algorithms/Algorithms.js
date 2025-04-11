// NOTE: -> DFS

class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  // insert
  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
    }
    let temp = this.root;
    while (true) {
      if (newNode.value < temp.value) {
        if (!temp.left) {
          temp.left = newNode;
          return this;
        }
        temp = temp.left;
      } else if (newNode.value > temp.value) {
        if (!temp.right) {
          temp.right = newNode;
          return this;
        }
        temp = temp.right;
      } else {
        return this;
      }
    }
  }

  // BFS
  BFS() {
    let currentNode = this.root;
    if (!this.root) return this;
    let queue = [];
    let results = [];
    queue.push(currentNode);
    while (queue.length) {
      currentNode = queue.shift();
      results.push(currentNode.value);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    return results;
  }

  // DFS (pre-order)
  DFSPreOrder() {
    let results = [];
    function traverse(currentNode) {
      results.push(currentNode.value);
      if (currentNode.left) traverse(currentNode.left);
      if (currentNode.right) traverse(currentNode.right);
    }

    traverse(this.root);
    return results;
  }

  // DFS (post -order) -> left most value will be returned first then right & at last rootnode.
  DFSPostOrder() {
    let results = [];
    function traverse(currentNode) {
      if (currentNode.left) traverse(currentNode.left);
      if (currentNode.right) traverse(currentNode.right);
      results.push(currentNode.value);
    }

    traverse(this.root);
    return results;
  }

  // DFS (In-order) -> smallest node will be returned & at last the biggest one (Ascending Order).
  DFSInOrder() {
    let results = [];
    function traverse(currentNode) {
      if (currentNode.left) traverse(currentNode.left);
      results.push(currentNode.value);
      if (currentNode.right) traverse(currentNode.right);
    }

    traverse(this.root);
    return results;
  }
}

const bst = new BST();
bst.insert(4);
bst.insert(10);
bst.insert(3);
bst.insert(8);
bst.insert(9);
// console.log(bst);
// console.log(bst.BFS());
// console.log(bst.DFSPreOrder());
// console.log(bst.DFSPostOrder());
console.log(bst.DFSInOrder());
thistoaneirn;
