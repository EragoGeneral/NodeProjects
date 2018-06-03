'use strict'

import request from 'request'
import Promise from 'bluebird'
import iconv from 'iconv-lite'

export default function requestAsync(url, encode){
    return new Promise((reslove, reject) => {
        request.get({url, encoding: null}, function(error, response, body){
            if(error){
                reject(error)
            }
            //判断是否需要编码转换
            if(encode){
                let data = iconv.decode(body, encode)
                reslove(data)
            }else{
                reslove(body)
            }
        })
    })
}