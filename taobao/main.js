'use strict'

import requestAsync from './http'
import tmallParse from './tmall-parse'
import zhihuParse from './zhihu-parse'

// const url = 'http://news.at.zhihu.com/story/9685215';
const url = 'http://news.at.zhihu.com/';

(async() => {
        try{
            const html = await requestAsync(url, 'utf-8')
            const products = await zhihuParse(html)
            console.log(products)
        }catch(error){
            console.log(error)
        }
})();