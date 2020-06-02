const express = require("express");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
const router = express.Router();

// 读文件，使用path来拼接路径
// __dirname：当前文件所在路径
router.get("/readFile", (req, res) => {
  fs.readFile(path.resolve(__dirname, "../public/fs-file.txt"), (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data.toString());
  });
});

// 打开文件
router.get("/openFile", (req, res) => {
  fs.open(path.resolve(__dirname, "../public/fs-file.txt"), "r+", (err, fd) => {
    console.log(fd);
    res.send("成功打开文件");
  });
});

// 分字节读取文件
router.get("/readBufFile", (req, res) => {
  fs.open(path.resolve(__dirname, "../public/fs-file.txt"), "r+", (err, fd) => {
    const buf = new Buffer.alloc(1024);
    fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
      if (err) {
        res.send(err);
      }
      res.send(buf.slice(0, bytes).toString());
    });
  });
});

// 关闭文件
router.get("/closeFile", (req, res) => {
  fs.open(path.resolve(__dirname, "../public/fs-file.txt"), "r+", (err, fd) => {
    const buf = new Buffer.alloc(1024);
    fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
      if (err) {
        res.send(err);
      }
      fs.close(fd, (err) => {
        if (err) res.send(error);
        res.send("关闭成功");
      });
    });
  });
});

// 获取文件信息
router.get("/statFile", (req, res) => {
  fs.stat(path.resolve(__dirname, "../public/fs-file.txt"), (err, stats) => {
    res.send(stats.isFile());
  });
});

// 写文件
router.get("/writeFile", (req, res) => {
  const data = JSON.stringify(req.query);
  fs.writeFile(
    path.resolve(__dirname, "../public/fs-file.txt"),
    data,
    (err) => {
      if (err) {
        res.send("数据写入失败");
      }
      res.send("数据写入成功");
    }
  );
});

// 上传文件并存到本地
router.post("/postFile", (req, res) => {
  const form = new formidable.IncomingForm();
  // 上传目录
  form.uploadDir = path.resolve(__dirname, "../public/upload");
  // 保持原有后缀名
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) res.send(err);
    res.send("成功上传");
  });
});

module.exports = router;
