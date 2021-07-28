const mongoose = require('mongoose');

const MONDB_URL = "mongodb://127.0.0.1:27017/user"; // 本地mongodb数据库地址

mongoose.connect(MONDB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('数据库连接成功...');
});

db.on('error', (error) => {
  console.log('数据库连接失败...', error);
});

db.on('disconnected', () => {
  console.log('数据库已断开');
});

module.exports = mongoose;