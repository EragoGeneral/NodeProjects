var express = require('express');
var router = express.Router();
var shopDao = require('../dao/shopDao');

router.get('/addProduct/:keyword/:start', function(req, res, next){
	shopDao.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
	shopDao.queryAll(req, res, next);
});
 
router.get('/query', function(req, res, next) {
	shopDao.queryById(req, res, next);
});
 
router.get('/deleteProduct', function(req, res, next) {
	shopDao.delete(req, res, next);
});
 
/* 
router.get('/updatePage', function(req, res, next) {
	res.render('updateBook');
});
 
router.post('/updateBook', function(req, res, next) {
	shopDao.update(req, res, next);
});*/

module.exports = router;