const mongoose = require('mongoose');
const config = require('../config');
const MONDB_URL = config.mongodb.MONDB_URL;
let connectTimes = 0;

const dbHelper = {
  connect() {
    dbHelper.mongooseConnect();
    const db = mongoose.connection;

    db.on('connected', () => {
      console.log('数据库连接成功...');
    });

    // 失败后重连
    db.on('error', error => {
      console.error('数据库连接失败：', error);
      if (connectTimes > 5) return;
      dbHelper.mongooseConnect();
      connectTimes++;
    });

    db.on('disconnected', () => {
      console.log('数据库已断开');
    });

    // 单例模式(只创建一个实例)
    dbHelper.connect = () => mongoose;
    return mongoose;
  },

  // 连接
  mongooseConnect() {
    mongoose.connect(MONDB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // 弃用警告 https://mongoosejs.com/docs/deprecations.html#-findandmodify-
      useFindAndModify: false
    });
  }
};

module.exports = dbHelper;
