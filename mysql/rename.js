var query=require("./query.js");  
var copy=require("./copy.js");  
var fs = require("fs");
  
var dirNames = ['376939627@qq.com', '8618503057817', 'QQ_E8D81F40D99A2D475B3691AC5DC7A57E'];  


var baseDir = 'E://a_qiniu//test//syncUser//';

fs.readdir(baseDir, function(err, files){
	if(err){
		console.log(err);
		return;
	}
	var count = files.length;
	 
	files.forEach(function(filename){
		var user_name = filename; 
		console.log(user_name);
		query("select * from ybx_user_info where user_name = '"+ user_name +"' order by user_id limit 0,1",function(err,vals,fields){  		 
		   for(var i = 0; i <vals.length; i++){
				console.log("%d\t%s\t%s", vals[i].user_id, vals[i].user_name, vals[i].user_email);
				copy(baseDir + user_name, 'G://upload//'+vals[i].user_id);
		   }
		   
		});
	});
	
	
});