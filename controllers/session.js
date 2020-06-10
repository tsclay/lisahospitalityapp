const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Post = require('../models/Post')
const isAuthenticated = require('../middleware/isAuthenticated')

const session = express.Router()

// Login page
session.get('/login', (req, res) => {
  res.render('users/login.ejs', { navOn: false })
})

// About page
session.get('/about', (req, res) => {
  res.render('app/about.ejs', {
    navOn: true,
    currentUser: req.session.currentUser
  })
})

// Login to user session and snag their timezone
session.post('/login/:timezone', (req, res) => {
  const errors = {}
  User.findOne({ email: req.body.email }, (error, foundUser) => {
    if (error) {
      res.send(error)
    } else if (
      !foundUser ||
      !bcrypt.compareSync(req.body.password, foundUser.password)
    ) {
      errors.msg = 'Email address or password incorrect. Please try again.'
      res.render('users/login.ejs', { errors, navOn: false })
    } else {
      req.session.currentUser = foundUser
      req.session.timeOffset = Number(req.params.timezone)
      res.redirect('/app')
    }
  })
})

// User can update one of their posts
session.put('/app/comment/:guestId/:postId', isAuthenticated, (req, res) => {
  console.log(req.body)
  Post.findByIdAndUpdate(
    req.params.postId,
    { $set: { content: req.body.content } },
    { new: true },
    (error, post) => {
      console.log(post)
      return error
        ? res.send(error)
        : res.redirect(`/app/${req.params.guestId}`)
    }
  )
})

// Logout of session
session.delete('/logout', isAuthenticated, (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
})

module.exports = session
