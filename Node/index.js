/* const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'text/plain'
  });
  res.end('hello');
}).
listen(8888); */

/* const events = require('events');
const EventEmitter = events.EventEmitter;
const emitter = new EventEmitter();

emitter.emit('error', new Error('something bad happened'));

emitter.on('error', function(err) {
  console.error(err.message);
}) */

/* process.on('exit', (code) => {
  console.log('程序退出了：', code);
})

process.nextTick(() => {
  console.log('nextTick');
})

console.log(process.cwd()) */


//  读取文件

 const fs = require('fs');

 /* fs.readFile('README.txt', 'utf-8', (err, data) => {
   if(err) return console.log('报错了：', err);
   console.log('读取数据：', data);
 }) */

// 写文件

/* fs.writeFile('output.txt', '写入的数据', (err) => {
  if (err) return console.log('写入出错了：', err);
  console.log('写入成功了');
}) */
