// 打印
setTimeout(() => {
  console.log('1');
}, 0)

setImmediate(() => {
  console.log('2');
})

const p = new Promise(resolve => {
  console.log('3');
  resolve();
})


/* const startTime = Date.now();
setTimeout(() => {
  const endTime = Date.now();
  console.log(`timer: ${endTime - startTime}`);
}, 1000) */

/* function wait(time) {
  let now1 = Date.now();
  while(Date.now() - now1 < time) {
  }
}
console.log(1);
wait(2000);
console.log(2); */
