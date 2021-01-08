const http = require('http');
const path = require('path');
const fs = require('fs'); //引入文件读取模块

var server = http.createServer(function (req, res) {

  var url = req.url.split('').splice(1).join('');
  console.log('路径url:', url);
  //客户端输入的url，例如如果输入localhost:8888/req.html
  //那么这里的url == /req.html 
  if (url === 'search') {
    res.writeHeader(200, {
      'content-type': 'text/html;charset="utf-8"'
    });
    let obj = {
      code: 1001,
      msg: '请求成功',
      data: 1
    }
    res.end(JSON.stringify(obj));
    return;
  }

  var file = path.resolve(__dirname, url);
  console.log(`file`, file);

  fs.readFile(file, function (err, data) {
    /*
        err为文件路径
        data为回调函数
            回调函数的一参为读取错误返回的信息，返回空就没有错误
            data为读取成功返回的文本内容
    */
    if (err) {
      res.writeHeader(404, {
        'content-type': 'text/html;charset="utf-8"'
      });
      res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
      res.end();
    } else {
      res.writeHeader(200, {
        'content-type': 'text/html;charset="utf-8"'
      });
      res.write(data); //将req.html显示在客户端
      res.end();

    }

  });

}).listen(8888, () => {
  console.log('运行成功:','http://localhost:8888/req.html');
});