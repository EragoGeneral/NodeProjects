var download = require('download-to-file');
var query=require("../../mysql/query.js");  
var fs = require("fs");

var arguments = process.argv.splice(2);
var start = arguments[0];
var size = arguments[1];

var baseDir = 'E://a_qiniu//syncUser//readyToUpload//';
var preUrl = 'http://jimu.ubtrobot.com/syncUser/';

/*
var downloadFile = 'http://jimu.ubtrobot.com/syncUser/%E6%9E%97%E5%A4%95/default/Dragon/Dragon/Dragon.config';
var relaPath = downloadFile.substring(preUrl.length); 
download(downloadFile, baseDir + relaPath, function (err) {
  if (err) throw err
  console.log('Download finished');
});
*/

var sql = "select id, account_name, file_url FROM jimudb.jimu_sync_files WHERE user_id IS NULL AND account_name <> '' AND account_name NOT IN ('zz', '你', 'zx', '大牛', '阿尔法机器人', 'ir', 'lemon', '老董', 'radioshack', '偶', '刘', 'LBJ', '仔仔', '小白', 'seven') order by id limit " + start +","+size;
var urls = [];

query(sql, function(err,vals,fields){  	
		
	for(var i = 0; i < vals.length; i++){
		//console.log("%d\t%s\t%s", vals[i].id, vals[i].file_url, vals[i].account_name);
		var downloadFile = vals[i].file_url;
		var obj = {};
		obj.url = downloadFile;
		obj.id = vals[i].id;
		urls.push(obj);		
		console.log(obj.id);
	}
	var errorFiles = [];
	console.log(urls.length);
	var counter = 0;
	for(var idx = 0; idx < urls.length; idx++){		
		//console.log(urls[idx]);
		var downloadFile = urls[idx].url;
		var fileId = urls[idx].id;
		var relaPath = downloadFile.substring(preUrl.length);
		download(downloadFile, baseDir + relaPath, function (err) {			
		  if (err) {
			  console.log("Error file: " + downloadFile + ", file Id is: " + fileId);
			  console.log(err);
			  //console.log('Download failed');
			  errorFiles.push("File Id is: " + fileId + ", file Url is: " + downloadFile+ "\n");
			  /*fs.open("error.txt","a",function(err,fd){
					var buf = new Buffer("File Id is: " + fileId + ", file Url is: " + downloadFile+ "\n");
					fs.writeSync(fd,buf,0,buf.length,0);
				});*/
		  }
		  console.log(++counter);		  
		});		
	}	
});



