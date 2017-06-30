var download = require('download-to-file');
var query=require("../../mysql/query.js");  
var fs = require("fs");

var arguments = process.argv.splice(2);
var start = arguments[0];
var size = arguments[1];

var baseDir = 'E://a_qiniu//syncUser//readyToUpload//';
var preUrl = 'http://jimu.ubtrobot.com/syncUser/';


var downloadFile = 'http://jimu.ubtrobot.com/syncUser/沈先生/default/Meebot/actions/actions_636342562981962290.xml';
var relaPath = downloadFile.substring(preUrl.length); 
download(downloadFile, baseDir + relaPath, function (err) {
  if (err) throw err
  console.log('Download finished');
});
