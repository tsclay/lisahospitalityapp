const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const user = express.Router()

user.get('/', (req, res) => {
  res.render('users/new.ejs')
})

user.post('/', (req, res) => {
  res.redirect('/app')
})

module.exports = user
