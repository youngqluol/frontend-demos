const startTime = Date.now();
console.log(1);

let p = new Promise(resolve => {
  console.log(2);
  resolve(3);
}).then(num => console.log(num));

setTimeout(() => {
  console.log(5)
}, 0);
setImmediate(() => {
    console.log(6);
})

console.log(6);

process.nextTick(() => {
  console.log(7);
})

const endTime = Date.now();

console.log(`时间： ${endTime - startTime}`);