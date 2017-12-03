/**
 * Created by Administrator on 2017/11/30.
 */
var XLSX = require('xlsx');

const workbook = XLSX.readFile('../data.xls');

const sheetNames = workbook.SheetNames;

//console.log(sheetNames);

var data =XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
console.log(data[0].产品图片);