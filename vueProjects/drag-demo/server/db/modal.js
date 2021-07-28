const mongoose = require('./index.js');

const { Schema, model } = mongoose;

const demoSchema = new Schema(
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

const demoModal = model('Demo', demoSchema);

module.exports = demoModal;
