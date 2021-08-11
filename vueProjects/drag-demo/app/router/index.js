const koaRouter = require('koa-router');
const router = koaRouter();
const path = require('path');
const fs = require('fs');

router.get('/', async (ctx, next) => {
  await ctx.render('home');
});

router.get('/get/commonInfo', async (ctx, next) => {
  // console.log('query:', JSON.parse(JSON.stringify(ctx.request.query))); // 获取?后query值
  ctx.status = 200;
  ctx.body = {
    message: 'success',
    data: {
      name: 'lyq',
      age: 18
    }
  };
});

router.post('/submit/info', async (ctx, next) => {
  // console.log('body:', ctx.request.body); // 获取请求体中的值
  ctx.status = 200;
  ctx.body = {
    message: 'success'
  };
});

fs.readdirSync(resolve('./controllers')).forEach((file) => {
  if (file.indexOf('.js')) {
    let controller = require(path.join(__dirname, 'controllers', file));
    controller && router.use(controller.routes(), controller.allowedMethods());
  }
});

function resolve(name) {
  return path.resolve(__dirname, name);
}

module.exports = router;
