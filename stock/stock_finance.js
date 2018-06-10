/**
 * Created by Administrator on 2017/12/8.
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
    //updateStockCapitalFlow(1, 50);
    loadStockMoneyFlow('002819');
}

function updateStockCapitalFlow(pageNumber, pageSize){

    var dd = new Date();
    var queryDate = dd.getFullYear() + '-' + (dd.getMonth()+1) + '-' + dd.getDate();

    var sql = 'SELECT s.code, t.cnt FROM stock s ' +
        'JOIN stock_daily_info d ON d.is_deleted = 0 AND d.price <> \'\' and d.stock_code = s.code and `date` = \''+ queryDate +'\' ' +
        'LEFT JOIN ( SELECT stock_code, COUNT(id) AS cnt  ' +
        'FROM money_flow ' +
        'where `date` = \'' + queryDate + '\''+
        ' GROUP BY stock_code) t ON t.stock_code = s.code ' +
        'WHERE s.is_deleted = 0 and s.price < 40  ' +
        'AND s.per_net_asset > 2 ' +
        'AND s.per_benefit > 0 ' +
        'AND s.per_funds > 1 ' +
        'AND s.flow_guben < 6 ' +
        //'AND POSITION(\9\ IN s.CODE) <> 1 AND POSITION(\2\ IN s.CODE) <> 1 AND s.is_deleted = 0 ' +
        'AND d.syl < 40  ' +
        'and t.cnt is null ' +
        'order by s.id limit ?, ?';
    var pageIndex = (pageNumber-1)*pageSize;
    var params = [pageIndex, pageSize];
    //console.log(sql);
    db.queryNoMoneyFlow(sql, params, function (err, rows, fields) {
        if(err){
            console.log(err);
        }
        rows.forEach(function(item){
            var code = item.code;
            (function(code){
                loadStockMoneyFlow(code);
            })(code);
        });
    });
}

function loadStockMoneyFlow(code){
    var qCode = '';
    if(code.indexOf('6') == 0){
        qCode = code + '1';
    }else{
        qCode = code + '2';
    }

    var timestamp = Date.parse(new Date());
    var urlPrefix = 'http://ff.eastmoney.com/EM_CapitalFlowInterface/api/js?id=';
    var urlSuffix = '&type=ff&check=MLBMS&cb=var%20aff_data=&js={(x)}&rtntype=3&acces_token=1942f5da9b46b069953c873404aad4b5&_='+timestamp;

    var qUrl = urlPrefix + qCode + urlSuffix;
    //console.log(qUrl);
    //采用http模块向服务器发起一次get请求
    http.get(qUrl, function (res) {
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
            var records = [];
            var d = new Date();
            var dateStr = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
            console.log(dateStr);
            for(var idx = 0; idx < timeArray.length-1; idx ++){
                //console.log(timeArray[idx] + " : " + capital[idx]);
                var capitalArray = capital[idx].split(',');

                if(capitalArray[4] != ''){
                    var smallOrder = capitalArray[4];
                    var middleOrder = capitalArray[3];
                    var bigOrder = capitalArray[2];
                    var superOrder = capitalArray[1];
                    var mainOrder = capitalArray[0];

                    var record = [];

                    record.push(code);
                    record.push(dateStr);
                    record.push(timeArray[idx]);
                    record.push(smallOrder);
                    record.push(middleOrder);
                    record.push(bigOrder);
                    record.push(superOrder);
                    record.push(mainOrder);
                    record.push(d);
                    record.push(d);
                    record.push(0);

                    records.push(record);
                }
            }
            var delParams = [code, dateStr];
            db.deleteStockMoneyFlow(delParams, function(err, rows, field){
                if(err){
                    console.log('delete...');
                    console.log(err);
                }
                var sql = "insert into money_flow(stock_code, date, time, small_order, middle_order, big_order, super_order, main_order, create_time, update_time, is_deleted) values ?";
                if(records.length > 0) {
                    db.batchInsert(sql, records, function (err) {
                        if (err) {
                            console.log('batch insert');
                            console.log(err);
                            res.end('新增失败：' + err);
                        }
                        //process.exit();
                    });
                }
            });
        });
    }).on('error', function (err) {
        console.log(err);
    });
}

fetchPage(url);      //主程序开始运行