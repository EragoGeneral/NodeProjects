var readline = require('readline');  
var fs = require('fs');  
var os = require('os');  
var download = require('download-to-file');
  
var baseDir = 'E://a_qiniu//syncUser//readyToUpload//';
var preUrl = 'http://jimu.ubtrobot.com/syncUser/';  
  
var fReadName = '../../mysql/urls/246442-NotFound.txt';  
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
    console.log(index, line);  
    index ++;  
	
	var fileArray = tmp.split('@@');
    var downloadFile = fileArray[2];	
    var relaPath = downloadFile.substring(preUrl.length);
	
	download(downloadFile, baseDir + relaPath, function (err) {			
	  if (err) {
		  console.log("Error file: " + downloadFile);
		  console.log(err);		
		  fWrite.write("'"+fileArray[2] + "'," + os.EOL);		  
	  }
	  console.log(index);		  
	});	
});  
  
objReadline.on('close', ()=>{  
    console.log('readline close...');  
});  