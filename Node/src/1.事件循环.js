const process = require('process');

/* 一个面试题 */

/* console.log(1);

let p = new Promise(resolve => {
  console.log(2);
  resolve(3);
}).then(num => console.log(num));

setTimeout(() => {
  console.log(5)
}, 0);

console.log(6); */

// 最终输出： 自己想一下

/* 
* 当将一个函数传给 process.nextTick()时，则指示引擎在当前操作结束（在下一个事件循环tick开始之前）时调用此函数
*/

/* const startTime = Date.now();
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

const endTime = Date.now();

console.log(`时间： ${endTime - startTime}`); */

// 最终输出： 再想下

// 事件循环本身相当于一个死循环，当代码开始执行的时候，事件循环就已经启动了
// 然后顺序调用不同阶段的方法

/* while(true){
  // timer阶段
    timer()
  // I/O callbacks阶段
    IO()
  // idle阶段
    IDLE()
  // poll阶段
    poll()
  // check阶段
    check()
  // close阶段
    close()
  } */
  
  // 在一次循环中，当事件循环进入到某一阶段，加入进入到check阶段，
  // 突然timer阶段的事件就绪，也会等到当前这次循环结束，再去执行对应的timer阶段的回调函数 
  // 下面看这里例子
  const fs = require('fs')
  
  // timers阶段
  const startTime = Date.now();
  setTimeout(() => {
      const endTime = Date.now()
      console.log(`timers: ${endTime - startTime}`)
  }, 1000)
  
  // poll阶段(等待新的事件出现)
  const readFileStart =  Date.now();
  fs.readFile('../output.txt', (err, data) => {
      if (err) throw err
      let endTime = Date.now()
      // 获取文件读取的时间
      console.log(`read time: ${endTime - readFileStart}`)
      // 通过while循环将fs回调强制阻塞5000s
      while(endTime - readFileStart < 5000){
          endTime = Date.now()
      }
  })
  
  
  // check阶段
  setImmediate(() => {
      console.log('check阶段')
  })

  /*控制台打印
  check阶段
  read time: 9
  timers: 5008

  通过上述结果进行分析，
  1.代码执行到定时器setTimeOut，目前timers阶段对应的事件列表为空，在1000s后才会放入事件
  2.事件循环进入到poll阶段，开始不断的轮询监听事件
  3.fs模块异步执行，根据文件大小，可能执行时间长短不同，这里我使用的小文件，事件大概在9s左右
  4.setImmediate执行，poll阶段暂时未监测到事件，发现有setImmediate函数，跳转到check阶段执行check阶段事件（打印check阶段），第一次时间循环结束，开始下一轮事件循环
  5.因为时间仍未到定时器截止时间，所以事件循环又一次进入到poll阶段，进行轮询
  6.读取文件完毕，fs产生了一个事件进入到poll阶段的事件队列，此时事件队列准备执行callback，所以会打印（read time: 9），人工阻塞了5s，虽然此时timer定时器事件已经被添加，但是因为这一阶段的事件循环为完成，所以不会被执行，（如果这里是死循环，那么定时器代码永远无法执行）
  7.fs回调阻塞5s后，当前事件循环结束，进入到下一轮事件循环，发现timer事件队列有事件，所以开始执行 打印timers: 5008
  
  ps：
  1.将定时器延迟时间改为5ms的时候，小于文件读取时间，那么就会先监听到timers阶段有事件进入，从而进入到timers阶段执行，执行完毕继续进行事件循环
  check阶段
  timers: 6
  read time: 5008
  2.将定时器事件设置为0ms，会在进入到poll阶段的时候发现timers阶段已经有callback，那么会直接执行，然后执行完毕在下一阶段循环，执行check阶段，poll队列的回调函数
  timers: 2
  check阶段
  read time: 7
   */
  
