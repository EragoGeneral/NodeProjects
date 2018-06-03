'use strict'

import Promise from 'bluebird'
import cheerio from 'cheerio'

export default function tmallParse(html){
    return new Promise((resolve, reject) => {
        try{
            //产品列表
            //var products = []
			//文章列表
			var articles = []
            var $ = cheerio.load(html, {decodeEntities: false})
            $('.question').each(function(){
				var _title = $(this).find('.question-title').text().trim()
				var _blockquote = $(this).find('blockquote').text().trim()
				var _subtitle = $(this).find('.content a').text().trim()
				var _link = $(this).find('.content a').attr('href')

				var article = {
					title: _title,
					subtitle: _subtitle,
					blockquote: _blockquote,
					link: _link
				}
				articles.push(article)
            })
            resolve(articles)
        }catch(error){
            reject(error)
        }
    })
}