'use strict'

import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
    title: String,
    cover: String
})

export default mongoose.model('article', articleSchema)
