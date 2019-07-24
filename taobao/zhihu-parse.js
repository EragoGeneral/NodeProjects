'use strict'

import Promise from 'bluebird'
import cheerio from 'cheerio'

export default function zhihuParse(html){
    return new Promise((resolve, reject) => {
        try{
            //产品列表
            //var products = []
			//文章列表
			var articles = []
            var $ = cheerio.load(html, {decodeEntities: false})
            $('.wrap').each(function(){
				var _title = $(this).find('.title').text().trim()
				var _cover = $(this).find('img').attr('src')

				var article = {
					title: _title,
					cover: _cover
				}
				articles.push(article)
            })
            resolve(articles)
        }catch(error){
            reject(error)
        }
    })
}