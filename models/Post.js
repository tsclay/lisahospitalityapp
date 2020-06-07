const mongoose = require('mongoose')

const { Schema } = mongoose

const postSchema = new Schema(
  {
    author: {
      name: { type: String, required: true },
      id: { type: String, required: true }
    },
    content: { type: String, required: true }
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema, 'posts')

module.exports = Post
