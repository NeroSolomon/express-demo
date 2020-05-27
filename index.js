const express = require('express');
const formidable = require('formidable');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// 链接本地数据库
mongoose.connect('mongodb://127.0.0.1:27017/posts');

// 获取数据库对象
const db = mongoose.connection;

// 链接成功
db.on('open', () => {
  console.log('MongoDB Connection Successed');
})

// 链接失败
db.on('error', () => {
  console.log('MongoDB Connection Error');
})

// 设置跨域访问
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // 预检请求中的请求头
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,Origin,Accept,X-Requested-With');
  // 允许请求带cookie
  res.header('Access-Control-Allow-Credentials', true);

  // 假如是预检请求
  if (req.method == 'OPTIONS') {
    // 发送状态码
    res.sendStatus(200)
  } else {
    // 执行下个过滤器
    next();
  }
})

app.get('/', (req, res) => res.send('Hello world'));

// get方法
app.get('/getData', (req, res) => {
  // 获得query
  var result = req.query;
  // 返回数据
  res.send(result);
})

// post方法
app.post('/postData', (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) res.send(500);

    res.send(fields);
  })
})

app.listen(port, () => console.log(`Listening in ${port}`));