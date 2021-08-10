const dbHelper = require('./connect.js');
const mongoose = dbHelper.connect();
const { Schema, model } = mongoose;

// 定义表字段
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true
    },
    age: {
      type: Number,
      require: true
    }
  },
  { timestamps: true }
);

// 创建表
const UserModel = model('user', userSchema);

// 增
const save = item => {
  return new Promise((resolve, reject) => {
    // 新建信息
    const newModel = new UserModel(item);
    newModel.save((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

// 删
const deleteOne = (item) => {
  return new Promise((resolve, reject) => {
    UserModel.deleteOne(item, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

// 改
const updateOne = (query, item) => {
  return new Promise((resolve, reject) => {
    UserModel.findOneAndUpdate(query, item, null, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const update = (query, item) => {
  return new Promise((resolve, reject) => {
    UserModel.updateOne(query, item, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

// 查
const query = (query) => {
  return new Promise((resolve, reject) => {
    UserModel.find(query, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

module.exports = { query, save, update, updateOne, deleteOne };
