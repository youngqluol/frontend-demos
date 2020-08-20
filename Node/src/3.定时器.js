/* 
每创建一个setTimeout，都会返回一个id。两种用法:
*/
// 第一种（不带参数）：

// setTimeout(() => {
//   console.log(1)
// }, 1000);

// 第二种（带参数）

// function fn(num1, num2) {
//   console.log(num1, num2);
// }
// setTimeout(fn, 1000, 2, 3);

/*  
setInterval精度丢失的问题：
每 n 毫秒启动一个函数，而没考虑函数何时完成执行。
如果一个函数总是花费相同的时间，那就没问题了
函数可能需要不同的执行时间，也许一个较长时间的执行会与下一次执行重叠
*/

// 解决方法： 
const fn1 = () => {
  console.log('setInterval');
  setTimeout(() => {
    fn1();
  }, 1000)
}

const timer = setTimeout(() => {
  fn1()
}, 0)