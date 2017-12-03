var cheerio = require('cheerio');

//$ = cheerio.load('<h2 class="title">Hello world</h2>');

//$('h2.title').text('Hello there!');
//$('h2').addClass('welcome');

//$.html();

//console.log($.html());


// $ul = cheerio.load('<ul id="fruits"><li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>');
//
// console.log($ul.html());
//
// var appleText = $ul('.apple', '#fruits').text();
// console.log(appleText);
//
// var pearCls = $ul('ul .pear').attr('class');
// console.log(pearCls);
//
// var orangeHtml = $ul('li[class=orange]').html();
// console.log(orangeHtml);
//
// var ulHtml = $ul('ul').attr('id');
// console.log(ulHtml);
//
// $ul('.apple').attr('id', 'favorite').html();
// console.log($ul.html());
//
// var array = $ul('#fruits').find('li');
// console.log(array[0]);

var $row = cheerio.load('<td>181</td><td><a href="http://stockpage.10jqka.com.cn/600360/" target="_blank">600360</a></td><td><a href="http://stockpage.10jqka.com.cn/600360/" target="_blank">华微电子</a></td><td class="c-rise">8.30</td><td class="c-rise">3.62</td><td class="c-rise">0.29</td><td class="">--</td><td>8.80</td><td class="c-rise">3.13</td><td class="c-rise">7.24</td><td>5.37亿</td><td>7.38亿</td><td>61.28亿</td><td>82.62</td><td><a class="j_addStock" title="加自选" href="javascript:void(0)"><img src="http://i.thsi.cn/images/q/plus_logo.png" alt=""></a></td>');
console.log($row('a').text());