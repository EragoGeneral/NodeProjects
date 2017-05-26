var express = require('express');
var router = express.Router();
var bookDao = require('../dao/bookDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/addUser', function(req, res, next){
	bookDao.add(req, res, next);
});

module.exports = router;
