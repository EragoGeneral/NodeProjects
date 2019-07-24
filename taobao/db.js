'use strict'

import Promise from 'bluebird'
import mongoose from 'mongoose'

//创建连接
export function createConnection(uri){
    return new Promise((resolve, reject) => {
        mongoose.Promise = Promise;
        mongoose.connection
          .on('error', error => reject(error))
          .on('close', () => console.log('Database connection closed.'))
          .once('open', () => resolve(mongoose.connections[0]));

        mongoose.connect(uri);
    })
}

//关闭连接
export function closeConnection(){
    return new Promise((resolve, reject) => {
        mongoose.connection.close(function(){
            resolve()
        })
    })
}