class Minstack {
  constructor() {
    this.stack = [];
    this.minstack = [];
  }
  push(val) {
    this.stack.push(val);
    if (
      !this.minstack.length ||
      val <= this.minstack[this.minstack.length - 1]
    ) {
      this.minstack.push(val);
    }
  }
  pop() {
    if (!this.stack.length) return;
    const popped = this.stack.pop();
    if (popped === this.minstack[this.minstack.length - 1]) {
      this.minstack.pop();
    }
  }
  top() {
    return this.stack.length ? this.minstack[this.minstack.length - 1] : null;
  }
  getMin() {
    return thsi.stack.length ? this.minstack[this.minstack.length - 1] : null;
  }

  //NOTE: 32 (20) -> Valid Parenthesis
  isValidParenthesis(str) {
    const map = new Map([
      [")", "("],
      ["]", "["],
      ["}", "{"],
    ]);
    for (const s of str) {
      if (
        this.stack.length &&
        map.has(s) &&
        map.get(s) === this.stack[this.stack.length - 1]
      ) {
        this.stack.pop();
      } else {
        this.stack.push(s);
      }
    }

    return !this.stack.length;
  }
}

const minStack = new Minstack();
// console.log(minStack.isValidParenthesis("()[]{}"));
// console.log(minStack.isValidParenthesis("()[}"));
console.log(minStack.isValidParenthesis("()["));
