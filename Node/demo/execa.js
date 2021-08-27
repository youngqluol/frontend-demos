const execa = require('execa');

(async () => {
  const { stdout } = await execa.command('cd ../../');
  await execa('git', ['status']);
  await execa('git', ['add', '.']);
  await execa('git', ['commit', '-m', 'update node']);
  console.log(typeof stdout, 1);
})();
