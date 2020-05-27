const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 声明一个数据集对象，类似collection
const articleSchema = new Schema({
  authName: {
    type: String,
    unique: true
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  ctime: {
    type: String
  }
});

module.exports = mongoose.model('articles', articleSchema);