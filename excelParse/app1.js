var xlsx = require("node-xlsx");

var list = xlsx.parse("C://study//workspace//node//NodeProjects//excelParse//test.xlsx");
var fs = require("fs"); 

//读出后是数组，包含每个sheet
for(var i=0; i < list.length; i++){
	var page = list[i];
	console.log(page);
	
	
	console.log("language type:" + page.name);
	var data = page.data;
	
	/*
	var fileName = page.name+'.js';
	fs.appendFile(fileName, 'var MSG = {\n', function (err) {
		if (err) throw err;
		console.log('The "data to append" was appended to file!');
	});*/
	
	var colNum = data[0].length;
	for(var colIdx = 1; colIdx < colNum; colIdx++ ){ 
		var fileName = data[0][colIdx]+'.js';
		console.log(fileName);
		fs.appendFile(fileName, 'var MSG = {\n', function (err) {
			if (err) throw err;
			console.log('The "data to append" was appended to file!');
		});
		var content = '';
		for(var j=1; j < data.length; j++){
			content += '\t'+data[j][0] +':"'+ data[j][colIdx] + '"';			
			if(j < data.length-1){
				content += ',\n';
			}else{
				content += '\n';
			}
			//console.log(content);
		}				
		fs.appendFile(fileName, content, function (err) {
			if (err) throw err;
			console.log('The "data to append" was appended to file!');
		});
		fs.appendFile(fileName, '}', function (err) {
			if (err) throw err;
			console.log('The "data to append" was appended to file!');
		});
	}
	
}