// NOTE:  given a postfix expression this problem is same as Evaluate Reverse Polish Notation

const postFix = (str) => {
  const stacks = [];
  for (const s of str) {
    if (!"+/-*".includes(s)) {
      stacks.push(s);
    } else {
      let right = Number(stacks.pop()),
        left = Number(stacks.pop());
      if (s === "+") {
        stacks.push(right + left);
      } else if (s === "-") {
        stacks.push(right - left);
      } else if (s === "*") {
        stacks.push(right * left);
      } else if (s === "/") {
        stacks.push(Math.abs(Math.trunc(right / left)));
      } else if (s === "^") {
        stacks.push(Math.pow(right, left));
      } else {
        return `unknown char ${s}`;
      }
    }
  }

  return stacks.pop();
};

const sortAsc = (arr) => {
  const tmpstack = [];
  while (arr.length) {
    const num = arr.pop();
    while (tmpstack.length && tmpstack[tmpstack.length - 1] > num) {
      arr.push(tmpstack[tmpstack.length - 1]);
      tmpstack.pop();
    }
    tmpstack.push(num);
  }

  return tmpstack;
};

console.log(postFix("23+4*"));
console.log(sortAsc([34, 3, 31, 98, 92, 23]));
