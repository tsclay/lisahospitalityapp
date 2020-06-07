const mongoose = require('mongoose')

const { Schema } = mongoose

const postSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: { type: String, required: true }
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema, 'posts')

module.exports = Post
