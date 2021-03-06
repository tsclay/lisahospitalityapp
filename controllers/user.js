const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const user = express.Router()

// New users register page
user.get('/', (req, res) => {
  res.render('users/register.ejs', { navOn: false })
})

// Create new user if all the error checks succeed
user.post('/', (req, res) => {
  // Validate inputs
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  let doesUserExist = false

  // Check if email already exists in the DB
  User.findOne({ email }, (error, userFound) => {
    if (userFound) {
      console.log('Caught it!')
      errors.push({
        name: 'UserAlreadyExistsError',
        msg: 'This email already exists.'
      })
      res.render('users/register.ejs', {
        errors,
        name,
        email,
        password,
        confirmPassword,
        navOn: false
      })
      doesUserExist = true
    }
    // If email already exists, other errors don't matter
    if (doesUserExist) {
      return null
    }

    //==================================================
    // If email is unique to our DB, continue

    // Check if all fields are filled
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
      errors.push({
        name: 'PasswordMatchError',
        msg: 'Passwords should match.'
      })
    }

    // Re-render the page with the error messages if any
    // else, make the user account and redirect to login
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
    return null
  })
})

module.exports = user
