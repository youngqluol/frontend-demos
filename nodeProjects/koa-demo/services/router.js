const router = require('koa-router')();
const getController = require('../controllers/getController');
const postController = require('../controllers/postController');

router.get('/', getController.getHomeInfo);

router.get('/login', getController.login);

router.post('upload', postController.handleUpload);

module.exports = router;