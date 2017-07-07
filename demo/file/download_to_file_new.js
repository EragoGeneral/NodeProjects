var download = require('download-to-file');
var query=require("../../mysql/query.js");  
var fs = require("fs");
var os = require('os');  

var arguments = process.argv.splice(2);
var start = arguments[0];


var fWriteName = './error.log';  
var fWrite = fs.createWriteStream(fWriteName); 


var baseDir = 'E://a_qiniu//syncUser//readyToUpload//';
var preUrl = 'http://jimu.ubtrobot.com/syncUser/';

// 234432

var sql = "SELECT * FROM jimudb.jimu_sync_files WHERE is_deleted = '0' AND account_name <> '' AND qn_file_url IS NULL AND id >= " + start + "  AND user_id IS NOT NULL ";
var urls = [];

query(sql, function(err,vals,fields){  
	for(var i = 0; i < vals.length; i++){
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
		var downloadFile = urls[idx].url;
		var fileId = urls[idx].id;
		var relaPath = downloadFile.substring(preUrl.length);
		download(downloadFile, baseDir + relaPath, function (err) {			
		  if (err) {
			  console.log("Error file: " + downloadFile + ", file Id is: " + fileId);
			  console.log(err);
			  errorFiles.push("File Id is: " + fileId + ", file Url is: " + downloadFile+ "\n");			  
			  fWrite.write(downloadFile + os.EOL);
		  }
		  console.log(++counter);		  
		});		
	}	
});



