// 增
const save = _model => {
  return new Promise((resolve, reject) => {
    _model.save((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

// 删
const deleteOne = (_model, _data) => {
  return new Promise((resolve, reject) => {
    _model.deleteOne(_data, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

// 改
const update = (_model, oldData, newData) => {
  return new Promise((resolve, reject) => {
    _model.update(oldData, newData, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const updateOne = (_model, oldData, newData) => {
  return new Promise((resolve, reject) => {
    _model.updateOne(oldData, newData, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

// 查
const query = (_model, _query = {}) => {
  return new Promise((resolve, reject) => {
    _model.find(_query, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

module.exports = { query, save, update, updateOne, deleteOne };
