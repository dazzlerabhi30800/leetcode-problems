
// NOTE: 37 (2073) Easy -> Time need to buy tickets
var timeRequireToday = function (tickets, k) {
    let time = 0;
    for (let i = 0; i < tickets.length; i++) {
        time += Math.min(tickets[i], tickets[k] - (i > k ? 1 : 0))
    }
    return time;
}


// NOTE: 38 - geeks for geeks problem -> Reverse the first k elements of queue
function reverseFirst(queue, k) {
    moveToEndUptoK(queue, k);
    let size = queue.length - k;
    while (size-- > 0) {
        const firstEl = queue.shift();
        queue.push(firstEl);
    }
    return queue;
}

function moveToEndUptoK(queue, k) {
    if (k === 0) return;
    const firstEl = queue.shift();
    moveToEndUptoK(queue, k - 1);
    queue.push(firstEl);
}


// console.log(timeRequireToday([2, 3, 2], 2))
// console.log(timeRequireToday([5, 1, 1, 1], 0))

console.log(reverseFirst([1, 2, 3, 4, 5], 3));
console.log(reverseFirst([1, 2, 3, 4], 4));