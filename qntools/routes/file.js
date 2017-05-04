var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var AVATAR_UPLOAD_FOLDER = '/avatar/';
var multiparty = require('multiparty');
var util = require('util');
var TITLE = '文件上传成功';


var qiniu = require("qiniu");
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'OJb5DHhgOxDo42se8R2JvwLyaykWLUBYowqMA3Nu';
qiniu.conf.SECRET_KEY = 'tRfcP40zLvGUwfVANQEClOnyn2ATb2spLki9K7cH';
//要上传的空间
bucket = 'ubtech';

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

/* GET index page. */
router.get('/', function(req, res,next) {
  res.render('index', { title: 'Express' });    // 到达此路径则渲染index文件，并传出title值供 index.html使用
});


router.route("/upload").get(function(req,res){    // 到达此路径则渲染register文件，并传出title值供 upload.html使用
    res.render("upload",{title:'File upload'});
});

router.route("/upload_new").get(function(req,res){    // 到达此路径则渲染register文件，并传出title值供 upload.html使用
    res.render("upload_new",{title:'File upload New'});
});

function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  return putPolicy.token();
}

function uploadFile(uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId);       
      } else {
        // 上传失败， 处理返回代码
        console.log(err);
      }
  });
}

router.post('/upload', function(req, res){
	console.log(req.body);
	
	var form = new formidable.IncomingForm();   //创建上传表单
	form.encoding = 'utf-8';		//设置编辑
	form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录
	form.keepExtensions = true;	 //保留后缀
	form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

	form.parse(req, function(err, fields, files) {
		
		var key = fields.relativePath + '/' + files.fulAvatar.name;
		//生成上传 Token
		token = uptoken(bucket, key);
		
		if (err) {
		  res.locals.error = err;
		  res.render('index', { title: TITLE });
		  return;		
		}  
	    console.log(files);
		console.log(key);
		
		var filesTmp = JSON.stringify(files,null,2);
		console.log(filesTmp);
		//文件上传至七牛
		//uploadFile(token, key, files.fulAvatar.path);
		
		/*var extName = '';  //后缀名
		switch (files.fulAvatar.type) {
			case 'image/pjpeg':
				extName = 'jpg';
				break;
			case 'image/jpeg':
				extName = 'jpg';
				break;		 
			case 'image/png':
				extName = 'png';
				break;
			case 'image/x-png':
				extName = 'png';
				break;		 
		}

		if(extName.length == 0){
			  res.locals.error = '只支持png和jpg格式图片';
			  res.render('index', { title: TITLE });
			  return;				   
		}

		var avatarName = Math.random() + '.' + extName;
		var newPath = form.uploadDir + avatarName;

		console.log(newPath);
		fs.renameSync(files.fulAvatar.path, newPath);  //重命名*/		
		
	});

	res.locals.success = '上传成功';
	res.render('index', { title: TITLE });
	
	
	
 });
 
 
 router.post('/upload_new', function(req, res, next){
	var form = new multiparty.Form({uploadDir: 'public' + AVATAR_UPLOAD_FOLDER});
	 //上传完成后处理
	 form.parse(req, function(err, fields, files) {
		 
	  console.log("relativePath: " + fields.relativePath);
		 
	  var filesTmp = JSON.stringify(files,null,2);
	  if(err){
	   console.log('parse error: ' + err);
	  } else {
	   console.log('parse files: ' + filesTmp);
	   
	   for(var i=0; i< files.inputFile.length; i++){
		   var inputFile = files.inputFile[i];
		   console.log("inputFile obj: " + inputFile);
		   var uploadedPath = inputFile.path;
		   var dstPath = 'public' + AVATAR_UPLOAD_FOLDER + inputFile.originalFilename;
		   //重命名为真实文件名	   
		   fs.rename(uploadedPath, dstPath, function(err) {
			if(err){
			 console.log('rename error: ' + err);
			} else {
			 console.log('rename ok');
			}
		   });
	   }
	   
	   
	  }
	  //res.writeHead(, {'content-type': 'text/plain;charset=utf-'});
	  //res.write('received upload:\n\n');
	  //res.end(util.inspect({fields: fields, files: filesTmp}));
	  res.locals.success = '上传成功';
		res.render('index', { title: util.inspect({fields: fields, files: filesTmp}) });
	 });
 });

module.exports = router;
