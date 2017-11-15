var xlsx = require("node-xlsx");

var obj = xlsx.parse(__dirname+'/test.xlsx');

//读出后是数组，包含每个sheet
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
