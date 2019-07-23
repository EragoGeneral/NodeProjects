var query=require("./query.js");  
var copy=require("./copy.js");  
var fs = require("fs");

var arguments = process.argv.splice(2);
var dirName = arguments[0];


var content = [];
query("select * FROM mybatis.xhs_product_new where description like '%"+ dirName +"%'",function(err,vals,fields){
	console.log(vals);
	for(var i = 0; i < vals.length; i++){
		var product_name = vals[i].id;
		var title = vals[i].title;
		var description =  vals[i].description;
		console.log(product_name);
		console.log(title);
		console.log(description);					
		
		//copy('E:\\XHS\\Part1\\'+product_name, 'G:\\Lin\\product\\'+dirName+'\\'+product_name);	
		//copy('E:\\XHS\\Part2\\'+product_name, 'G:\\Lin\\product\\'+dirName+'\\'+product_name);	
		//copy('E:\\XHS\\Part3\\'+product_name, 'G:\\Lin\\product\\'+dirName+'\\'+product_name);	
		copy('E:\\XHS\\'+product_name, 'G:\\Lin\\product\\'+dirName+'\\'+product_name);	
	}	
	
});




