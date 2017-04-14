var mongoose = require('mongoose');
DB_URL = 'mongodb://10.10.3.27:27017/nodedb';

mongoose.connect(DB_URL);

mongoose.connection.on('connected', function(){
	console.log('Mongoose connection open to ' + DB_URL);
});

mongoose.connection.on('error', function(err){
	console.log('Mongoose connection error: ' + err);
});
	
mongoose.connection.on('disconnected', function(){
	console.log('Mongoose connection disconnected');
});	
		
module.exports = mongoose;	