var xlsx = require("node-xlsx");

var obj = xlsx.parse(__dirname+'/test.xlsx');

//�����������飬����ÿ��sheet
var excelObj=obj[0].data;
console.log(excelObj);

var data = [];
for(var i in excelObj){
    var arr=[];
    var value=excelObj[i];
    for(var j in value){
        arr.push(value[j]);
    }
    data.push(arr);
}

console.log(data);
