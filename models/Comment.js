const mongoose = require('mongoose')

const { Schema } = mongoose

const commentSchema = new Schema({
  commenter: {
    name: String,
    ID: Number
  },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now.toLocaleString },
  edited: { type: Boolean, default: false },
  updatedAt: { type: Date, default: null }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
