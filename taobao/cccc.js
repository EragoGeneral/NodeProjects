/**
 * Created by Administrator on 2018/6/10.
 */
var http = require("http");
var zlib = require('zlib');

http.get("http://www.runoob.com/nodejs/nodejs-tutorial.html", function(res) {
    var html = [];
    res.on("data", function(data) {
        html.push(data);
    })
    res.on("end", function() {
        var buffer = Buffer.concat(html);
        zlib.gunzip(buffer, function(err, decoded) {
            console.log(decoded.toString());
        })
    }).on("error", function() {
        console.log("获取失败")
    })
})