var xlsx = require('node-xlsx');
var fs = require('fs');


var data = [];
var data1 = [];
for(var j=1; j<=10; j++){
	var rows = [];
	var rows1 = [];
	for(var i=1; i<=10; i++){	    
		rows.push("col"+i+"row"+j);
		rows1.push("c"+i+"r"+j);
	}
	data.push(rows);
	data1.push(rows1);
}

var buffer = xlsx.build([
    {
        name:'create new sheet',
        data:data
    },
	{
		name:'second sheet',
		data:data1
	}		
]);

//���ļ����ݲ����µ��ļ���
fs.writeFileSync('test1.xlsx',buffer,{'flag':'w'});