/**
 * Created by Administrator on 2018/6/11.
 */
var request = require('request');
var iconv =  require('iconv-lite');
var cheerio = require('cheerio');
var fs = require('fs');
var url = 'https://detail.tmall.com/item.htm?id=539379698935&rn=8fefd76e0b44c725d77761c91039919f&abbucket=18&skuId=3254181917610';
var download = require('download-to-file');

var arguments = process.argv.splice(2);
console.log('所传递的参数是：', arguments);
var dirName = arguments[0];

var baseDir = 'C://taobao//images//'+ dirName +'//';

var container = [];
var input = fs.createReadStream(__dirname + '/' + dirName + '.txt');
readLines(input, func);



function readLines(input, func) {
    var remaining = '';
    input.on('data', function(data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        while (index > -1) {
            var line = remaining.substring(0, index);
            remaining = remaining.substring(index + 1);
            (function(link){
                if(link != '') {
                    var url = 'http://' + link;
                    request.get({url, encoding: null}, function (error, response, body) {
                        var data = iconv.decode(body, 'gbk');
                        var $ = cheerio.load(data, {decodeEntities: false})

                        var _title = $('.tb-detail-hd h1').text().trim()
                        var _image = $('#J_UlThumb img')[0].attribs.src;
                        console.log(_image);
                        if (_image.indexOf('http') != -1) {
                            _image = _image.replace('//img.alicdn.com/imgextra/', '').replace('_60x60q90.jpg', '_430x430q90.jpg')
                        } else {
                            _image = 'https:' + _image.replace('_60x60q90.jpg', '_430x430q90.jpg');
                        }
                        var product = {
                            url: url,
                            title: _title,
                            image: _image
                        }

                        var fileName = _image.substring(_image.lastIndexOf('/') + 1);
                        console.log(fileName);

                        download(_image, baseDir + fileName, function (err) {
                            if (err) {
                                console.log("Error file: " + downloadFile + ", file Id is: " + fileId);
                                console.log(err);
                                errorFiles.push("File Id is: " + fileId + ", file Url is: " + downloadFile + "\n");
                            }
                            console.log('Finished to download the image, the name is :' + fileName);
                        });

                        console.log(product);
                    })
                }
            })(line);
            index = remaining.indexOf('\n');
        }

    });

    input.on('end', function() {
        if (remaining.length > 0) {
        }
    });
}

function func(data) {
    container.push(data);
}