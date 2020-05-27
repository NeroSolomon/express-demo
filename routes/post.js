const express = require('express');
const formidable = require('formidable');
const Article = require('../models/artices.js');
// 路由句柄
const router = express.Router();

// 获取文章
router.get('/getPost', (req, res) => {
  // 获得query
  var result = req.query;
  // 返回数据
  res.send(result);
})

// 新增文章
router.post('/addPost', (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) res.send(500);

    const postData = {
      authName: fields.name,
      title: fields.title,
      content: fields.content,
      ctime: Date.now() + ''
    }

    Article.create(postData, (err, data) => {
      if (err) throw err;
      console.log('Post success');
    })

    res.send(fields);
  })
})

module.exports = router;