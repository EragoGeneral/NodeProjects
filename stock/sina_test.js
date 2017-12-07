/**
 * Created by Administrator on 2017/12/6.
 */
var http = require('http');
var cheerio = require('cheerio');
var request = require('request');
var db = require('./db');

var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');
var i = 0;

//var url = "http://www.ss.pku.edu.cn/index.php/newscenter/news/2391";
var url = "http://quote.eastmoney.com/sz002024.html";
//初始url

function fetchPage(x) {     //封装了一层函数
    startRequest(x);
}
var timestamp = new Date();

function startRequest(x) {
    //采用http模块向服务器发起一次get请求
    http.get(x, function (res1) {
        var html1 = '';        //用来存储请求网页的整个html内容
        var titles = [];
        //res.setEncoding('utf-8'); //防止中文乱码
        //监听data事件，每次取一块数据
        var bufferHelper = new BufferHelper();
        res1.on('data', function (chunk1) {
            html1 += chunk1;
            bufferHelper.concat(chunk1);
        });
        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res1.on('end', function () {
            var html = iconv.decode(bufferHelper.toBuffer(),'GBK');

            var $ = cheerio.load(html); //采用cheerio模块解析html
            //console.log($);

            var table = $('#rtp2');
			console.log(table.text());
            

            // var sql = "insert into concept(code, name, create_time, update_time, is_deleted) values ?";
            // db.batchInsert(sql, ret, function(err){
            //     if(err){
            //         console.log(err);
            //         res.end('新增失败：' + err);
            //     }
            //     process.exit();
            // });
        });

    }).on('error', function (err) {
        console.log(err);
    });
}

fetchPage(url);      //主程序开始运行