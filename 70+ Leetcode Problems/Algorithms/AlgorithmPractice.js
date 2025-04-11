// NOTE: BFS & DFS

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BFS {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const newNode = new Node(val);
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

  minDepth() {
    if (!this.root) return 0;
    const queue = [[this.root, 1]];

    while (queue.length) {
      let [node, depth] = queue.shift();

      if (!node.left && !node.right) {
        return depth;
      }

      if (node.left) queue.push([node.left, depth + 1]);
      if (node.right) queue.push([node.right, depth + 1]);
    }
  }
  preOrder() {
    if (!this.root) return;
    console.log(this.root);
    let stack = [this.root];
    while (stack.length) {
      let node = stack.pop();

      console.log(node.value);
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }
  }
}

const bfs = new BFS();
bfs.insert(8);
bfs.insert(2);
bfs.insert(10);
bfs.insert(20);
bfs.insert(9);
// console.log(bfs.minDepth());

bfs.preOrder();
