const execa = require('execa');
const path = require('path');
const child_process = require('child_process');
const util = require('util');
const exec = util.promisify(child_process.exec);
const resolve = p => path.resolve(__dirname, p);

(async () => {
  const { stdout } = await exec('cd ../../', {cwd: resolve('./demo')});
  // await execa('git', ['status']);
  // await execa('git', ['add', '.']);
  // await execa('git', ['commit', '-m', 'update node']);
  console.log(stdout);
})();
