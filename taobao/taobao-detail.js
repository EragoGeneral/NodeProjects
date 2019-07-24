'use strict'

import requestAsync from './http'
import tmallParse from './tmall-parse'

const url = 'https://lianyixh.tmall.com/i/asynSearch.htm?_ksTS=1528018686843_362&callback=jsonp363&mid=w-15688798843-0&wid=15688798843&path=/search.htm&search=y';
	//'https://detail.tmall.com/item.htm?id=527284184837&rn=14d87c42c377e926f2b2239ed5661519';
	//'https://detail.tmall.com/item.htm?id=539379698935&rn=8fefd76e0b44c725d77761c91039919f&abbucket=18&skuId=3254181917610';

(async() => {
		try{
			const html = await requestAsync(url, 'gbk')

			const products = await tmallParse(html)
			console.log(products)

		}catch(error){
			console.log(error)
		}
})();
