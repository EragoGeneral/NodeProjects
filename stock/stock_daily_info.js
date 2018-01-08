/**
 * Created by Administrator on 2017/12/12.
 */
var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var db = require('./db');
var tools = require('./tools');

var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');
var i = 0;

var url = "http://qd.10jqka.com.cn/quote.php?cate=real&type=stock&return=json&callback=showStockData&code=";

function fetchPage(x) {     //封装了一层函数
    //updatePageStockInfo(12, 300);

    var codeArray = ['000991',
        '600349',
        '002720',
        '300361',
        '002710',
        '000916',
        '002525',
        '002257'];
    codeArray.forEach(function(element){
        loadStockDailyInfo(element);
    });
}

fetchPage(url);      //主程序开始运行

function updatePageStockInfo(pageNumber, pageSize){
    var pageIndex = (pageNumber - 1) * pageSize;

    db.queryStockByPage(pageIndex, pageSize, function (err, rows, fields) {
        if (rows.length > 0) {
            var queryCode = '';
            rows.forEach(function (element) {
                queryCode += element.code + ',';
            });
            loadStockDailyInfo(queryCode);
        }
    });
}

function loadStockDailyInfo(code) {
    //console.log('code: '+code);
    var dailyUrl = url + code;
    http.get(dailyUrl, function (res) {
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

            var resultPrefix = 'showStockData(';
            html = html.substring(resultPrefix.length, html.length - 1);
            var data = unescape(html.replace(/\\u/gi, '%u'));
            var obj = JSON.parse(data);
            //console.log("市盈率：" + obj.data[code][2034120]);
            //console.log("换手率: " + obj.data[code][1968584]);

            var codeArray = code.split(',');
            for (var idx = 0; idx < codeArray.length; idx++) {
                code = codeArray[idx];
                //console.log(code);
                if (code !== '') {
                    (function (code, obj) {
                        //console.log(code);
                        //console.log(obj.data[code][2034120]);
                        if(obj.data[code] != null) {
                            var syl = obj.data[code][2034120];
                            var hsl = obj.data[code][1968584];
                            var zf = obj.data[code][199112];
                            var price = obj.data[code][10];
                            var timestamp = new Date();
                            var d = new Date();
                            var dateStr = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
                            var qParam = [code, dateStr];
                            var sql = 'select * from stock_daily_info where stock_code = ? and date = ?';
                            db.queryStockDailyInfo(sql, qParam, function (err, rows) {
                                if (rows.length == 0) {
                                    var sql = 'insert into stock_daily_info(stock_code, date, price, syl, hsl, zf, create_time, update_time, is_deleted) values(?, ?, ?, ?, ?, ?, ?, ?, 0)';
                                    var params = [code, dateStr, price, syl, hsl, zf, timestamp, timestamp];
                                    db.initStockDailyInfo(sql, params, function (err, rows) {
                                        if (err) {
                                            console.log(err);
                                            console.log(rows);
                                        }
                                    });
                                } else {
                                    var updCode = rows[0].code;
                                    var sql = 'update stock_daily_info set price = ?, syl = ?, hsl = ?, zf = ?, update_time = ? where stock_code = ? and date = ?';
                                    var updParams = [price, syl, hsl, zf, timestamp, code, dateStr];
                                    db.updateStockDailyInfo(sql, updParams, function (err, rows, fields) {
                                        if (err) {
                                            console.log(err);
                                        }
                                    });
                                }
                            });
                        }
                    })(code, obj);
                }
            }
            //console.log(obj.data);
            /*var syl = obj.data[code][2034120];
             var hsl = obj.data[code][1968584];
             var timestamp = new Date();
             db.queryStockDailyInfo(code, function (err, rows) {
             if (rows.length == 0) {
             var sql = 'insert into stock_daily_info(stock_code, syl, hsl, create_time, update_time, is_deleted) values(?, ?, ?, ?, ?, 0)';
             var params = [code, syl, hsl, timestamp, timestamp];
             db.initStockDailyInfo(sql, params, function (err, rows) {
             if (err) {
             console.log(err);
             console.log(rows);
             }
             });
             }else{
             var updCode = rows[0].code;
             var sql = 'update stock_daily_info set syl = ?, hsl = ?, update_time = ? where stock_code = ?';
             var updParams = [syl, hsl, timestamp, code];
             db.updateStockDailyInfo(sql, updParams, function (err, rows, fields) {
             if(err){
             console.log(err);
             }
             });
             }
             });*/
        });
    }).on('error', function (err) {
        console.log(err);
    });
}