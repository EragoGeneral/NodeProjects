var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var db = require('./db');

var i = 0;

//var url = "http://www.ss.pku.edu.cn/index.php/newscenter/news/2391"; 
var url = "http://q.10jqka.com.cn/gn/";
//初始url

function fetchPage(x) {     //封装了一层函数
    startRequest(x);
}
var timestamp = new Date();

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

            var data = $('#maincont #gnSection');
            //console.log(data.val());

            data = eval("'" + data.val() + "'");
            //console.log(data);

            var obj = JSON.parse(data);
            //console.log(obj);
            var ret = [];
            for(var i=0; i < 200; i++){
                var item = obj[i];
                if(item != undefined){
                    //console.log('code:' + item.platecode + ', ' + 'name:'+item.platename);
                    var record = [];
                    record.push(item.platecode);
                    record.push(item.platename);
                    record.push(timestamp);
                    record.push(timestamp);
                    record.push(0);
                    ret.push(record);
                }
            }

            /*var values = [
                ["index","www.alibaba.com",1,0],
                ["index1","www.google.com",1,0]
            ];
            console.log(values);*/
            console.log(ret);
            var sql = "insert into concept(code, name, create_time, update_time, is_deleted) values ?";
            db.batchInsert(sql, ret, function(err){
                if(err){
                    console.log(err);
                    res.end('新增失败：' + err);
                }
                process.exit();
            });
        });

    }).on('error', function (err) {
        console.log(err);
    });

}
//该函数的作用：在本地存储所爬取的新闻内容资源
function savedContent($, news_title) {
    $('.article-content p').each(function (index, item) {
        var x = $(this).text();

        var y = x.substring(0, 2).trim();

        if (y == '') {
            x = x + '\n';
//将新闻文本内容一段一段添加到/data文件夹下，并用新闻的标题来命名文件
            fs.appendFile('./data/' + news_title + '.txt', x, 'utf-8', function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    })
}
//该函数的作用：在本地存储所爬取到的图片资源
function savedImg($,news_title) {
    $('.article-content img').each(function (index, item) {
        var img_title = $(this).parent().next().text().trim();  //获取图片的标题
        if(img_title.length>35||img_title==""){
            img_title="Null";}
        var img_filename = img_title + '.jpg';

        var img_src = 'http://www.ss.pku.edu.cn' + $(this).attr('src'); //获取图片的url

//采用request模块，向服务器发起一次请求，获取图片资源
        request.head(img_src,function(err,res,body){
            if(err){
                console.log(err);
            }
        });
        request(img_src).pipe(fs.createWriteStream('./image/'+news_title + '---' + img_filename));     //通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
    })
}
fetchPage(url);      //主程序开始运行