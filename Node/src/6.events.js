/* 
如果你在浏览器中使用 JavaScript，则你会知道通过事件处理了许多用户的交互：鼠标的单击、键盘按钮的按下、对鼠标移动的反应等等。

在后端，Node.js 也提供了使用 events 模块构建类似系统的选项。

具体上，此模块提供了 EventEmitter 类，用于处理事件。

类似vue中的$emit、$on
*/
// 初始化
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// emit/on方法
eventEmitter.on('someEvent', (res1, res2, res3) => {
  console.log(res1, res2, res3);
})

eventEmitter.emit('someEvent', ...[1,2,3]);

/* 
once 添加单次监听
removeListener() / off(): 从事件中移除事件监听器。
removeAllListeners(): 移除事件的所有监听器
*/