/* 
两种方式获取文件描述符：
*/
const fs = require('fs');

// 第一种

fs.open('../output.txt', 'r', (err, fd) => {
  if(err) return console.log('err:', err);
  console.log('fd:',fd); // fd 是文件描述符
})

// 第二种

try { 
  const fd = fs.openSync('../output.txt', 'r');
  console.log('fd:',fd); // fd 是文件描述符
} catch(err) {
  console.log('err:', err);
}

/* 
关于第二个参数 r：表示打开文件用于读取。
其他常用的参数：
r+  打开文件用于读写。
w+  打开文件用于读写，将流定位到文件的开头。如果文件不存在则创建文件
a   打开文件用于写入，将流定位到文件的末尾。如果文件不存在则创建文件
a+  打开文件用于读写，将流定位到文件的末尾。如果文件不存在则创建文件。

一旦获得文件描述符，就可以以任何方式执行所有需要它的操作
*/