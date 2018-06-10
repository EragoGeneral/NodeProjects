/**
 * Created by Administrator on 2018/6/10.
 */
this.checkCodeUrl = 'https://meiking.tmall.com/i/asynSearch.htm?mid=w-14905613363-0&wid=14905613363&spm=a1z10.3-b-s.w16607738-14905613357.4.4a2813abophis1';
var https = require('https');
https.get(this.checkCodeUrl,function(res){
    var datas = [];
    var size = 0;
    res.on('data', function(data){
        datas.push(data);
        size += data.length;
    })
    res.on('end', function(data){
        var buff = Buffer.concat(datas, size);
        var pic = buff.toString();
        //callback({success:true, data:pic});
        console.log(pic);
    })
}).on('error',function(err){
    console.log('获取验证码异常,异常原因'+err);
    callback({success:false, msg:'获取验证码失败'});
})