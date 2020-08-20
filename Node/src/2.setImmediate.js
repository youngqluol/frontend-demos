/* 
* 当要异步地（但要尽可能快）执行某些代码时，其中一个选择是使用 Node.js 提供的 setImmediate()
*/

console.log(1);
setImmediate(() => {
  console.log(2)
});
console.log(3);

// 1 3 2

/* 
与setTimeout(() => {}, 0)、process.nextTick()的不同：
1. process.nextTick()的函数会在事件循环的当前迭代中（当前操作结束之后）被执行,意味着它会始终在setTimeout 和 setImmediate 之前执行
2. setTimeout() 回调与 setImmediate() 非常相似
*/