'use strict'

import requestAsync from './http'
import tmallParse from './tmall-parse'
import zhihuParse from './zhihu-parse'

import { createConnection, closeConnection } from './db'
import Article from './models'

import schedule from 'node-schedule'

const dbUri = 'mongodb://localhost/zhihu';

// const url = 'http://news.at.zhihu.com/story/9685215';
const url = 'http://news.at.zhihu.com/';

//定时规则
const rule = new schedule.RecurrenceRule()

//每小时第1分钟运行
//rule.minute = 51
//每30秒运行一次
var times1    = [1, 31];  
rule.second  = times1;  

const job  = schedule.scheduleJob(rule, () => {
	(async() => {
			try{
				const html = await requestAsync(url, 'utf-8')
				const articles = await zhihuParse(html)
				
				//connection mongodb
			   const info = await createConnection(dbUri)
			   console.log(`Connected to ${info.host}:${info.port}/${info.name}`)

			   const docs = await Article.collection.insert(articles);
			   console.log('insert ' + docs.insertedCount + ' rows success');
			   //close connection
			   await closeConnection();
				
			}catch(error){
				console.log(error)
			}
})();
})