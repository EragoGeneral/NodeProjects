var fs = require('fs');

fs.rename('newFolder/text1.txt', 'newFolder/text2.txt', function(err){
	if(err){
		console.error(err);
	}else{
		console.log('success to rename the file');
	}	
});