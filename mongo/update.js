var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://10.10.3.27:27017/nodedb';

var updateData = function(db, callback){
	var collection = db.collection('vehicle');
	var whereStr = {"name":"BYD"};
	var updateStr = {"$set":{"year":"2016"}};
	collection.update(whereStr, updateStr, function(err, result){
		if(err){
			console.log('Error:' + err);
			return;
		}
		callback(result);
	});
}

MongoClient.connect(DB_CONN_STR, function(err, db){
	console.log('连接成功!');	
	updateData(db, function(result){
		console.log(result);
		db.close();
	});	
});