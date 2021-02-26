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
function defaultTask(cb) {
  console.log('starting...');
  cb();
}

exports.default = defaultTask;
