/* 
* process
* Node.js 的 process 核心模块提供了 env 属性，该属性承载了在启动进程时设置的所有环境变量。
  这是访问 NODE_ENV 环境变量的示例，该环境变量默认情况下被设置为 development。
*/

// 1. 创建一个图形化进程

/* const chalk = require('chalk');
console.log(chalk.red('你好'));

const ProgressBar = require('progress')
const bar = new ProgressBar(':bar', { total: 10 })
const timer = setInterval(() => {
  bar.tick()
  if (bar.complete) {
    clearInterval(timer)
  }
}, 1000) */

// 2. 开启一个进程

// const http = require('http');

// const server = http.createServer();
// server.listen(3000,()=>{
//     process.title='程序员成长指北测试进程';
//     console.log('进程id',process.pid);
//     console.log('进程id',process.cwd());
// })

// 3. 获取cpu核心数

const os = require('os');

console.log(os.cpus());