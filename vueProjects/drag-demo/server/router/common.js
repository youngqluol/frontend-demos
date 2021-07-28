const koaRouter = require('koa-router');
const router = koaRouter();
const DemoModal = require('../db/modal');
const {
  query,
  save,
  update,
  updateOne,
  deleteOne
} = require('../db/operation');

router.get('/', async (ctx, next) => {
  ctx.body = '首页';
  await next();
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

// 增
router.post('/user/add', async (ctx, next) => {
  const { age, name } = ctx.request.body;
  if (age && name) {
    const demoModal = new DemoModal({
      name,
      age
    });
    const res = await save(demoModal);
    ctx.body = {
      status: 200,
      results: res
    };
  } else {
    ctx.body = {
      status: 200,
      message: '参数有误'
    };
  }
});

// 删
router.post('/user/delete', async (ctx, next) => {});

// 改
router.post('/user/update', async (ctx, next) => {});

// 查
router.post('/user/query', async (ctx, next) => {});

module.exports = router;
