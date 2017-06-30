var fs = require("fs");


var baseDir = 'G://upload//product//';

fs.readdir(baseDir, function(err, files){
	if(err){
		console.log(err);
		return;
	}
	var count = files.length;
	 
	files.forEach(function(filename){		
		fs.open("new.txt","a",function(err,fd){
			var buf = new Buffer(filename+ ",");
			fs.writeSync(fd,buf,0,buf.length,0);
		});
	});	
	
});