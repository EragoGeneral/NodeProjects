/**
 * Created by Administrator on 2017/12/7.
 */
/**
 * Created by Administrator on 2017/12/7.
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

//var url = "http://www.ss.pku.edu.cn/index.php/newscenter/news/2391";
var url = "http://stockpage.10jqka.com.cn/";
//初始url

function fetchPage(x) {     //封装了一层函数
    //updateStockBaseInfo(x);
    loadStockDetailInfo(1, 100);
}

//此方法；暂时不用
/*function updateStockBaseInfo(x) {
    var codes = ['002461'];
    for(var pos = 0; pos < codes.length; pos++) {
        (function(pos){
            var code = codes[pos];
            var url = x + code + '/';
            db.queryStockInfo(code, function (err, rows) {
                console.log(code);

                if (rows.length != 0) {
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
                            //console.log(data);
                            var record = [];
                            //record.push(code);
                            console.log(name);
                            record.push(name);
                            record.push(valueArray[1]);
                            record.push(valueArray[4]);
                            record.push(valueArray[5]);
                            record.push(valueArray[6]);
                            record.push(valueArray[7]);
                            record.push(valueArray[8]);
                            record.push(valueArray[9]);
                            record.push(valueArray[10]);
                            record.push(valueArray[11]);
                            record.push(valueArray[12]);
                            record.push(valueArray[13]);
                            record.push(0);
                            console.log(record);
                            var sql = 'update stock set name = ?, concept = ?, per_net_asset = ?, per_benefit = ?, net_profit = ?, net_profit_rate = ?, income = ?, per_money_flow = ?, per_funds = ?, per_ua_profit= ?, total_guben = ?, flow_guben = ? where code = ' + code;
                            db.updateStockBaseInfo(sql, record, function (err, rows) {
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
}*/

fetchPage(url);      //主程序开始运行

function loadStockDetailInfo(pageNum, pageSize) {
    var pageIndex = (pageNum - 1) * pageSize;
    db.queryStockByPage(pageIndex, pageSize, function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        rows.forEach(function (item) {
            var code = item.code;
            var detailUrl = url + code + '/';
            (function (code, detailUrl) {
                http.get(detailUrl, function (res) {
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
                        var curPrice = $('#hexm_curPrice');

                        var data = [];
                        var titleArray = [];
                        var valueArray = [];
                        var detail_title = $('.company_details dt');
                        var detail_value = $('.company_details dd');
                        //console.log(detail.text());
                        detail_title.each(function (idx, element) {
                            var $element = $(element);
                            var header = $element.text();
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

                        var concept = valueArray[1];
                        var per_net_asset = valueArray[4];
                        var per_benefit = valueArray[5];
                        var net_profit = valueArray[6];
                        var net_profit_rate = valueArray[7];
                        var income = valueArray[8];
                        var per_money_flow = valueArray[9];
                        var per_funds = valueArray[10];
                        var per_ua_profit = valueArray[11];
                        var total_guben = valueArray[12];
                        var flow_guben = valueArray[13];
                        var timestamp = new Date();
                        var sql = 'update stock set concept = ?, per_net_asset = ?, per_benefit = ?, net_profit = ?, net_profit_rate = ?, income = ?, per_money_flow = ?, per_funds = ?, per_ua_profit= ?, total_guben = ?, flow_guben = ?, update_time = ? where code = ?';
                        var params = [concept, per_net_asset, per_benefit, net_profit, net_profit_rate, income, per_money_flow, per_funds, per_ua_profit, total_guben, flow_guben, timestamp, code];

                        db.updateStockDetailInfo(sql, params, function (err, rows, fields) {
                            if (err) {
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
    })
}