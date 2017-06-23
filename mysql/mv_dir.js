var mv = require('mv');
var fs = require( 'fs' ), stat = fs.stat;


// ¸´ÖÆÄ¿Â¼
fs.readdir('G://upload//', function(err, files){
	var cnt = 0;
	
	if(err){
		console.log(err);
		return;
	}
	
	files.forEach(function(filename){
		if(cnt < 5){
			//copy( 'G://upload//'+filename, 'E:\\a_qiniu\\test\\syncUser_upload\\'+filename);	
			mv('G://upload//'+filename, 'E:\\a_qiniu\\test\\syncUser_upload\\'+filename, function(err) {				
				if(err){
					console.log(err);
					return;
				}
			});
			cnt++;
		}
	});		
});
