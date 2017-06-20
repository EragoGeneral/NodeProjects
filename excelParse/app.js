var xlsx = require("node-xlsx");

var list = xlsx.parse("E://test.xlsx");

//读出后是数组，包含每个sheet
console.log(list);
