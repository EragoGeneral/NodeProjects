var express = require('express');
var router = express.Router();
var book= require('../models/Book');
/* GET users listing. */
router.get('/', function(req, res, next) {
    book.queryAll(req, res, next);
});
router.get('/queryById', function(req, res, next) {
    book.queryById(req, res, next);
});

module.exports = router;