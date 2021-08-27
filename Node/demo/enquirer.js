const { prompt } = require('enquirer');

(async function fn() {
  // 1. 单次询问
  const singleOptions = {
    type: 'input',
    name: 'name',
    message: "What's your name?"
  };

  // 2. 多次询问
  const MutipleOptions = [
    {
      type: 'input',
      name: 'username',
      message: 'What is your username?'
    },
    {
      type: 'password',
      name: 'password',
      message: 'What is your password?'
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Are you single?'
    }
  ];

  // 自动补全
  const autoOptions = {
    type: 'AutoComplete',
    name: 'flavor',
    message: 'Pick your favorite flavor',
    limit: 10,
    initial: 2,
    choices: [
      'Almond',
      'Apple',
      'Banana',
      'Blackberry',
      'Blueberry',
      'Cherry',
      'Chocolate',
      'Cinnamon',
      'Coconut',
      'Cranberry',
      'Grape',
      'Nougat',
      'Orange',
      'Pear',
      'Pineapple',
      'Raspberry',
      'Strawberry',
      'Vanilla',
      'Watermelon',
      'Wintergreen'
    ]
  };

  // 基本认证
  const basicOptions = {
    type: 'basicauth ',
    name: 'password',
    message: 'Please enter your password',
    username: 'rajat-sr',
    password: '123',
    showPassword: true
  };

  // 表单
  const formOptions = {
    type: 'form',
    name: 'user',
    message: 'Please provide the following information:',
    choices: [
      { name: 'firstname', message: 'First Name', initial: 'Jon' },
      { name: 'lastname', message: 'Last Name', initial: 'Schlinkert' },
      { name: 'username', message: 'GitHub username', initial: 'jonschlinkert' }
    ]
  };

  // 不可见
  const invisibleOptions = {
    type: 'invisible',
    name: 'secret',
    message: 'Please tapdown something'
  };

  // 选择多个
  const MutipleSelectOptions = {
    type: 'MultiSelect',
    name: 'value',
    message: 'Pick your favorite colors',
    limit: 7,
    choices: [
      { name: 'aqua', value: '#00ffff' },
      { name: 'black', value: '#000000' },
      { name: 'blue', value: '#0000ff' },
      { name: 'fuchsia', value: '#ff00ff' },
      { name: 'gray', value: '#808080' },
      { name: 'green', value: '#008000' },
      { name: 'lime', value: '#00ff00' },
      { name: 'maroon', value: '#800000' },
      { name: 'navy', value: '#000080' },
      { name: 'olive', value: '#808000' },
      { name: 'purple', value: '#800080' },
      { name: 'red', value: '#ff0000' },
      { name: 'silver', value: '#c0c0c0' },
      { name: 'teal', value: '#008080' },
      { name: 'white', value: '#ffffff' },
      { name: 'yellow', value: '#ffff00' }
    ]
  };

  const res = await prompt(MutipleSelectOptions);
  console.log(res);
})();
