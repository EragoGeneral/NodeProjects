var mysql = require('mysql');
var TEST_TABLE = 'ybx_user_info';
var fs  = require('fs');


var pool  = mysql.createPool({
	host: '10.10.1.12',          
	port: '3306',                  
	user: 'root',
	database: 'ubxdb',  
	password: 'ubt83474428!@'
});

var query=function(sql,callback){  
    pool.getConnection(function(err,conn){  
        if(err){  
            callback(err,null,null);  
        }else{  
            conn.query(sql,function(qerr,vals,fields){  
                //�ͷ�����  
                conn.release();  
                //�¼������ص�  
                callback(qerr,vals,fields);  
            });  
        }  
    });  
};  

module.exports=query;  
