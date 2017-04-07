var fs = require('fs');

fs.readdir('newFolder', function(err, files){
	if(err){
		console.err(err);
	}else{
		console.log(files);
	}
});