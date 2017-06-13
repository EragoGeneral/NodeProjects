var http = require('http');

http.get('http://www.xiaohongshu.com/api/store/ps/items?keyword=%E6%89%8B%E8%A1%A8&mode=word_search&page=1&per_page=20&sort=price&direction=&source=classifications&android_app_ssl=1&platform=Android&deviceId=b3b6dd93-a51c-3ace-a79c-fbdff5a4f70c&versionName=4.21&channel=Store360&sid=session.1181513049171586078&lang=zh-CN&t=1497022624&sign=b4c71eaf69f34bf87a06cd5d058475e9', function (res) {
    //console.log("statusCode: ", res.statusCode);
    //console.log("headers: ", res.headers);
    var json = '';
    res.on('data', function (d) {
        json += d;
    });
    res.on('end',function(){
        //获取到的数据
        json = JSON.parse(json);
		console.log(json.data.items[0]);
    });
}).on('error', function (e) {
    console.error(e);
});