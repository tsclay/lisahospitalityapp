const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const user = express.Router()

user.get('/register', (req, res) => {
  res.render('users/register.ejs', { navOn: false })
})

user.get('/login', (req, res) => {
  res.render('users/login.ejs', { navOn: false })
})

user.post('/register', (req, res) => {
  res.redirect('/app')
})

module.exports = user
