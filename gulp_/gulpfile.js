/* 
* 两种书写方式:
*/

// 第一种
// const gulp = require('gulp');

// gulp.task('default', (cb) => {
//   console.log('starting');
//   cb();
// })

// 第二种（官网推荐、最新）
async function defaultTask(cb) {
  console.log('starting...');
  let num = await testPromise();
  console.log(num);
  cb();
}

function testPromise() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(11);
    }, 2000);
  })
}

exports.default = defaultTask;

