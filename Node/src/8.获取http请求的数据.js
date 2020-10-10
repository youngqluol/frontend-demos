/* 
这是在请求正文中提取以 JSON 格式发送的数据的方式。

如果使用的是 Express，则非常简单：使用 body-parser Node.js 模块。
*/

// 前提：发送一个请求:

// const axios = require('axios');
// axios.post('http://url',{
//   todo: 'lalala'
// });

// // 对应服务端代码：

// const bodyParse = require('body-parse');

// app.use(
//   bodyParse.urlencoded({
//     extended: true
//   })
// );

// app.use(bodyParse.json());

// app.post('/path', (req, res) => {
//   // todo
// })

//  如果不使用Express：

const server = http.createServer((req, res) => {
  // 可以访问 HTTP 请求头
  req.on('data', chunk => {
    console.log(`可用的数据块: ${chunk}`)
  })
  req.on('end', () => {
    //数据结束
  })
})

const server = http.createServer((req, res) => {
  let data = []
  req.on('data', chunk => {
    data.push(chunk)
  })
  req.on('end', () => {
    JSON.parse(data).todo // '做点事情'
  })
})

