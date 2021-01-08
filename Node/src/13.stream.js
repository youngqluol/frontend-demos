/* 
Stream有四种流类型：
1. Readable
2. Writable
3. Duplex
4. Transform

所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
1. data - 数据可读时触发
2. end  - 没有更多的数据可读时触发
3. error  - 在接收和写入过程中发生错误时触发
4. finish  - 所有数据已被写入到底层系统时触发
*/
const fs = require('fs');

/* 
// 从流中读取数据
var data;

const readStream = fs.createReadStream('../output.txt', 'UTF8');

readStream.on('data', (chunk) => {
  data += chunk;
})

readStream.on('end', () => {
  console.log(data);
})

readStream.on('error', (error) => {
  console.log(error.stack);
}) */


// 写入流
const data = '这是添加的数据' + Date.now();

const writeStream = fs.createWriteStream('../output.txt');

writeStream.write(data, 'UTF8');

writeStream.end();

writeStream.on('finish', () => {
  console.log('写入完成');
})

writeStream.on('error', function(err){
  console.log(err.stack);
});

console.log("程序执行完毕");
