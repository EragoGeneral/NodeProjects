var mysql = require('mysql');
var TEST_TABLE = 'ybx_user_info';
var fs  = require('fs');


var pool  = mysql.createPool({
	host: '120.76.77.90',          
	port: '3306',                  
	user: 'ubx',
	database: 'ubxdb',  
	password: 'Ubt123654'
});

var query=function(sql,callback){  
    pool.getConnection(function(err,conn){  
        if(err){  
            callback(err,null,null);  
        }else{  
            conn.query(sql,function(qerr,vals,fields){  
                //释放连接  
                conn.release();  
                //事件驱动回调  
                callback(qerr,vals,fields);  
            });  
        }  
    });  
};  

module.exports=query;  
