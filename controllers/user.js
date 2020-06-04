const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const user = express.Router()

user.get('/register', (req, res) => {
  res.render('users/register.ejs')
})

user.get('/login', (req, res) => {
  res.render('users/login.ejs')
})

user.post('/register', (req, res) => {
  res.redirect('/app')
})

module.exports = user
