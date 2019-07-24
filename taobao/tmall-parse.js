'use strict'

import Promise from 'bluebird'
import cheerio from 'cheerio'

export default function tmallParse(html){
    return new Promise((resolve, reject) => {
        try{
            //产品列表
            //var products = []
			//文章列表
			var products = []
            var $ = cheerio.load(html, {decodeEntities: false})

			var _title = $('.tb-detail-hd h1').text().trim()
			var _image = $('#J_UlThumb img')[0].attribs.src;
			_image = _image.replace('//img.alicdn.com/imgextra/', '').replace('_60x60q90.jpg', '_430x430q90.jpg')

			var product = {
            	title: _title,
				image: _image
			}

			products.push(product)
            resolve(products)
        }catch(error){
            reject(error)
        }
    })
}