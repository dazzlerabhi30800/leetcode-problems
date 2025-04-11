class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LL {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  // Problem 26 (876) EASY -> Middle of the linked list
  middleNode() {
    let slow = this.head,
      fast = this.head;
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  }
  // more robuse sol^n
  middleNode() {
    let size = 0;
    let curr = this.head;
    while (curr !== null) {
      size += 1;
      curr = curr.next;
    }
    const middleIndex = Math.floor(size / 2);

    let node = this.head;
    for (let i = 0; i < middleIndex; i++) {
      node = node.next;
    }
    return node;
  }

  // NOTE: Problem 27(141) -> Linked List Cycle

  hasCycle() {
    if (!this.head) return;
    let slow = this.head,
      fast = this.head;
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;

      if (slow === fast) {
        return true;
      }
    }

    console.log(this);
    return false;
  }

  // NOTE: Problem 28 (206) -> Reverse Linked List
  // HACK: Iterative
  reverse() {
    let movingNode = this.head;
    this.head = this.tail;
    this.tail = movingNode;

    let nextNode, previousNode;
    for (let i = 0; i < this.length; i++) {
      nextNode = movingNode.next;
      movingNode.next = previousNode;
      previousNode = movingNode;
      movingNode = nextNode;
    }
    return this;
  }
  // HACK:  Recursive
  reverseRec(head) {
    if (!head || !head.next) return head;

    let newNode = this.reverseRec(head.next);
    console.log({ head, newNode });
    head.next.next = head;
    head.next = null;

    return newNode;
  }
  testing(head) {
    let temp = head;

    head.next.next = 100;

    return temp;
  }

  // INFO: Recursive;
  reverseRec(head) {
    if (!head || !head.next) return head;
    const newNode = this.reverseRec(head.next);
    head.next.next = head;
    head.next = null;
    return newNode;
  }

  // NOTE: 29(203) -> Remove Linked List Elements
  removeElement(head, value) {
    let dummy = new Node(0);
    dummy.next = head;
    let curr = dummy;
    while (curr.next !== null) {
      if (curr.next.value === value) {
        curr.next = curr.next.next;
        this.length--;
      } else {
        curr = curr.next;
      }
    }
    return dummy.next;
  }

  getNode(head, val) {
    if (head.value == val) return head;

    let findNode = this.getNode(head.next, val);
    return findNode;
  }

  // NOTE: 30 (92) -> Reverse Linked List II

  // reverse2(head, left, right) {
  //   if (!head) return [];
  //   if (this.length === 1) return head;
  //   let leftNode = this.getNode(head, left);
  //   let rightNode = this.getNode(head, right);
  //   if (leftNode && rightNode) {
  //     let temp = leftNode.value;
  //     leftNode.value = rightNode.value;
  //     rightNode.value = temp;
  //   }

  //   return head;
  // }
  reverseBetween(head, left, right) {
    if (!head || left === right) return head; // Edge cases

    let dummy = new Node(0); // Dummy node to handle head changes
    dummy.next = head;
    let prev = dummy;

    // Step 1: Move `prev` to the node before `left`
    for (let i = 0; i < left - 1; i++) {
      prev = prev.next;
    }

    // Step 2: Reverse the sublist
    let curr = prev.next;
    let next = null;
    for (let i = 0; i < right - left; i++) {
      next = curr.next;
      curr.next = next.next;
      next.next = prev.next;
      prev.next = next;
    }

    return dummy.next; // Return the new head
  }

  // NOTE: 31 (234) - Palindrome Linked List
  isPalindrome(head) {
    if (!head || !head.next) return false;
    // find the middle of the linked list using slow & fast pointer
    let slow = head,
      fast = head;
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }

    // reverse the middle of the list
    let prev = null;
    while (slow) {
      let next = slow.next;
      slow.next = prev;
      prev = slow;
      slow = next;
    }

    // now compare the left & right part of linked list
    let right = prev;
    let left = head;
    while (right) {
      if (right.value !== left.value) {
        console.log("It's not a palindrome");
        return false;
      }

      left = left.next;
      right = right.next;
    }

    return true;
  }

  // NOTE: (21) -> Merge two sorted Linked list
  mergeTwoLists(list1, list2) {
    const dummy = new Node(Infinity);
    let curr = dummy;
    while (list1 && list2) {
      if (list1.value < list2.value) {
        curr.next = list1;
        list1 = list1.next;
      } else {
        curr.next = list2;
        list2 = list2.next;
      }
      curr = curr.next;
    }

    curr.next = list1 || list2;

    return dummy.next;
  }
}

const node = new LL();
node.push(1);
node.push(2);
node.push(3);
node.push(4);
node.push(5);
node.push(6);
// console.log(node.reverseRec(node.head));
// console.log(node.testing(node.head));
// console.log(node.reverseBetween(node.head, 2, 4));

const node2 = new LL();
node2.push(1);
node2.push(2);
node2.push(2);
node2.push(1);
// console.log(node.isPalindrome(node2.head));
console.log(node2.head);

// console.log(node2.hasCycle());

// console.log(node.removeElement(node.head, 7));
// node.insert(6);
// node.insert(7);
// node.insert(8);
// console.log(node.reverse2(node.head, 3, 7));

// console.log(node.reverseRec(node.head));
