/* 
这里用到的是http模块,使用该模块来创建 HTTP 服务器。
*/

// 1.搭建服务器

// const http = require('http')

// const hostname = 8888;
// const port = 3000

// const server = http.createServer((req, res) => {
//   console.log(`req: ${req}`);
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain')
//   res.end('你好世界\n')
// })

// server.listen(port, () => {
//   console.log(`服务器运行在 http://${hostname}:${port}/`)
// })

/* 
用node来发送http请求
*/

// 2. get请求

// const https = require('https')
// const options = {
//   hostname: 'nodejs.cn',
//   port: 443,
//   path: '/todos',
//   method: 'GET'
// }

// const req = https.request(options, res => {
//   console.log(`状态码: ${res.statusCode}`)

//   res.on('data', d => {
//     process.stdout.write(d)
//   })
// })

// req.on('error', error => {
//   console.error(error)
// })

// req.end()

// 3. post请求: 可以使用axios、也可以使用nodeJs的标准模块，如下：

const https = require('https')

const data = JSON.stringify({
  todo: '做点事情'
})

const options = {
  hostname: 'nodejs.cn',
  port: 443,
  path: '/todos',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = https.request(options, res => {
  console.log(`状态码: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()



