/**
 * Created by Administrator on 2017/11/28.
 */
// 连接MySQL
var mysql = require('mysql');
var pool = mysql.createPool({
    host: '192.168.20.1',
    user: 'root',
    password: 'root',
    database: 'tb_shop'
});

function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();//释放链接
        });
    });
}
exports.query = query;