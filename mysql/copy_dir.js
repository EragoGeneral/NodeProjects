var fs = require( 'fs' ),
    stat = fs.stat;

var delFolder = require('./delete.js');	
var copy = require('./copy.js');

// ¸´ÖÆÄ¿Â¼
fs.readdir('G://upload//', function(err, files){
	var cnt = 0;
	
	if(err){
		console.log(err);
		return;
	}
	
	files.forEach(function(filename){
		if(cnt < 5){
			copy( 'G://upload//'+filename, 'E:\\a_qiniu\\test\\syncUser_upload\\'+filename);	
			cnt++;
		}
	});		
});
