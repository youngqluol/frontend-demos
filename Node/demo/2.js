const util = require('util');
const exec = util.promisify(require('child_process').exec);
const addCommand = 'git add .';
const commitCommand = `git commit -m `;
const pushCommand = 'git push origin master'

async function fn(commitMessage) {
  let res;
  // add
  res = await exec(addCommand);
  if (res.err) {
    console.log('err');
  } else {
    console.log('succ');
  }

  // commit
  res = await exec(`${commitCommand}'${commitMessage}'`)
  if (res.err) {
    console.log('err');
  } else {
    console.log('succ');
  }

  // push 
  res = await exec(pushCommand)
  if (res.err) {
    console.log('err');
  } else {
    console.log('finished');
  }
}

fn('demo');