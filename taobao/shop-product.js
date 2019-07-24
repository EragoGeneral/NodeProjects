'use strict'

import requestAsync from './http-buffer'
import tmallParse from './tmall-parse'
import fs from 'fs'

const url = 'https://detail.tmall.com/item.htm?id=539379698935&rn=8fefd76e0b44c725d77761c91039919f&abbucket=18&skuId=3254181917610';
	//'https://meiking.tmall.com/i/asynSearch.htm?_ksTS=1528018731104_138&callback=jsonp139&mid=w-14905613363-0&wid=14905613363&path=/category.htm';
    //'https://lianyixh.tmall.com/i/asynSearch.htm?_ksTS=1528018686843_362&mid=w-15688798843-0&wid=15688798843&path=/search.htm&search=y';
	//'https://detail.tmall.com/item.htm?id=527284184837&rn=14d87c42c377e926f2b2239ed5661519';


(async() => {
		try{
			var link = ['detail.tmall.com/item.htm?id=524116621469&rn=4fd027f95d4eb5355d04d35bc3110460&abbucket=7',
				'detail.tmall.com/item.htm?id=545406108405&rn=4fd027f95d4eb5355d04d35bc3110460&abbucket=7']

			for(var i = 0; i < link.length; i++)
			{
				var l = 'http://'+link[i];
				const html = await requestAsync(l, 'gbk')

				const products = await tmallParse(html)
				console.log(products)

			}

		}catch(error){
			console.log(error)
		}
})();
