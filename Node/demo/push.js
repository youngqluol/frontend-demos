const util = require('util');
const path = require('path');
const chalk = require('chalk');
const exec = util.promisify(require('child_process').exec);
// const chdir = util.promisify(process.chdir);
const { prompt } = require('enquirer');
const resolve = p => path.resolve(__dirname, p);
const step = str => console.log(chalk.green(str));
const addCommand = 'git add .';
const commitCommand = `git commit -m `;
const pushCommand = 'git push origin master';
const promptOptions = {
  type: 'input',
  name: 'commitMessage',
  message: '请输入commit信息：'
}


async function fn() {
  const enquirerRes = await prompt(promptOptions);
  const commitMessage = enquirerRes.commitMessage;
  if (!commitMessage) {
    throw new Error('缺少commit信息');
  }
  step(`\n commitMessage: ${commitMessage}`);
  // 修改执行目录
  process.chdir(resolve('../../../frontend-demos'));
  step(`\n 修改目录成功，当前执行目录：${process.cwd()}`)
  let res;

  // add
  res = await exec(addCommand);
  if (res.err) {
    throw new Error('add err');
  } else {
    step('\n add succ');
  }

  // commit
  res = await exec(`${commitCommand}${commitMessage}`)
  if (res.err) {
    throw new Error('commit err');
  } else {
    step('\n commit succ');
  }

  // push 
  res = await exec(pushCommand)
  if (res.err) {
    throw new Error('push err');
  } else {
    step('\n push success');
  }
}

fn();