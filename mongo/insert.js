var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://10.10.3.27:27017/nodedb';

var insertData = function(db, callback){
	var collection = db.collection('vehicle');
	var data = [{"year":"2017", "name":"buick", "country":"US"}, {"year":"2016", "name":"BYD", "country":"CN"}, {"year":"2015", "name":"TOYOTA", "country":"JP"}];
	collection.insert(data, function(error, result){
		if(error){
			console.log('Error: ' + err);
			return;
		}
		callback(result);
	});
}

MongoClient.connect(DB_CONN_STR, function(err, db){
	console.log('连接成功!');	
	insertData(db, function(result){
		console.log(result);
		db.close();
	});	
});

