var fs = require('fs');
var download = require('download-to-file');


var baseDir = 'E://a_qiniu//syncUser//readyToUpload//';
var preUrl = 'http://jimu.ubtrobot.com/syncUser/';

var container = [];
function readLines(input, func) {
  var remaining = '';
  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
	  container.push(data);
      func(line);
      index = remaining.indexOf('\n');
    }

  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

var counter = 0;
function func(data) {  
  var fileArray = data.split('@@');
  var downloadFile = fileArray[1];
  var relaPath = downloadFile.substring(preUrl.length);
  
  console.log(downloadFile);
  download(downloadFile, baseDir + relaPath, function (err) {			
	  if (err) {
		  //console.log("Error file: " + downloadFile);
		  //console.log(err);		  
	  }
	  console.log(++counter);		  
	});
	
}

var input = fs.createReadStream(__dirname + '/new.txt');
readLines(input, func);



