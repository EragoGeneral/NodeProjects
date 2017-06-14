// conf/db.js
// MySQL数据库联接配置
module.exports = {
    mysql: {
        host: '139.199.191.210', 
        user: 'root',
        password: 'root',
        database:'mybatis', // 前面建的user表位于些数据库中
        port: 3306
    }
};