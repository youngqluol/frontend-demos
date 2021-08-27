// const execa = require('execa');
const path = require('path');
const process = require('process');
const child_process = require('child_process');
const util = require('util');
const exec = util.promisify(child_process.exec);
const resolve = p => path.resolve(__dirname, p);

async function fn() {
  const { stdout } = await exec('ls', {cwd: resolve('../demo')});
  console.log(stdout);
  // await execa('git', ['status']);
  // await execa('git', ['add', '.']);
  // await execa('git', ['commit', '-m', 'update node']);
  // console.log(stdout);
  // console.log(`初始目录：${process.cwd()}`)
  // process.chdir(resolve('../../Node'));
  // console.log(`最新目录：${process.cwd()}`)
}

fn();
