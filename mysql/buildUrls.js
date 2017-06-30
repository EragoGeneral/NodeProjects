var query=require("./query.js");  
var copy=require("./copy.js");  
var fs = require("fs");

var arguments = process.argv.splice(2);
var start = arguments[0];


var content = [];
query("SELECT * FROM jimudb.jimu_sync_files WHERE is_deleted = '0' AND qn_file_url IS NOT NULL limit "+ start +", 500",function(err,vals,fields){
	for(var i = 0; i < vals.length; i++){
		var qn_file_url = vals[i].qn_file_url;
		var file_url = vals[i].file_url;
		//console.log(qn_file_url);
		content.push(qn_file_url + "@@" + file_url);				
	}	
	fs.open("urls//"+ start +".txt","a",function(err,fd){
		console.log(content);
		for(var idx = 0; idx < content.length; idx++){
			var buf = new Buffer(content[idx] + "\n");
			fs.writeSync(fd,buf,0,buf.length,0);
		}		
	});
});

