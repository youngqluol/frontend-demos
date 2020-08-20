/* 
在任何函数之前加上 async 关键字意味着该函数会返回 promise。
*/
// const fn = async () => {
//   return 1;
// }

// fn().then(res => console.log(res));

const p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
})
const p2 = new Promise(resolve => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
})
const p3 = new Promise(resolve => {
  setTimeout(() => {
    resolve(3);
  }, 1000);
})

const fnP = async () => {
  let res1 = await p1;
  console.log(res1);
  let res2 = await p2;
  console.log(res2);
  let res3 = await p3;
  console.log(res3);
}

fnP();