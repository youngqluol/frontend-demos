const chalk = require('chalk');

// 基础用法
console.log(chalk.red('red', 'red2'));
console.log(chalk.red('red'));

// 拼接
console.log(chalk.red('red') + 'middle' + chalk.blue('blue'));

// 多个样式
console.log(chalk.blue.bgRed.bold('hello world'));

// 组合
console.log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));