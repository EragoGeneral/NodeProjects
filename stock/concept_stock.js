/**
 * Created by Administrator on 2017/12/18.
 */

    var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var db = require('./db');

var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');

var i = 0;

//var url = "http://www.ss.pku.edu.cn/index.php/newscenter/news/2391";
var urlPre = "http://q.10jqka.com.cn/gn/detail/order/desc/page/";
var urlSuffix = "/ajax/1/code/";
//初始url

function fetchPage() {     //封装了一层函数

    var conceptCodes = ['301213', '301631', '301292', '300085', '301436', '301783', '301561', '300351', '301627', '300917', '301455'];
    conceptCodes.forEach(function(conceptCode){
        initStockList(conceptCode);
    });

    /*var pageStart = 5;
    var pageSize = 40;
    var pageIndex = (pageStart - 1)* pageSize;
    buildConceptStockList(pageIndex, pageSize);*/
}

function buildConceptStockList(pageIndex, pageSize){
    db.queryConcept(pageIndex, pageSize, function(err, rows, fields){
        if (err) {
            console.log(err);
            res.end('删除失败：' + err);
        }else {
            if(rows.length>0){
                rows.forEach(function(ele, idx){
                    var conceptCode = ele.code;
                    console.log(conceptCode);
                    initStockList(conceptCode);
                });
            }
        }
    });
}


var timestamp = new Date();
function initStockList(conceptCode) {
    //采用http模块向服务器发起一次get请求
    var listUrl = urlPre + '1' + urlSuffix + conceptCode;
    http.get(listUrl, function (res1) {
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

            var pageSize = $('.page_info').text();
            pageSize = pageSize.substring(pageSize.indexOf("/")+1);
            if(pageSize == "") {
                pageSize = 1;
            }
            var records = [];
            for(var i=1; i <= pageSize; i++){
                (function(i){
                    var pageUrl = urlPre + i + urlSuffix + conceptCode;
                    //console.log(pageUrl);
                    http.get(pageUrl, function (res1) {
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

                            var a = $('tbody tr td a');
                            if(a.length > 0) {
                                var timestamp = new Date();
                                records = [];
                                a.each(function (index, element) {
                                    if (index % 3 == 0) {
                                        var record = [];
                                        var stockCode = $(element).text();
                                        record.push(conceptCode);
                                        record.push(stockCode);
                                        record.push(timestamp);
                                        record.push(timestamp);
                                        record.push(0);
                                        records.push(record);
                                    }
                                });
                                //console.log(records);

                                var sql = "insert into concept_stock(concept_code, stock_code, create_time, update_time, is_deleted) values ?";
                                db.batchInsert(sql, records, function (err) {
                                    if (err) {
                                        console.log(err);
                                        res.end('新增失败：' + err);
                                    }
                                });
                            }
                        });

                    }).on('error', function (err) {
                        console.log(err);
                    });
                })(i, records);
            }
        });

    }).on('error', function (err) {
        console.log(err);
    });
}

fetchPage();      //主程序开始运行