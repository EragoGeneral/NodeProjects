/**
 * Created by Administrator on 2018/6/10.
 */
var http = require("http");//引入模块；

var options = {
    hostname: "www.baidu.com",
    port: 80,
    path: "/course/documment",
    method: "post",
    headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Length': queryS.length,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'PHPSESSID=6hctahvmrcfg0oea9nmcfrffd4; imooc_uuid=c753f7aa-b801-4975-b9aa-7d6bd3efc271; imooc_isnew_ct=1449740461; IMCDNS=0; loginstate=1; apsid=UyYmUwZjRhNWViNTYxNmU4OGVmYzQ5MDhmMjQ4MzYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzQ1ODExAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB0b25nd2FuZ3l1YW5AMTYzLmNvbQAAAAAAAAAAAAAAAGYzMGJhMWVjNzNjZjk2ZGYwMzJkZTU0ODQ3YTdkNmZk%2BWlqVvlpalY%3DZG; last_login_username=tongwangyuan%40163.com; jwplayer.volume=80; jwplayer.qualityLabel=é«æ¸; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1450092853,1450144785,1450181180,1450228666; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1450676378; imooc_isnew=2; cvde=56725519b7999-209',
        'Host': 'www.imooc.com',
        'Origin': 'http://www.imooc.com',
        'Pragma': 'no-cache',
        'Referer': 'http://www.imooc.com/video/8837',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    }
}

var res = http.request(options, function (res) {
    console.log(res.statusCode);
    console.log(res.headers);
    res.on("data", function (data) {
        console.log(Buffer.isBuffer(data));
        console.log(typeof data);
    });
    res.on("end", function () {
        console.log("发送结束");
    });
    res.on("error", function () {
        console.log("error");
    });
})

var queryS = queryString.stringify({
    content: "不错啊",
    cid: 8837
});
res.write(queryS);
res.end();