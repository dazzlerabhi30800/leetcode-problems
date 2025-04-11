class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LL {
  constructor() {
    this.head = null;
    this.length = 0;
    this.tail = null;
  }

  insert(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  // NOTE: Problem 27 (141) -> Linked List Cycle
  hasCycle() {
    let slow = this.head,
      fast = this.head;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;

      if (slow === fast) {
        return true;
      }
    }
    return false;
  }

  // NOTE: 28 (206) -> Reverse Linked List

  // INFO: Iterative

  reverse() {
    let movingNode = this.head;
    let nextNode = movingNode;
    let previousNode = null;

    let currHead = this.head;
    this.head = this.tail;
    this.tail = currHead;

    for (let i = 0; i < this.length; i++) {
      nextNode = movingNode.next;
      movingNode.next = previousNode;
      previousNode = movingNode;
      movingNode = nextNode;
    }
    return this;
  }

  // NOTE: 29 (203) -> Remove Elemnt
  removeEl(head, value) {
    if (!head) return head;
    let dummy = new Node(Infinity);
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

  // NOTE: Reverse Linked list II
  removeBetween(head, left, right) {
    if (!head || left === right || this.length === 1) return head;
    let dummy = new Node(0);
    dummy.next = head;
    let prev = dummy;
    for (let i = 0; i < left - 1; i++) {
      prev = dummy.next;
    }
    let curr = prev.next;
    let next = null;
    for (let i = 0; i < right - left; i++) {
      next = curr.next;
      curr.next = next.next;
      next.next = prev.next;
      prev.next = next;
    }
    return dummy.next;
  }

  // NOTE: 31 (234) - Palindrome Linked List
  isPalindrome(head) {
    if (!head || !head.next) return head;
    let slow = head, fast = head;

    //  get the middle of the linked list
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next
    }

    // reverse the linked list
    let prev = null;
    while (slow) {
      let next = slow.next;
      slow.next = prev
      prev = slow;
      slow = next;
    }


    // now compare the left with right
    let left = head;
    let right = prev;
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
      if (list1.val < list2.val) {
        curr.next = list1;
        list1 = list1.next;
      }
      else {
        curr.next = list2;
        list2 = list2.next;
      }

      curr = curr.next
    }

    curr.next = list1 || list2;
    return dummy.next;
  }
}

const node = new LL();
node.insert(1);
node.insert(2);
node.insert(3);
node.insert(4);
node.insert(5);
console.log(node.removeEl(node.head, 4));
// console.log(node.removeBetween(node.head, 2, 4));
