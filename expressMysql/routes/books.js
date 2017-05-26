var express = require('express');
var router = express.Router();
var bookDao = require('../dao/bookDao');

router.get('/addBook', function(req, res, next){
	bookDao.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
	bookDao.queryAll(req, res, next);
});
 
router.get('/query', function(req, res, next) {
	bookDao.queryById(req, res, next);
});
 
router.get('/deleteBook', function(req, res, next) {
	bookDao.delete(req, res, next);
});
 
router.get('/updatePage', function(req, res, next) {
	res.render('updateBook');
});
 
router.post('/updateBook', function(req, res, next) {
	bookDao.update(req, res, next);
});

module.exports = router;