var xlsx = require("node-xlsx");

var list = xlsx.parse("C://translation.xlsx");
var fs = require("fs"); 

//读出后是数组，包含每个sheet
for(var i=0; i < list.length; i++){
	var page = list[i];
	console.log("language type:" + page.name);
	var data = page.data;
	
	var fileName = page.name+'.js';
	fs.appendFile(fileName, 'var MSG = {\n', function (err) {
		if (err) throw err;
		console.log('The "data to append" was appended to file!');
	});
	for(var j=1; j < data.length; j++){
		
		var content = '\t'+data[j][0] +':"'+ data[j][1] + '"';
		if(j < data.length-1){
			content = content +',\n';
		}else{
			content = content +'\n';
		}
		
		fs.appendFile(fileName, content, function (err) {
			if (err) throw err;
			console.log('The "data to append" was appended to file!');
		});
	}
	
	fs.appendFile(fileName, '}', function (err) {
		if (err) throw err;
		console.log('The "data to append" was appended to file!');
	});
	
}