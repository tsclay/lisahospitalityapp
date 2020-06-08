const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const user = express.Router()

user.get('/', (req, res) => {
  res.render('users/register.ejs', { navOn: false })
})

user.post('/', (req, res) => {
  // Validate inputs
  const { name, email, password, password2 } = req.body
  const errors = []

  // Check if all fields filled
  if (!name.firstName || !name.lastName || !email || !password || password2) {
    errors.push({ msg: 'Please fill in all fields.' })
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' })
  }

  // Check that passwords match
  if (password !== password2) {
    errors.push({ msg: 'Passwords should match.' })
  }

  if (errors.length > 0) {
    res.render('users/register.ejs', {
      errors,
      name,
      email,
      password,
      password2,
      navOn: false
    })
  } else {
    req.body.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    )
    User.create(req.body, (error, newUser) => {
      return error
        ? console.log(error)
        : res.render('users/login.ejs', {
            successMsg: `Thanks for signing up, ${newUser.name.firstName}. Let's get you logged in!`
          })
    })
  }
})

module.exports = user
