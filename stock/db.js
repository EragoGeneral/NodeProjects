/**
 * Created by Administrator on 2017/12/1.
 */
var mysql = require('mysql');
// 数据库信息
var connection = mysql.createConnection({
    host  : '192.168.72.1',
    user  : 'root',
    password : 'root',
    database : 'db_stock'
});


module.exports = {
    batchInsert: function batchInsert(sql, values, callback) {
        /*var values = [
            ["index","www.alibaba.com",1,0],
            ["index1","www.google.com",1,0]
        ];
        var sql = "INSERT INTO url(`from`,`to`,`status`, `is_new`) VALUES ?";*/
        connection.query(sql, [values], function (err, rows, fields) {
            if(err){
                console.log('INSERT ERROR - ', err.message);
                return;
            }
            console.log("INSERT SUCCESS");

            callback(err);
        });
    },

    queryStockInfo : function queryStockInfo(code, callback){
        connection.query('select * from stock where code = ?', code, function (err, rows, fields) {
            callback(err, rows);
        });
    },

    initStockInfo : function initStockInfo(values,callback){
        //connection.query("insert into stock(code, name, concept, total_guben, flow_guben, syl, is_deleted) values (?, ?, ?, ?, ?, ?, 0)", values, function (err, rows, fields) {
        connection.query("insert into stock(code, name, syl, is_deleted) values (?, ?, ?, 0)", values, function (err, rows, fields) {
            console.log("INSERT SUCCESS");

            callback(err);
        });
    }
};