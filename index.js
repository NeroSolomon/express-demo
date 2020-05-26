const express = require('express');
// 通过body-parser，处理post请求
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// 解析对象
const jsonParser = bodyParser.json();

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
app.post('/postData', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  res.send(req.body);
})

app.listen(port, () => console.log(`Listening in ${port}`));