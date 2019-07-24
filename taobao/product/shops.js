var https = require('https');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var fs = require('fs');


var arguments = process.argv.splice(2);
//console.log('所传递的参数是：', arguments);
var pages = arguments[0];
var location = arguments[1];
var reqUrl = arguments[2];

//location = eval(location);
//console.log("location===================" + location);
location = decodeURIComponent(location);
console.log(location);
reqUrl = decodeURIComponent(reqUrl);
console.log(reqUrl);

var pos = location.indexOf('//');
var hostname = location.substring(pos+2);
pos = hostname.indexOf('/');
hostname = hostname.substring(0, pos);
console.log(hostname);
//console.log(location);

var filename = hostname.substring(hostname.indexOf("//"), hostname.indexOf("."));
console.log(filename);

var option={
    hostname:hostname,
    path:reqUrl,
    headers:{
      'Accept':'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01',
      'Accept-Encoding':'utf-8',  //这里设置返回的编码方式 设置其他的会是乱码
      'Accept-Language':'zh-CN,zh;q=0.8',
      'Connection':'keep-alive',
      //'Cookie':'BAIDUID=A78C39414751FF9349AAFB0FDA505058:FG=1; true; __bsi=12248088537049104479_00_7_N_R_33_0303_cca8_Y',
      'Host':hostname,
      'Referer':location,
      'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
	  'Cookie':'l=AktLmXvYX/ihnrNc9FzOCOOkW/Q14F9i; cna=HMHfELqFlzsCAbcnn7zaLtvu; _uab_collina=152843410847119853892994; cq=ccp%3D1; hng=CN%7Czh-CN%7CCNY%7C156; uc3=nk2=BuGAyOUPcoWe0buA&id2=UojTUl762VPURA%3D%3D&vt3=F8dBzrwNEIeB54Sele4%3D&lg2=U%2BGCWk%2F75gdr5Q%3D%3D; t=a3ecfbf769fd8f35f9a27f0634680e84; tracknick=eragogeneral; lid=eragogeneral; lgc=eragogeneral; _tb_token_=e833be311e0eb; cookie2=15ab2b38afe0b436d5c7aa30147d013f; _umdata=2FB0BDB3C12E491DE460751064E20D39AEB1A4F7C13AB84A7F3DDF7E5734DE68D0C66EAEE4D67DBDCD43AD3E795C914CCD1C7C106166CEA0906BA877C69FBB5F; otherx=e%3D1%26p%3D*%26s%3D0%26c%3D0%26f%3D0%26g%3D0%26t%3D0; pnm_cku822=; isg=BEJCOPmKrQDx_bA1pbyPqT7uk0iuGVBsIYXdkIxbbrVg3-JZdKOWPcgZi92jj77F'
    }
  };

for(var index = 1; index <= pages; index++){
    (function(index){
        option.path = reqUrl + '&pageNo=' + index;
        https.get(option,function(res){
            var chunks = [];
            res.on('data',function(chunk){
                chunks.push(chunk);
            })
            res.on('end',function(){
                var _titleArray = [];
                var _linkArray = [];
                // var html = Buffer.concat(chunks).toString();
                var html1 = iconv.decode(Buffer.concat(chunks),'GBK');
                var content = html1.toString();
                var aa = content.replace(/\\/g,'');
                $ = cheerio.load(aa);
                var items = $('.detail .item-name');

                for(var i=0; i< items.length; i++){
                    _titleArray.push(items[i].children[0].data.trim());
                    _linkArray.push(items[i].attribs.href.substring(2));
                }

                //console.log(_titleArray);
                for(var j = 0; j < _linkArray.length; j++){
                    var link = _linkArray[j];
                    (function(link){
                        fs.open(filename+".txt","a",function(err,fd){
                            var buf = new Buffer(link+ "\n");
                            fs.writeSync(fd, buf,0,buf.length,0);
                        });
                    })(link);
                }

            })
        })
    })(index);
}

/*
https.get(option,function(res){
    var chunks = [];
  res.on('data',function(chunk){
    chunks.push(chunk);
  })
  res.on('end',function(){
	var _titleArray = [];  
	var _linkArray = [];  
    // var html = Buffer.concat(chunks).toString();
	var html1 = iconv.decode(Buffer.concat(chunks),'GBK');	
	var content = html1.toString();
	var aa = content.replace(/\\/g,'');
	$ = cheerio.load(aa);	
	var items = $('.detail .item-name');	
	
	for(var i=0; i< items.length; i++){
		_titleArray.push(items[i].children[0].data.trim());
		_linkArray.push(items[i].attribs.href.substring(2));
	}
		
	//console.log(_titleArray);
    for(var j = 0; j < _linkArray.length; j++){
        var link = _linkArray[j];
        (function(link){
            fs.open("link.txt","a",function(err,fd){
                var buf = new Buffer(link+ "\n");
                fs.writeSync(fd, buf,0,buf.length,0);
            });
        })(link);
    }

  })
})
*/
