var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./bookSqlMapping');

var pool = mysql.createPool($util.extend({}, $conf.mysql));

var jsonWrite = function(res, ret){
	if(typeof ret === 'undefined') {
		res.json({
			code : '1',
			msg: '操作失败'
		});
	}else{
		res.json(ret);
	}
};

module.exports = {
	add: function(req, res, next){
		pool.getConnection(function(err, connection){
			var param = req.query || req.params;
			connection.query($sql.insert, [param.name, param.author], function(err, result){
				if(result){
					result = {
						code: 200,
						msg: '增加成功'
					};
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	delete: function (req, res, next) {
		// delete by Id
		pool.getConnection(function(err, connection) {
			var id = req.query.id;
			connection.query($sql.delete, id, function(err, result) {
				if(result.affectedRows > 0) {
					result = {
						code: 200,
						msg:'删除成功'
					};
				} else {
					result = void 0;
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	update: function (req, res, next) {
		// update by id
		// 为了简单，要求同时传name和age两个参数
		var param = req.body;
		if(param.name == null || param.author == null || param.id == null) {
			jsonWrite(res, undefined);
			return;
		}
 
		pool.getConnection(function(err, connection) {
			connection.query($sql.update, [param.name, param.author, param.id], function(err, result) {
				// 使用页面进行跳转提示
				if(result.affectedRows > 0) {
					res.render('suc', {
						result: result
					}); // 第二个参数可以直接在jade中使用
				} else {
					res.render('fail',  {
						result: result
					});
				}
 
				connection.release();
			});
		});
 
	},
	queryById: function (req, res, next) {
		var id = req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryById, id, function(err, result) {
				jsonWrite(res, result);
				connection.release();
 
			});
		});
	},
	queryAll: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	}
}




