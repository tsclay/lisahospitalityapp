const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const session = express.Router()

session.get('/login', (req, res) => {
  res.render('users/login.ejs', { navOn: false })
})

session.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (error, foundUser) => {
    if (error) {
      res.send(error)
    } else if (!foundUser) {
      res.send('Email address or password incorrect. Please try again.')
    } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser
      res.redirect('/app')
    }
  })
})

session.delete('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
})

module.exports = session
