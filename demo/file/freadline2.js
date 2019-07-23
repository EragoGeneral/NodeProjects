var readline = require('readline');  
var fs = require('fs');  
var os = require('os');  
var download = require('download-to-file');


var arguments = process.argv.splice(2);
var fileName = arguments[0];
  
var baseDir = 'E://XHS//';
var preUrl = 'http://jimu.ubtrobot.com/syncUser/';  
  
var fReadName = 'G://XHS//'+ fileName +'.txt';  
var fWriteName = './1.readline.log';  
var fRead = fs.createReadStream(fReadName);  
var fWrite = fs.createWriteStream(fWriteName);  
  
  
var objReadline = readline.createInterface({  
    input: fRead,  
// ������һ�ָ��Ʒ�ʽ������on('line')��Ͳ����ٵ���fWrite.write(line)����ֻ�Ǵ��⸴���ļ�ʱ�Ƽ�ʹ��  
// ���ļ�ĩβ�����һ��index����   sodino.com  
//  output: fWrite,   
//  terminal: true  
});  
  
  
var index = 1;  
objReadline.on('line', (line)=>{  
    var tmp = 'line' + index.toString() + ':' + line;  	
     // ��һ��  
    //console.log(index, line);  
    index ++;  
	
	var obj = JSON.parse(line);
	console.log(obj);	
	var fileArray = obj.images.split(';'); 
	console.log(fileArray);
	for(var idx = 0; idx < fileArray.length; idx++){
		var downloadFile = 'https://' + fileArray[idx];
		console.log(downloadFile);		
		var relaPath = obj.id;
		var imageName = downloadFile.substring(downloadFile.lastIndexOf('/')+1);	
		console.log(relaPath);
		download(downloadFile, baseDir + relaPath + '/' + imageName, function (err) {			
		  if (err) {
			  console.log("Error file: " + downloadFile);
			  console.log(err);		
			  fWrite.write("'"+fileArray[2] + "'," + os.EOL);		  
		  }
		  console.log(index);		  
		});
	} 
});  
  
objReadline.on('close', ()=>{  
    console.log('readline close...');  
});  