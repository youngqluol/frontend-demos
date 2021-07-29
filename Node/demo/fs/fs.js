#!/usr/bin/env node

const fs = require('fs');
// const fse = require('');
const path = require('path');
const { promisify } = require('util');
const exec = require('child_process').exec;

// console.log(process.argv.slice(2)); // 获取命令行中的参数

// const stat = fs.statSync(path.resolve(__dirname, '../../README.txt'));
// console.log(stat.isDirectory()); // 是否是文件夹
// console.log(stat.isFile()); // 是否是文件
// console.log(fs.existsSync(resolvePath('../fs/fs.js'))); // 文件或目录是否存在

// console.log(fs.readdirSync(path.resolve(__dirname, '../fs'))); // 返回目录下的所有文件名

/**
 * 文件读、写、复制、删除、追加、修改、重命名
 * 文件夹读、创建、删除
*/
// 1. 同步读写
// const source = fs.readFileSync(resolvePath('./fs.js')); // 返回的是一个Buffer对象
// console.log(source);
// fs.writeFileSync(resolvePath('./test.js'), source); // 读写

// 2. 流读写(复制)
// const readStream = fs.createReadStream(resolvePath('./1.png'));
// readStream.on('error', (err) => { // 监听error
//   console.log('流读取失败：', err);
// })

// const writeStream = fs.createWriteStream('./2.png');
// writeStream.on('error', (err) => {
//   console.log('流写入失败：', err);
// })
// writeStream.on('close', (data) => {
//   console.log('流写入完成', data);
// })
// readStream.pipe(writeStream);

// 3. 重命名
// fs.renameSync(resolvePath('./newTest.test'), resolvePath('./newTest.js'));

// 4. 创建文件、文件夹
// fs.mkdir(resolvePath('./test'), (err) => {
//   if(err) {
//     console.log('创建文件夹错误', err);
//     return;
//   };
//   console.log('目录创建成功');
//   fs.writeFileSync(resolvePath('./test/test.js'), '// 目录创建成功'); // 写入文件（会覆盖之前的内容）（文件不存在就创建） utf8参数可以省略
// });

// 5. 删除文件、文件夹
// fs.unlinkSync(resolvePath('./newDir/test.js')); // 删除文件
// fs.rmdirSync('./newDir'); // 删除目录

// fs.readdirSync // 读取文件夹

// 6. 文件追加
// const context = `console.log(111)`;
// fs.appendFileSync(resolvePath('./newTest.js'), context);

// 7. 文件读取、写入/修改
// let source = fs.readFileSync(resolvePath('./newTest.js'), {
//   encoding: 'utf8', 
//   flag: 'r'
// });
// source = source.replace(/\/\/\stest/, 'console.log('+ 'test' + ')');
// fs.writeFileSync(resolvePath('./newTest.js'), source);

// 8. 运行命令行复制文件
// const cmd = `cp -a ${resolvePath('../fs')} ${resolvePath('../fs2')}`;
// exec(cmd, (stdout) => {
//   console.log(stdout); // null
// });

function resolvePath(filePath) {
  return path.resolve(__dirname, filePath);
}
