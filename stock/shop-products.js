var https = require('https');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var db = require('./db');

var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');

var i = 0;
var url = "https://lianyixh.tmall.com/search.htm";
var timestamp = new Date();

function fetchPage(x) {
    //采用http模块向服务器发起一次get请求
    https.get(x, function (res1) {
        var html = '';        //用来存储请求网页的整个html内容
        var titles = [];
        //res1.setEncoding('utf-8'); //防止中文乱码
        //监听data事件，每次取一块数据
		 var bufferHelper = new BufferHelper();
        res1.on('data', function (chunk1) {
            html += chunk1;
			bufferHelper.concat(chunk1);
        });
        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res1.on('end', function () {
			var html1 = iconv.decode(bufferHelper.toBuffer(),'GBK');
            var $ = cheerio.load(html1); //采用cheerio模块解析html
            console.log(html1);
			
        });

    }).on('error', function (err) {
        console.log(err);
    });
}

fetchPage(url);      //主程序开始运行