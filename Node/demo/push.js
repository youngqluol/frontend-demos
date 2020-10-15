const util = require('util');
const exec = util.promisify(require('child_process').exec);
const addCommand = 'git add .';
const commitCommand = `git commit -m `;
const pushCommand = 'git push origin master';


async function fn() {
  let [commitMessage] = process.argv.splice(2);
  if (!commitMessage) {
    throw new Error('缺少commit信息');
  }
  console.log(`commitMessage: ${commitMessage}`);
  let res;
  // add
  res = await exec(addCommand);
  if (res.err) {
    console.log('add err');
  } else {
    console.log('add succ');
  }

  // commit
  res = await exec(`${commitCommand}${commitMessage}`)
  if (res.err) {
    console.log('commit err');
  } else {
    console.log('commit succ');
  }

  // push 
  res = await exec(pushCommand)
  if (res.err) {
    console.log('push err');
  } else {
    console.log('push finished');
  }
}

fn('demo');