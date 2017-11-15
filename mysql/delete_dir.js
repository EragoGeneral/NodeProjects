var delFolder = require('./delete.js');
var fs = require('fs');

var dir = "E://a_qiniu//syncUser//syncUser_upload//";

//var files = ['1525', '2955']

/*for(var idx = 0; idx < files.length; idx++){
	delFolder(dir+'\\'+files[idx]);
}*/

console.log(delFolder);

fs.readdir(dir, function(err, files){	
	console.log(files);
	if(err){
		console.log(err);
		return;
	}
	files.forEach(function(filename){		
		delFolder(dir+'//'+filename);
	});
	
	
});