const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// console.log(process.argv.slice(2)); // 获取命令行中的参数

// const stat = fs.statSync(path.resolve(__dirname, '../../README.txt'));
// console.log(stat.isDirectory()); // 是否是文件夹
// console.log(stat.isFile()); // 是否是文件

// console.log(fs.readdirSync(path.resolve(__dirname, '../fs'))); // 返回目录下的所有文件名

/**
 * 文件读、写、复制、删除
*/
// 1. 同步读写
// const source = fs.readFileSync(resolvePath('./fs.js')); // 返回的是一个Buffer对象
// console.log(source);
// fs.writeFileSync(resolvePath('./test.js'), source); // 读写

// 2. 流读写(复制)
const readStream = fs.createReadStream(resolvePath('./fs.js'));
readStream.on('error', (err) => { // 监听error
  console.log('流读取失败：', err);
})

const writeStream = fs.createWriteStream('./test.js');
writeStream.on('error', (err) => {
  console.log('流写入失败：', err);
})
writeStream.on('close', (data) => {
  console.log('流写入完成', data);
})

readStream.pipe(writeStream);

function resolvePath(filePath) {
  return path.resolve(__dirname, filePath);
}

// test 
console.log(111)