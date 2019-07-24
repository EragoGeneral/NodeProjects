/**
 * Created by Administrator on 2017/11/29.
 */
var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("./db.js");
var tryTool = require("../tools/tryTools");
var tools = require('../tools/tools');

router.get('/', function(req, res, next) {
    var catId = 1;

    tryTool.alitry(catId, 1, 10, 'total', function (rows) {
       // console.log(rows);
        var totalNum = rows.paging.n;
        console.log("totalNum: " + totalNum);
        var pageSize = 5;
        var pageNum = parseInt(totalNum/pageSize) == 0 ? parseInt(totalNum/pageSize) : Math.ceil(totalNum/pageSize);

        for(var curPage = 1; curPage <= pageNum; curPage++){
            tryTool.alitry(catId, curPage, pageSize, 'per', function (rows1) {
               // var dd = rows1.items;
                //console.log('again: ' + rows1.paging.n);
                //var dd = eval("'" + rows1 + "'");
                //console.log(dd);
                //var items = JSON.parse(dd);
                console.log(rows1);

                if(rows1.length > 0){
                    for(var idx = 0; idx < rows1.length; idx++){
                        var item = rows1[idx];
                        var isApplied = item.isApplied ? '1' : '0';
                        var startTime = tools.formatDate(item.startTime);
                        var endTime = tools.formatDate(item.endTime);

                        db.query("insert into operation_product_sales" +
                            "(shop_user_id, shop_name, title, " +
                            "status, total_num, request_num, accept_num, " +
                            "report_num, is_applied, show_id, start_time, " +
                            "end_time, item_id, type, pic, " +
                            "shop_item_id, price, created_time, updated_time, is_deleted) " +
                            "values('" + item.shopUserId + "','"+item.shopName+"', '" + item.title + "', "
                            + item.status +", " + item.totalNum + ", "+ item.requestNum +", "+ item.acceptNum +", "
                            + item.reportNum +", "+ isApplied +", '"+ item.showId +"', '"+ startTime +"', " +
                            "'" + endTime + "', '" + item.id +"', "+ item.type +", '"+ item.pic +"'," +
                            "'" + item.shopItemId +"', "+ item.price +", SYSDATE(), SYSDATE(), 0)", function (err, rows) {
                            if (err) {
                                console.log(err);
                                res.end('新增失败：' + err);
                            }
                        })
                    }
                }
            });
        }
        // if (err) {
        //     res.render('users', {title: 'Express', datas: []});  // this renders "views/users.html"
        // } else {
        //     res.render('users', {title: 'Express', datas: rows});
        // }
    });
    res.render('data', { title: 'Express' });
});

module.exports = router;