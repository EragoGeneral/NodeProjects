/**
 * Created by Administrator on 2018/6/10.
 */
var charset = require('superagent-charset');
var superagent = require('superagent');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');
superagent
    .get('https://meiking.tmall.com/i/asynSearch.htm')
    .set({
        'Referer':'https://meiking.tmall.com/category.htm',
        'Accept':'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01',
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
        'Cookie':'cna=/Y6/EpB6EQECAbc+qqJQU/2t; otherx=e%3D1%26p%3D*%26s%3D0%26c%3D0%26f%3D0%26g%3D0%26t%3D0; hng=CN%7Czh-CN%7CCNY%7C156; t=c525620cda699437c552949b97c1cb8e; tracknick=yangliu3952914; lid=yangliu3952914; _tb_token_=d78138befbee; cookie2=10005bf203333aaf8ffb3f2b8fec8abd; __guid=249318043.916240942570256300.1527986290581.365; tk_trace=1; pnm_cku822=; cq=ccp%3D1; isg=BJaWNkZU0X21-eT-I0g085bd50xYn2_y9enpFAD_gnkUwzZdaMcqgfyZX10v69KJ; monitor_count=13',
        'Accept-Encoding':'gzip, deflate, sdch, br'
    })
    .query({mid:'w-14905613363-0',wid:'14905613363',spm:'a1z10.3-b-s.w16607738-14905613357.4.229113abTZYiyQ'})
    .end(function(err, res) {
        if (err) {
            //console.log(res.text);

        } else {

            //var html1 = iconv.decode(res.body,'GBK');
            var html1 = res.text;
           // var html1 = iconv.decode(html,'GBK');
            //var aaa = html.replace('\"','"');
            var $ = cheerio.load(html1, {decodeEntities: false});
            var _line = $('.item4line1');
            console.log(html1);
        }
    })

