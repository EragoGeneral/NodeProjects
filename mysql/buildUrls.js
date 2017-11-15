var query=require("./query.js");  
var copy=require("./copy.js");  
var fs = require("fs");

var arguments = process.argv.splice(2);
var start = arguments[0];


var content = [];
query("select * FROM jimudb.jimu_sync_files WHERE is_deleted = '0' AND user_id IS NOT NULL AND id >= "+start+" AND account_name <> '' AND account_name NOT IN ('zz','你','zx','大牛','阿尔法机器人','ir','lemon','老董','radioshack','偶','刘','LBJ','仔仔','小白','seven') ",function(err,vals,fields){
	console.log(vals);
	for(var i = 0; i < vals.length; i++){
		var qn_file_url = vals[i].qn_file_url;
		var file_url = vals[i].file_url;
		var id =  vals[i].id;
		//console.log(qn_file_url);
		content.push(id+ "@@" +qn_file_url + "@@" + file_url);				
	}	
	fs.open("urls//"+ start +".txt","a",function(err,fd){
		console.log(content);
		for(var idx = 0; idx < content.length; idx++){
			var buf = new Buffer(content[idx] + "\n");
			fs.writeSync(fd,buf,0,buf.length,0);
		}		
	});
});




