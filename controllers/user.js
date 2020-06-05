const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const user = express.Router()

user.get('/', (req, res) => {
  res.render('users/register.ejs', { navOn: false })
})

user.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (error, newUser) => {
    return error ? console.log(error) : res.send(newUser)
  })
})

module.exports = user
