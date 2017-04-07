var fs = require('fs');

fs.mkdir('newFolder', 0777, function(err){
	if(err){
		console.err(err);
	}else{
		console.log('success to create a new folder');
	}
});