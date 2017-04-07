var fs = require('fs');

fs.open('content.txt', 'r', function(err, fd){
	if(err){
		console.log(err);
		return;
	}
	
	var buf = new Buffer(100);
	fs.read(fd, buf, 0, 100, null, function(err, byteRead, buffer){
		if(err){
			console.err(err);
			return ;
		}
		
		console.log('bytrRead: ' + byteRead);
		console.log(buffer);
	});
});