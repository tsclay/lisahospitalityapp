const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const user = express.Router()

user.get('/', (req, res) => {
  res.render('users/register.ejs', { navOn: false })
})

user.post('/', (req, res) => {
  // Validate inputs
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  // Check if all fields filled
  if (
    !name.firstName ||
    !name.lastName ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    errors.push({ name: 'FillError', msg: 'Please fill in all fields.' })
  }

  // Check password length
  if (password.length < 6) {
    errors.push({
      name: 'PasswordLengthError',
      msg: 'Password should have at least 6 characters.'
    })
  }

  // Check that passwords match
  if (password !== confirmPassword) {
    errors.push({ name: 'PasswordMatchError', msg: 'Passwords should match.' })
  }

  if (errors.length > 0) {
    res.render('users/register.ejs', {
      errors,
      name,
      email,
      password,
      confirmPassword,
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
            regSuccess: newUser.name.firstName,
            navOn: false
          })
    })
  }
})

module.exports = user
