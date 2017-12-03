/**
 * Created by Administrator on 2017/12/1.
 */
var http = require('http');
var cheerio = require('cheerio');
var request = require('request');
var i = 0;

var timestamp = Date.parse(new Date());
var url = "http://ff.eastmoney.com/EM_CapitalFlowInterface/api/js?id=6010191&type=ff&check=MLBMS&cb=var%20aff_data=&js={(x)}&rtntype=3&acces_token=1942f5da9b46b069953c873404aad4b5&_="+timestamp;
//初始url

function fetchPage(x) {     //封装了一层函数
    startRequest(x);
}

function startRequest(x) {
    //采用http模块向服务器发起一次get请求
    http.get(x, function (res) {
        var html = '';        //用来存储请求网页的整个html内容
        var titles = [];
        res.setEncoding('utf-8'); //防止中文乱码
        //监听data事件，每次取一块数据
        res.on('data', function (chunk) {
            html += chunk;
        });
        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end', function () {
            var $ = cheerio.load(html); //采用cheerio模块解析html
            //console.log(html);
            var prefix = 'var aff_data=';
            var content = html.substring(prefix.length);
            var dd = eval("'" + content + "'");
            var obj = JSON.parse(dd);
            //console.log(obj);
            var time = obj.xa;
            var capital = obj.ya;

            var timeArray = time.split(",");
            for(var idx = 0; idx < timeArray.length-1; idx ++){
                console.log(timeArray[idx] + " : " + capital[idx]);
            }
        });
    }).on('error', function (err) {
        console.log(err);
    });
}
fetchPage(url);      //主程序开始运行