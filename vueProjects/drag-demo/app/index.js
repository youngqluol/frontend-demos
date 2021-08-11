const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const bodyparser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const render = require('koa-art-template');
const log4js = require('log4js');
const config = require('./config');
const { initErrorHandler } = require('./middleware/errorHandler');
const path = require('path');

app.use(bodyparser());

// 配置日志
log4js.configure({
  appenders: {
    globallog: {
      type: 'file',
      filename: './logs/globallog.log'
    }
  },
  categories: {
    default: {
      appenders: ['globallog'],
      level: 'debug'
    }
  }
});
const logger = log4js.getLogger('globallog');

// 错误处理
initErrorHandler(app, logger);
// 模板
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});
// 静态资源
app.use(koaStatic(path.join(__dirname, 'public')));
// 路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port);
console.log(`服务已启动，域名：http://localhost:${config.port}`);

// 全局异常捕获
process.on('uncaughtException', err => {
  logger.error(JSON.stringify(err));
});