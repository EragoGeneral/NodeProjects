/**
 * Created by Administrator on 2017/11/29.
 */
var http = require('http');
var querystring = require('querystring');

function alitry(catId, curPage, pageSize, type, callback) {
    var contents = querystring.stringify({
        cateId: catId,
        status: 1
    });

    var options = {
        host: 'try.taobao.com',
        //port: '8081',
        path: '/api3/call?what=show&page='+curPage+'&pageSize='+pageSize+'&api=x/search',
        method: 'POST',
        headers: {
            'content-type':'application/x-www-form-urlencoded; charset=UTF-8',
            'x-csrf-token':'p1RbrSzkExnK2Dtz1sYY',
            'referer':'https://try.taobao.com/',
            'cookie': '_tb_token_=p1RbrSzkExnK2Dtz1sYY'
        }
    };

    var req = http.request(options, function(res){
        res.setEncoding('utf8');
        res.on('data', function(data){
            //console.log(data);
            var dd = eval("'" + data + "'");
            console.log('type: ' + type + ' - curPage: ' + curPage);
            //console.log(dd);
            var obj = JSON.parse(dd);
            //console.log(obj);
            var result = obj.result;
            //console.log(items.length);
            //console.log(item);
            //console.log(jq);

            /*db.query("insert into userinfo(name,age) values('" + items[0].title + "'," + items[0].price + ")", function (err, rows) {
                if (err) {
                    res.end('新增失败：' + err);
                }
            })*/
            if(type === 'per'){
                //console.log(obj.result.items);
                callback(result.items);
            }else{
                callback(result);
            }

        });
    });

    req.write(contents);
    req.end();
}

exports.alitry = alitry;