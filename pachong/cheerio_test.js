var cheerio = require('cheerio'),

//$ = cheerio.load('<h2 class="title">Hello world</h2>');

//$('h2.title').text('Hello there!');
//$('h2').addClass('welcome');

//$.html();

//console.log($.html());


$ul = cheerio.load('<ul id="fruits"><li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>');

console.log($ul.html());

var appleText = $ul('.apple', '#fruits').text();
console.log(appleText);

var pearCls = $ul('ul .pear').attr('class');
console.log(pearCls);

var orangeHtml = $ul('li[class=orange]').html();
console.log(orangeHtml);

var ulHtml = $ul('ul').attr('id');
console.log(ulHtml);

$ul('.apple').attr('id', 'favorite').html();
console.log($ul.html());

var array = $ul('#fruits').find('li');
console.log(array[0]);

