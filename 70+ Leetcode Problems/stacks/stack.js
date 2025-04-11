class Minstack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);

    if (
      this.minStack.length === 0 ||
      val <= this.minStack[this.minStack.length - 1]
    ) {
      this.minStack.push(val);
    }
  }

  pop() {
    if (this.stack.length === 0) return;
    const popped = this.stack.pop();
    if (popped === this.minStack[this.minStack.length - 1]) {
      return this.minStack.pop();
    }
  }
  top() {
    return this.stack.length ? this.minStack[this.minStack.length - 1] : null;
  }
  getMin() {
    return this.stack.length ? this.minStack[this.minStack.length - 1] : null;
  }
  // NOTE: 34:  20 -> Valid Parenthesis
  // my approach

  isValidParenthesis(str) {
    let strArr = [...str];
    const openBracks = ["[", "(", "{"];
    for (let i = 0; i < strArr.length; i++) {
      if (openBracks.includes(strArr[i])) {
        this.stack.push(strArr[i]);
      } else if (
        strArr[i] === "]" &&
        this.stack[this.stack.length - 1] === "["
      ) {
        this.stack.pop();
      } else if (
        strArr[i] === "}" &&
        this.stack[this.stack.length - 1] === "{"
      ) {
        this.stack.pop();
      } else if (
        strArr[i] === ")" &&
        this.stack[this.stack.length - 1] === "("
      ) {
        this.stack.pop();
      } else {
        return false;
      }
    }

    return this.stack.length === 0;
  }
  // using hash map
  isValidParenthesis2(str) {
    const map = new Map();
    map.set(")", "(");
    map.set("]", "[");
    map.set("}", "{");

    for (const s of str) {
      if (
        this.stack.length &&
        map.has(s) &&
        this.stack[this.stack.length - 1] === map.get(s)
      ) {
        this.stack.pop();
      } else {
        this.stack.push(s);
      }
    }

    console.log(map);
    return this.stack.length === 0;
  }

  // NOTE: 35 (150) -> Evaluate Reverse Polish Notation
  evalRPM(arr) {
    const stack = [];
    for (const t of arr) {
      if (!"+-/*".includes(t)) {
        stack.push(t);
      } else {
        const right = Number(stack.pop()),
          left = Number(stack.pop());
        if (t === "+") {
          stack.push(left + right);
        } else if (t === "-") {
          stack.push(left - right);
        } else if (t === "*") {
          stack.push(left * right);
        } else {
          // stack.push(Math.floor(parseFloat(left / right)));
          stack.push(Math.abs(Math.trunc(left / right)));
        }
      }
    }

    return stack.pop();
  }

  // NOTE: 36 (NOT A LEETCODE PROBLEM) -> Stack Sorting - Ascending
  stackSortAsc(arr) {
    const tmpstack = [];
    while (arr.length) {
      const num = arr.pop();
      while (tmpstack.length && tmpstack[tmpstack.length - 1] < num) {
        arr.push(tmpstack[tmpstack.length - 1]);
        tmpstack.pop();
      }
      tmpstack.push(num);
    }

    return tmpstack;
  }
}

const minStack = new Minstack();
// console.log(minStack.isValidParenthesis("()[]{}"));
// console.log(minStack.isValidParenthesis("()[}"));
// console.log(minStack.isValidParenthesis2("()[]"));
// console.log(minStack.evalRPM(["2", "1", "+", "3", "*"]));
console.log(
  minStack.evalRPM([
    "10",
    "6",
    "9",
    "3",
    "+",
    "-11",
    "*",
    "/",
    "*",
    "17",
    "+",
    "5",
    "+",
  ]),
);
console.log(minStack.stackSortAsc([34, 3, 31, 98, 92, 23]));
