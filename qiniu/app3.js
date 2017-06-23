/**
 * Created by ubt on 2017/5/27.
 */
var qiniu = require("qiniu");

var fs = require('fs');
var path = require('path');
var delDir = require('./delete_dir.js');

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'OJb5DHhgOxDo42se8R2JvwLyaykWLUBYowqMA3Nu';
qiniu.conf.SECRET_KEY = 'tRfcP40zLvGUwfVANQEClOnyn2ATb2spLki9K7cH';
//要上传的空间
bucket = 'ubtech';

//上传到七牛后保存的文件名

//key = 'jimu/modelImages/default/TankbotPro.zip';

//用户自定义模型缩略图上传
baseKey = 'jimu/test/user/files/';
key = '';

//构建上传策略函数
function uptoken(bucket, key) {
    //console.log('key in token: ' + key);
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    return putPolicy.token();
}
//生成上传 Token

//要上传文件的本地路径
filePath = 'E:\\dev\\actionZip\\TankbotPro.zip'

var dir = "E:\\a_qiniu\\test\\syncUser_upload";

//构造上传函数
function uploadFile(uptoken, key, localFile) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if(!err) {
            // 上传成功， 处理返回值
            console.log(ret.hash, ret.key, ret.persistentId);
			//console.log("localFile: " + localFile);
        } else {
            // 上传失败， 处理返回代码
            console.log(err);
        }
    });
}

//调用uploadFile上传
//uploadFile(token, key, filePath);
function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
		//console.log('localDir: ' + pathname);
    });
}

travel(dir, function (pathname) {
    //console.log("pathname: " + pathname);
    var relativePath = pathname.substring(dir.length+1).replace(/\\/g, "/");
    //console.log("relativePath: " + relativePath);
    key = baseKey + relativePath;
    //console.log(key);
    var token = uptoken(bucket, key);
    uploadFile(token, key, pathname);
});

fs.readdir(dir, function(err, files){
	console.log(files);
	delDir(dir+'\\'+files);
});
