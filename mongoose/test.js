var User = require('./user.js');

function insert(){
	var user = new User({
		username : 'Jordan',
		userpwd : 'abcd',
		userage : 37,
		logindate : new Date()
	});
	
	user.save(function(err, res){
		if(err){
			console.log("Error:"+err);
		}else{
			console.log("Res:" + res);
		}
	});
}

insert();
