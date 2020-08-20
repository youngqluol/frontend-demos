/* 
链式调用
*/

// const p = new Promise(resolve => {
//   resolve(1);
// })

// p.then(res => {
//   res += 1;
//   console.log(res);
//   return res;
// }).then(res => {
//   res += 1;
//   console.log(res);
//   return Promise.resolve(res);
// }).then(res => console.log(res)).catch(err => {
//   console.log(`报错了： ${err}`);
// });

/* 
promise.all: 等待所有promise完成，并返回一个包含各个promise返回值的数组
promise.race: 只要有一个promise被resolve了，则有返回值了且只返回一个
*/

const p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve(1);
  }, 1000)
})

const p2 = new Promise(resolve => {
  setTimeout(() => {
    resolve(2);
  }, 2000)
})

const p3 = new Promise(resolve => {
  setTimeout(() => {
    resolve(3);
  }, 3000)
})

Promise.all([p1, p2, p3]).then(res => console.log('res:', res)); // [1,2,3]
Promise.race([p1,p2,p3]).then(res => console.log('res:', res));  // 1
