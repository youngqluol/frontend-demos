const Koa = require('koa');
const app = new Koa();
const router = require('./router/common');

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080, () => {
  console.log(`服务已启动，域名：http://localhost:8080`);
});