const Koa = require('koa');
const app = new Koa();
const path = require('path');
// const koaStatic = require("koa-static");
const bodyParser = require('koa-bodyparser');
const router = require('./services/router');
const render = require('koa-art-template');

// 配置koa-art-template模板引擎
render(app, {
  root: path.join(__dirname, 'views'), //视图位置
  extname: '.html', //后缀名
  debug: process.env.NODE_ENV !== 'production' //是否开启调试模式
})
// app.use(koaStatic(path.resolve(__dirname, './public')));
app.use(bodyParser());
app.use(router.routes());

app.listen(3000);
console.log('app start at port 3000');