var mysql = require('mysql');
var TEST_DATABASE = 'testdb';
var TEST_TABLE = 'node_user';

var client = mysql.createConnection({
	host: '127.0.0.1',          
	port: '3306',                  
	user: 'root',
	password: 'root'
});
client.connect();
client.query("use "+TEST_DATABASE);
client.query('select * from '+TEST_TABLE, function(err, results, fields){
	if(err){
		throw err;
	}
	
	if(results){
		for(var i = 0; i <results.length; i++){
			console.log("%d\t%s\t%s", results[i].id, results[i].name, results[i].age);
		}
	}
	client.end();
});













