/* 
proxy的使用
*/
let target = {
  age: 18,
  name: 'Koby'
};

let targetArry = [1, 2, 3];

let arryObj = {
  a: [1, 2, 3]
};

let handler = {
  get(target, key) {
    console.log(`【属性被读取了】：${key}：${target[key]}`);
    return target[key];
  },
  set(target, key, value) {
    if (key === 'age' && value !== 18) {
      target[key] = 18;
      console.log(`你更改${key}为${value}，但是${target['name']}永远18`)
    } else {
      target[key] = value;
      console.log('属性被更改咯');
    };
  },
  has(target, key) {
    console.log(`查看的属性是:${key}`);
    if (key === 'age') return false;
  }
}

// const proxy = new Proxy(target, handler); // 创建出来的代理对象
// const proxy = new Proxy(targetArry, handler); 
const proxy = new Proxy(arryObj, handler); 

// proxy.age;
// proxy.age = 18;
// try {
//   console.log(!!('name' in proxy));
//   'age' in proxy;
// } catch (e) {
//   console.log(e);
// }
// console.log(proxy[1]);
// proxy[1] = 100;
// console.log(targetArry);
// proxy
// console.log('test');
