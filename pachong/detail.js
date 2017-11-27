var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var i = 0;

//var url = "http://www.ss.pku.edu.cn/index.php/newscenter/news/2391"; 
var url = "http://stockpage.10jqka.com.cn/300088/"; 
//��ʼurl 

function fetchPage(x) {     //��װ��һ�㺯��
    startRequest(x); 
}


function startRequest(x) {
     //����httpģ�������������һ��get����      
    http.get(x, function (res) {     
        var html = '';        //�����洢������ҳ������html����
        var titles = [];        
        res.setEncoding('utf-8'); //��ֹ��������
     //����data�¼���ÿ��ȡһ������
        res.on('data', function (chunk) {   
            html += chunk;
        });
     //����end�¼������������ҳ���ݵ�html����ȡ��ϣ���ִ�лص�����
        res.on('end', function () {

         var $ = cheerio.load(html); //����cheerioģ�����html

         //console.log(html);
		 //console.log($);
		
		var data = [];
		var titleArray = [];
		var valueArray = [];
		 var detail_title = $('.company_details dt');	
		 var detail_value = $('.company_details dd');	
		 //console.log(detail.text());
		 detail_title.each(function(idx,element){
			 //console.log(idx);
			 var $element = $(element);
			 //console.log($element.text());
			 var header = $element.text();
			//console.log(i); 
			//console.log(j);
			titleArray.push(header);
		 });
		 detail_value.each(function(idx,element){
			 //console.log(data[idx]);
			 var $element = $(element);
			 var val = $(element).attr('title');
			 if(val == undefined){
				val = $element.text();			 	
			 }			 
			 
			 //d.value = $element.text();
			valueArray.push(val);
		 });
		 
		for(var idx=0; idx<titleArray.length; idx++){
			var d = {
				'title':titleArray[idx],
				'value':valueArray[idx]				
			}; 
			data.push(d); 
		}
		 
		 console.log(data);
         
        });

    }).on('error', function (err) {
        console.log(err);
    });

}
       //�ú��������ã��ڱ��ش洢����ȡ������������Դ
function savedContent($, news_title) {
    $('.article-content p').each(function (index, item) {
        var x = $(this).text();       

       var y = x.substring(0, 2).trim();

        if (y == '') {
        x = x + '\n';   
//�������ı�����һ��һ����ӵ�/data�ļ����£��������ŵı����������ļ�
        fs.appendFile('./data/' + news_title + '.txt', x, 'utf-8', function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
    })
}
//�ú��������ã��ڱ��ش洢����ȡ����ͼƬ��Դ
function savedImg($,news_title) {
    $('.article-content img').each(function (index, item) {
        var img_title = $(this).parent().next().text().trim();  //��ȡͼƬ�ı���
        if(img_title.length>35||img_title==""){
         img_title="Null";}
        var img_filename = img_title + '.jpg';

        var img_src = 'http://www.ss.pku.edu.cn' + $(this).attr('src'); //��ȡͼƬ��url

//����requestģ�飬�����������һ�����󣬻�ȡͼƬ��Դ
        request.head(img_src,function(err,res,body){
            if(err){
                console.log(err);
            }
        });
        request(img_src).pipe(fs.createWriteStream('./image/'+news_title + '---' + img_filename));     //ͨ�����ķ�ʽ����ͼƬд������/imageĿ¼�£��������ŵı����ͼƬ�ı�����ΪͼƬ�����ơ�
    })
}
fetchPage(url);      //������ʼ����