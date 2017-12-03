var http = require('http');
var querystring = require('querystring');
var jq = require('jquery');

var contents = querystring.stringify({	
    cateId: "1",
    status: 1
});

var options = {
	host: 'try.taobao.com',
	//port: '8081',
	path: '/api3/call?what=show&page=6&pageSize&api=x/search',
	method: 'POST',
	headers: {
		'content-type':'application/x-www-form-urlencoded; charset=UTF-8',
		'x-csrf-token':'p1RbrSzkExnK2Dtz1sYY',
		'referer':'https://try.taobao.com/',
		'cookie': '_tb_token_=p1RbrSzkExnK2Dtz1sYY'
	}
};

var req = http.request(options, function(res){
	
	res.setEncoding('utf8');
	res.on('data', function(data){
		//console.log(data);
		var dd = eval("'" + data + "'"); 
		//console.log(dd);
		var obj = JSON.parse(dd);		
		//console.log(obj);
		var items = obj.result.items;
		console.log(items.length);
		//console.log(item);
		console.log(jq);
		
	});
});

req.write(contents);
req.end();
