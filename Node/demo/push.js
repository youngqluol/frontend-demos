const util = require('util');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const exec = util.promisify(require('child_process').exec);
// const chdir = util.promisify(process.chdir);
const { prompt } = require('enquirer');
const resolve = p => path.resolve(__dirname, p);
const step = m => console.log(chalk.green(m));
const warning = m => console.log(chalk.red(m));
const diffCommand = 'git diff --name-only';
const addCommand = 'git add .';
const commitCommand = `git commit -m `;
const pushCommand = 'git push origin master';
const { commitId } = require('./commitId.js');
const promptOptions = {
  type: 'input',
  name: 'commitMessage',
  message: '请输入commit信息：',
  initial: `commit ${commitId}`
};

async function fn() {
  // 输入commit
  const enquirerRes = await prompt(promptOptions);
  const commitMessage = enquirerRes.commitMessage;
  if (!commitMessage) {
    warning('commit信息为空');
    process.exit(1);
  }
  step(`\n commit message: ${commitMessage}`);
  // 切换执行目录
  process.chdir(resolve('../../../frontend-demos'));
  step(`\n 切换目录成功，当前执行目录：${process.cwd()}`);
  let res;
  // git diff 判断是否有文件变更
  res = await exec(diffCommand);

  const testRegx = /[*]\/commitId\.js/;
  const diffFiles =
    res.stdout &&
    res.stdout
      .split('\n')
      .filter(Boolean)
      .filter(item => !testRegx.test(item)).length;
  if (!diffFiles) {
    warning('\n 无文件变更');
    process.exit(1);
  }

  console.log('变更文件：');
  console.log(
    res.stdout
      .split('\n')
      .filter(Boolean)
      .filter(item => !testRegx.test(item))
  );

  // add
  res = await exec(addCommand);
  if (res.err) {
    throw new Error('add err');
  } else {
    step('\n add succ');
  }

  // commit
  res = await exec(`${commitCommand}"${commitMessage}"`);
  if (res.err) {
    throw new Error('commit err');
  } else {
    step('\n commit succ');
  }

  // push
  res = await exec(pushCommand);
  if (res.err) {
    throw new Error('push err');
  } else {
    step('\n push success');
  }

  // 更新commitId
  const context = `exports.commitId = ${commitId + 1}`;
  fs.writeFileSync(resolve('./commitId.js'), context);
}

fn();
