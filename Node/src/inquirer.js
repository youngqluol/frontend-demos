/* 
* Inquirer.js 可以执行许多操作，例如询问多项选择、展示单选按钮、确认等。
* 可以使用 npm install inquirer 进行安装
*/
const inquirer = require('inquirer');

let questions = {
  type: 'input',
  name: 'name',
  message: 'what\'s your name?'
}

inquirer.prompt(questions).then(ans => {
  console.log(`Hello,${ans['name']}`, ans);
})