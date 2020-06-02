const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// 读文件，使用path来拼接路径
// __dirname：当前文件所在路径
router.get("/readFile", (req, res) => {
  fs.readFile(path.resolve(__dirname, "../public/fs-file.txt"), (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data.toString());
  });
});

module.exports = router;
