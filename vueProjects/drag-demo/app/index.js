const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const bodyparser = require('koa-bodyparser');
const log4js = require('log4js');
const config = require('./config');

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

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port, () => {
  console.log(`服务已启动，域名：http://localhost:${config.port}`);
});

// 全局异常捕获
process.on('uncaughtException', err => {
  logger.error(JSON.stringify(err));
});