var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var mailTransport = nodemailer.createTransport({
	service: 'qq',  	
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth : {
        user : '152668252@qq.com',
        pass : 'nywnpyuynbjxbhbi'
    }
});

router.get('/send', function(req, res, next) {
    var options = {
        from           : '152668252@qq.com',
        to             : 'lhr_nicelife@163.com',
        cc             : '376939627@qq.com',    //抄送
        // bcc         : ''    //密送
        subject        : '一封来自Node Mailer的邮件',
        text           : '一封来自Node Mailer的邮件',
        html           : '<h1>你好，这是一封来自NodeMailer的邮件！</h1><p><img src="cid:00000001"/></p>',
        attachments    : 
                    [
                        {
                            filename: '4.jpg',            // 改成你的附件名
                            path: 'public/images/4.jpg',  // 改成你的附件路径
                            cid : '00000001'                 // cid可被邮件使用
                        },
                        {
                            filename: '62.jpg',            // 改成你的附件名
                            path: 'public/images/62.jpg',  // 改成你的附件路径
                            cid : '00000002'                 // cid可被邮件使用
                        },
						{  
							filename : 'package.json',  
							path: './package.json'  
						},  
						{  
							filename : 'content',  
							content : '发送内容'  
						}
                    ]
    };

    mailTransport.sendMail(options, function(err, msg){
        if(err){
            console.log(err);
            res.render('index', { title: err });
        }
        else {
            console.log(msg);
            res.render('index', { title: "已接收："+msg.accepted});
        }
    });
});


var mailTransport1 = nodemailer.createTransport({
	host : 'smtp.mxhichina.com',
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth : {
        user : 'cloud_services@ubtrobot.com',
        pass : 'Ubt12345'
    },
});

router.get('/send_new', function(req, res, next) {
    var options = {
        from           : 'cloud_services@ubtrobot.com',
        to             : '152668252@qq.com',
        //cc             : '376939627@qq.com',    //抄送
        // bcc         : ''    //密送
        subject        : '测试随机验证码',
        text           : '测试随机验证码',
        html           : '<h1>你好，这是一封测试随机验证码的邮件！</h1><p><img src="cid:00000001"/></p>',
        attachments    : 
                    [
                        {
                            filename: '4.jpg',            // 改成你的附件名
                            path: 'public/images/4.jpg',  // 改成你的附件路径
                            cid : '00000001'                 // cid可被邮件使用
                        },
                        {
                            filename: '62.jpg',            // 改成你的附件名
                            path: 'public/images/62.jpg',  // 改成你的附件路径
                            cid : '00000002'                 // cid可被邮件使用
                        },
						{  
							filename : 'package.json',  
							path: './package.json'  
						},  
						{  
							filename : 'content',  
							content : '发送内容'  
						}
                    ]
    };

    mailTransport1.sendMail(options, function(err, msg){
        if(err){
            console.log(err);
            res.render('index', { title: err });
        }
        else {
            console.log(msg);
            res.render('index', { title: "已接收："+msg.accepted});
        }
    });
});



