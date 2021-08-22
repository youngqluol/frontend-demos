const router = require('koa-router')();
const userModelHandler = require('../../models/userModel');
const log4js = require('log4js');
const logger = log4js.getLogger('globallog');

// 增加用户
router.post('/user/add', async (ctx, next) => {
  logger.info(ctx.req.url);
  const { age, name } = ctx.request.body;
  if (age && name) {
    try {
      const res = await userModelHandler.save({ age, name });
      ctx.body = {
        status: 200,
        results: res
      };
    } catch(e) {
      ctx.body = {error: e};
    }
  } else {
    ctx.body = {
      status: 200,
      message: '参数有误'
    };
  }
});

// 删除用户
router.post('/user/delete', async (ctx, next) => {
  const { name = '' } = ctx.request.body;
  if (name) {
    const res = await userModelHandler.deleteOne({ name });
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

// 更新用户
router.post('/user/update', async (ctx, next) => {});

// 查询用户
router.post('/user/query', async (ctx, next) => {
  const { name = '' } = ctx.request.body;
  if (name) {
    const res = await userModelHandler.query({ name });
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

module.exports = router;
