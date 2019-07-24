var http = require('http');
var querystring = require('querystring');

var contents = querystring.stringify({
    name:'byvoid',
    email:'byvoid@byvoid.com',
    address:'Zijing'
});

var options = {
    host:'www.byvoid.com',
    path:'/application/node/post.php',
    method:'POST',
    headers:{
        'Content-Type':'application/x-www-form-urlendcoded',
        'Content-Length':contents.length
    }
}

var req = http.request(options, function(res){
    res.setEncoding('utf8');
    res.on('data',function(data){
        console.log("data:",data);   //一段html代码
    });
});

req.write(contents);
req.end;