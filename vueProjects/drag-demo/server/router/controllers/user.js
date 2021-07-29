const router = require('koa-router')();
// const DemoModal = require('../../db/modal'); // 连接数据库后再注开这里
const {
  query,
  save,
  update,
  updateOne,
  deleteOne
} = require('../../db/operation');

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