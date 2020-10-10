/* 
fs.stat():
调用时传入文件的路径，一旦 Node.js 获得文件的详细信息，则会调用传入的回调函数，并带上两个参数：错误消息和文件属性：
*/

const fs = require('fs');

fs.stat('../output.txt', (err, stat) => {
  if(err) return console.log('err:', err);
  console.log('stat:', stat.isFile());
  console.log('stat:', stat.isDirectory());
  console.log('stat:', stat.isSymbolicLink());
  console.log('stat:', stat.size);
})

/* 
包含的属性：
stat.isFile() 是否文件
stat.isDirectory()  是否目录
stat.isSymbolicLink()  文件是否符号链接
stat.size  文件大小
*/