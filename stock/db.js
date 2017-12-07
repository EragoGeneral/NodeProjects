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
        //connection.releaseConnection();
    },

    initStockInfo : function initStockInfo(values,callback){
        //connection.query("insert into stock(code, name, concept, total_guben, flow_guben, syl, is_deleted) values (?, ?, ?, ?, ?, ?, 0)", values, function (err, rows, fields) {
        connection.query("insert into stock(code, name, price, syl, create_time, update_time, is_deleted) values (?, ?, ?, ?, ?, ?, 0)", values, function (err, rows, fields) {
            console.log("INSERT SUCCESS");

            callback(err);
        });
    },

    queryStockByPage : function queryStockByPage(pageIndex, pageSize, callback){
        connection.query('select * from stock where POSITION(\'9\' IN CODE) <> 1 and total_guben is null order by id limit '+ pageIndex + ',' + pageSize, function (err, rows, fields) {
            callback(err, rows, fields);
        });
    },

    updateStockDetailInfo : function updateStockDetailInfo(sql, params, callback){
        connection.query(sql, params, function (err, rows, fields) {
            callback(err, rows, fields);
            console.log("UPDATE SUCCESS");
        });
    },

    updateStockBaseInfo : function updateStockBaseInfo(sql, params, callback){
        connection.query(sql, params, function (err, rows, fields) {
            callback(err, rows, fields);
            console.log("UPDATE SUCCESS");
        });
    },

    deleteStockMoneyFlow : function deleteStockMoneyFlow(params, callback) {
        var sql = 'delete from money_flow where stock_code = ? and date = ?';
        connection.query(sql, params, function (err, rows, fields) {
            callback(err, rows, fields);
        });
    },

    queryNoMoneyFlow : function queryNoMoneyFlow(sql, params, callback){

        connection.query(sql, params, function(err, rows, fields){
            callback(err, rows, fields);
        });
    }
};