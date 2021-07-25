const koaRouter = require('koa-router');
const router = koaRouter();

router.get('/', async (ctx, next) => {
  ctx.body = "首页";
  await next();
});

router.get('/get/commonInfo', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = {
    message: 'success',
    data: {
      name: 'lyq',
      age: 18
    }
  };
});

module.exports = router;