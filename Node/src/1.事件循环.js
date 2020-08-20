const process = require('process');

/* 一个面试题 */

// console.log(1);
// let p = new Promise(resolve => {
//   console.log(2);
//   resolve(3);
// }).then(num => console.log(num));
// setTimeout(() => {
//   console.log(5)
// }, 0);
// console.log(6);

// 最终输出： 自己想一下

/* 
* 当将一个函数传给 process.nextTick()时，则指示引擎在当前操作结束（在下一个事件循环tick开始之前）时调用此函数
*/
console.log(1);
let p = new Promise(resolve => {
  console.log(2);
  resolve(3);
}).then(num => console.log(num));
setTimeout(() => {
  console.log(5)
}, 0);
console.log(6);
process.nextTick(() => {
  console.log(7);
})

// 最终输出： 再想下
