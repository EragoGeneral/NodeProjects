var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://10.10.3.27:27017/nodedb';

var delData = function(db, callback){
	var collection = db.collection('vehicle');
	var whereStr = {"name":"ford"};
	collection.remove(whereStr, function(err, result){
		if(err){
			console.log('Error:' + err);
			return;
		}
		callback(result);
	});
}

MongoClient.connect(DB_CONN_STR, function(err, db){
	console.log('连接成功!');	
	delData(db, function(result){
		console.log(result);
		db.close();
	});	
});