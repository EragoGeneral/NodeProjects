var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./shopSqlMapping');

var http = require('http');

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
		console.log(req.params.keyword);
		console.log(req.params.start);
		
		pool.getConnection(function(err, connection){
			var param = req.query || req.params;
			var kw = req.params.keyword;
			var start = req.params.start;			
			kw = kw.replace('@@', '/'); 
			console.log(kw);
			var keyword = encodeURIComponent(kw);
			http.get('http://www.xiaohongshu.com/api/store/ps/items?keyword='+keyword+'&mode=word_search&page='+ start +'&per_page=500&sort=price&direction=&source=classifications&android_app_ssl=1&platform=Android&deviceId=b3b6dd93-a51c-3ace-a79c-fbdff5a4f70c&versionName=4.21&channel=Store360&sid=session.1181513049171586078&lang=zh-CN&t=1497022624&sign=b4c71eaf69f34bf87a06cd5d058475e9', function (res) {
				var json = '';
				res.on('data', function (d) {
					json += d;
				});
				res.on('end',function(){
				    json = JSON.parse(json);					
					var items = json.data.items;
					items.forEach(function(item){
						var id = item.id;
						var data = {};
						connection.query($sql.queryById, id, function(err, rows, fields) {																	
							//console.log(rows);								
							//console.log(fields);
							console.log(rows.length);
							
							if(rows.length === 0){
								//console.log($util.decode(item.title));
								var price = item.price == "" ? 0.00 : item.price;
								connection.query($sql.insert, [item.buyable, item.category_id, kw, $util.decode(item.desc), item.discount_price, $util.decode(item.feature), 
									item.height, item.id, item.image, item.ipq, item.link, item.new_arriving, price, $util.decode(item.promotion_text), item.seller_id , 
									item.skucode, $util.decode(item.stock_shortage), item.stock_status , $util.decode(item.title), item.vendor_icon, item.whcode , item.width], 
									function(err, result){	
										
										console.log(err);
										console.log(item.id);
										if(result){
											result = {
												code: 200,
												msg: '增加成功'
											};
										}												
								});
							}
						});
					});						
					connection.release();
				});
			}).on('error', function (e) {
				console.error(e);
			});			
		});
		
		res.render('index');
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




