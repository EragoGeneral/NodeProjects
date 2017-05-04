var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('cars', { title: 'Car Page', count: 10 });
});


module.exports = router;