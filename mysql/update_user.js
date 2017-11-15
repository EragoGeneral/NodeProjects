var mysql = require('mysql');
var connection = mysql.createConnection({
	host:	'127.0.0.1',
	port:	'3306',
	user:	'root',
	password:	'root',
	database:	'testdb'
});

connection.connect();

var userModSql = 'update node_user set age = ? where name = ?';
var userModParam = [41, 'Kevin'];

connection.query(userModSql, userModParam, function(err, result){
	if(err){
		console.log('[UPDATE ERROR] - ',err.message);
		return ;
	}
	
	console.log('----------UPDATE-------------');
	console.log('UPDATE affectedRows',result.affectedRows);
	console.log('******************************');
});

connection.end();