var express = require('express');
var router = express.Router();
var fs = require("fs");

router.route("/upload").get(function(req,res){    // 到达此路径则渲染register文件，并传出title值供 upload.html使用
    res.render("register",{title:'User register'});
});

module.exports = router;
