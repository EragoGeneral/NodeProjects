var fs = require('fs');
var files = ['a.txt', 'b.txt', 'c.txt'];

for(var i = 0; i < files.length; i++){
	
	//无法输出文件名
	/*fs.readFile(files[i], 'utf-8', function(err, contents){
		console.log(files[i] + ': ' + contents);
	});*/
	
	(function(i){
		fs.readFile(files[i], 'utf-8', function(err, contents){
			console.log(files[i] + ': ' + contents);
		});
	})(i);	
}