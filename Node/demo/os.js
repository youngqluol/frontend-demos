const os = require('os');

// console.log(`os:`,os.hostname());
// console.log(`os:`,os.networkInterfaces());
// console.log(`os:`,os.type());
console.log(`os:`, os.uptime() + 's');
const uptime = os.uptime();

let hour = Math.floor(uptime / (60 * 60));
let minute = Math.floor(uptime % (60 * 60) / 60);
let second = uptime % 60;

console.log(`时间过去了：${hour}小时${minute}分钟${second}秒`)