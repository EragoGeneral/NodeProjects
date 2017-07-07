var fs = require("fs");


var baseDir = 'E://a_qiniu//syncUser//syncUser_upload//';

fs.readdir(baseDir, function(err, files){
	if(err){
		console.log(err);
		return;
	}
	var count = files.length;
	 
	files.forEach(function(filename){		
		fs.open("upload_id.txt","a",function(err,fd){
			var buf = new Buffer(filename+ ",");
			fs.writeSync(fd,buf,0,buf.length,0);
		});
	});	
	
});