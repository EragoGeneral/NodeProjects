var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var db = require('./db');
var tools = require('./tools');

var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');
var i = 0;

//var url = "http://www.ss.pku.edu.cn/index.php/newscenter/news/2391"; 
var url = "http://stockpage.10jqka.com.cn/";
//初始url

function fetchPage(x) {     //封装了一层函数
    //startRequest(x);
    //loadAllStocks();
    loadStockDetailInfo(7, 500);
}


function loadAllStocks(){
    var stocksUrl = 'http://q.10jqka.com.cn/';
    http.get(stocksUrl, function (res) {
        var html = '';        //用来存储请求网页的整个html内容
        res.setEncoding('utf-8'); //防止中文乱码

        //监听data事件，每次取一块数据
        res.on('data', function (chunk) {
            html += chunk;
            //console.log(chunk);
        });
        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end', function () {
            var $ = cheerio.load(html); //采用cheerio模块解析html
            //console.log(html);

            var text = $('.page_info').text();
            //console.log(text);
            var pageSize = text.substring(text.indexOf('/')+1);
            //console.log(pageSize);


            for(var i = 100; i <= pageSize; i++){
                (function(i) {
                    var stockPageUrl = 'http://q.10jqka.com.cn/index/index/board/all/field/zdf/order/desc/page/'+ i +'/ajax/1/';

                    http.get(stockPageUrl, function (res1) {
                        var html1 = '';        //用来存储请求网页的整个html内容
                        var titles = [];
                        //res1.setEncoding('utf-8'); //防止中文乱码
                        //监听data事件，每次取一块数据
                        var bufferHelper = new BufferHelper();
                        res1.on('data', function (chunk1) {
                            html1 += chunk1;
                            bufferHelper.concat(chunk1);
                        });
                        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
                        res1.on('end', function () {
                            //console.log(iconv.decode(bufferHelper.toBuffer(),'GBK'));
                            var html1 = iconv.decode(bufferHelper.toBuffer(),'GBK');
                            //console.log(html1);
                            var $ = cheerio.load(html1); //采用cheerio模块解析html

                            var td = $('tbody tr td');
                            //console.log(td.length);

                            var stocks = [];
                            for(var idx = 0; idx < td.length; idx+=15){
                                var code = $(td[idx+1]).text();
                                var name = $(td[idx+2]).text();
                                var ysl = $(td[idx+13]).text();
                               // console.log(code + ", " + name + ", " + ysl);
                                var Stock = new Object();
                                Stock.code = code;
                                Stock.name = name;
                                Stock.syl = ysl;

                                stocks.push(Stock);
                            }
                            loadStockInfo(stocks);
                        });
                    }).on('error', function (err) {
                        console.log(err);
                    });

                })(i);

            }
        });
    }).on('error', function (err) {
        console.log(err);
    });
}


function startRequest(x) {
    var codes = ['002230', '300311', '603050', '600959'];
    for(var pos = 0; pos < codes.length; pos++) {
        (function(pos){
            var code = codes[pos];
            var url = x + code + '/';
            db.queryStockInfo(code, function (err, rows) {
                console.log(code);

                if (rows.length == 0) {
                    //采用http模块向服务器发起一次get请求
                    http.get(url, function (res) {
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

                            var name = $('.m_logo strong').text();
                            console.log(name);

                            var data = [];
                            var titleArray = [];
                            var valueArray = [];
                            var detail_title = $('.company_details dt');
                            var detail_value = $('.company_details dd');
                            //console.log(detail.text());
                            detail_title.each(function (idx, element) {
                                //console.log(idx);
                                var $element = $(element);
                                //console.log($element.text());
                                var header = $element.text();
                                //console.log(i);
                                //console.log(j);
                                titleArray.push(header);
                            });
                            detail_value.each(function (idx, element) {
                                //console.log(data[idx]);
                                if (idx != 3) {
                                    var $element = $(element);
                                    var val = $(element).attr('title');
                                    if (val == undefined) {
                                        val = $element.text();
                                    }
                                    valueArray.push(val);
                                }
                            });

                            for (var idx = 0; idx < titleArray.length; idx++) {
                                var d = {
                                    'title': titleArray[idx],
                                    'value': valueArray[idx]
                                };
                                data.push(d);
                            }
                            //console.log(data);
                            var record = [];
                            record.push(code);
                            record.push(name);
                            record.push(valueArray[1]);
                            record.push(valueArray[12]);
                            record.push(valueArray[13]);
                            record.push(0);
                            //console.log(record);

                            db.initStockInfo(record, function (err, rows) {
                                if (err) {
                                    console.log(err);
                                    // res.end('新增失败：' + err);
                                }
                            });
                        });
                    }).on('error', function (err) {
                        console.log(err);
                    });
                }
            });
        })(pos);
    }
}

fetchPage(url);      //主程序开始运行


function loadStockInfo(stocks) {
    //var codes = ['002024', '300503', '300668', '603258'];
    var insertRets = [];

    for(var pos = 0; pos < stocks.length; pos++) {
        (function(pos, url){
            var code = stocks[pos].code;
            var name = stocks[pos].name;
            var syl = stocks[pos].syl;
            var url = url + code + '/';
            db.queryStockInfo(code, function (err, rows) {
                console.log(code);

                if (rows.length == 0) {
                    //采用http模块向服务器发起一次get请求
                    /*http.get(url, function (res) {
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

                            // var name = $('.m_logo strong').text();
                            // console.log(name);

                            var data = [];
                            var titleArray = [];
                            var valueArray = [];
                            var detail_title = $('.company_details dt');
                            var detail_value = $('.company_details dd');
                            //console.log(detail.text());
                            detail_title.each(function (idx, element) {
                                //console.log(idx);
                                var $element = $(element);
                                //console.log($element.text());
                                var header = $element.text();
                                //console.log(i);
                                //console.log(j);
                                titleArray.push(header);
                            });
                            detail_value.each(function (idx, element) {
                                //console.log(data[idx]);
                                if (idx != 3) {
                                    var $element = $(element);
                                    var val = $(element).attr('title');
                                    if (val == undefined) {
                                        val = $element.text();
                                    }
                                    valueArray.push(val);
                                }
                            });

                            for (var idx = 0; idx < titleArray.length; idx++) {
                                var d = {
                                    'title': titleArray[idx],
                                    'value': valueArray[idx]
                                };
                                data.push(d);
                            }
                            //console.log(data);
                            var record = [];
                            record.push(code);
                            record.push(name);
                            record.push(valueArray[1]);
                            record.push(valueArray[12]);
                            record.push(valueArray[13]);
                            record.push(syl);
                            record.push(0);
                            //console.log(record);

                            db.initStockInfo(record, function (err, rows) {
                                if (err) {
                                    console.log(err);
                                    console.log(rows);
                                    // res.end('新增失败：' + err);
                                }
                            });


                        });
                    }).on('error', function (err) {
                        console.log(err);
                    });*/
                    var record = [];
                    var timestamp = new Date();
                    record.push(code);
                    record.push(name);
                    record.push(syl);
                    record.push(timestamp);
                    record.push(timestamp);
                    record.push(0);
                    db.initStockInfo(record, function (err, rows) {
                        if (err) {
                            console.log(err);
                            console.log(rows);
                            // res.end('新增失败：' + err);
                        }
                    });
                }
            });
        })(pos, url);
    }
}

function loadStockDetailInfo(pageNum, pageSize){
    var pageIndex = (pageNum-1)*pageSize;
    db.queryStockByPage(pageIndex, pageSize, function (err, rows, fields) {
        if(err){
            console.log(err);
        }
        rows.forEach(function(item){
            var code = item.code;
            //console.log(item.code);
            var detailUrl = url + code + '/';
            (function(code, detailUrl){
                http.get(detailUrl, function (res) {
                    console.log(url);
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

                        var name = $('.m_logo strong').text();
                        console.log(name);

                        var data = [];
                        var titleArray = [];
                        var valueArray = [];
                        var detail_title = $('.company_details dt');
                        var detail_value = $('.company_details dd');
                        //console.log(detail.text());
                        detail_title.each(function (idx, element) {
                            //console.log(idx);
                            var $element = $(element);
                            //console.log($element.text());
                            var header = $element.text();
                            //console.log(i);
                            //console.log(j);
                            titleArray.push(header);
                        });
                        detail_value.each(function (idx, element) {
                            //console.log(data[idx]);
                            if (idx != 3) {
                                var $element = $(element);
                                var val = $(element).attr('title');
                                if (val == undefined) {
                                    val = $element.text();
                                }
                                valueArray.push(val);
                            }
                        });

                        for (var idx = 0; idx < titleArray.length; idx++) {
                            var d = {
                                'title': titleArray[idx],
                                'value': valueArray[idx]
                            };
                            data.push(d);
                        }
                        console.log(data);
                        
						
                        var concept = valueArray[1];
                        var total_guben = valueArray[12];
                        var flow_guben = valueArray[13];
                        var timestamp = new Date();
                        var sql = 'update stock set concept = ?, total_guben = ?, flow_guben = ?, update_time = ? where code = ?';
                        var params = [concept, total_guben, flow_guben, timestamp, code];
                        console.log(sql);
                        console.log(params);
                        db.updateStockDetailInfo(sql, params, function(err, rows, fields) {
                            if(err){
                                console.log(err);
                            }
                            console.log(rows.affectedRows);
                        });
                    });
                }).on('error', function (err) {
                    console.log(err);
                });
            })(code, detailUrl);
        });
        //console.log(fields);
    })
}