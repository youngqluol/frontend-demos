const router = require('koa-router')();
const getController = require('../controllers/getController');
const postController = require('../controllers/postController');

router.get('/', getController.getHomeInfo);

router.get('/login', getController.login);

router.post('upload', postController.handleUpload);

router.get('/getInfo', async (ctx, next) => {
  let query = ctx.request.query;
  ctx.response.status = 200;
  if(!query.name) {
    ctx.response.type = 'application/json';
    ctx.response.body = {
      code: '1002',
      msg: '参数缺失'
    }
    return;
  }
  ctx.response.type = 'application/json';
  ctx.response.body = {
    username: query
  }
})

router.post('/getUserInfo', async (ctx, next) => {
  let name = ctx.request.body.name;
  ctx.response.status = 200;
  if(!name) {
    ctx.response.type = 'application/json';
    ctx.response.body = {
      code: '1002',
      msg: '参数缺失'
    }
    return;
  }
  ctx.response.type = 'application/json';
  ctx.response.body = {
    username: name
  }
})

module.exports = router;