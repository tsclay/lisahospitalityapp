const express = require('express')
const Guest = require('../models/Guest')
const seed = require('../models/seed')

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  }
  return res.redirect('/login')
}

const main = express.Router()

main.get('/seed', (req, res) => {
  Guest.insertMany(seed, (error, addedSeed) => {
    return error ? res.send(error) : res.redirect('/login')
  })
})

main.get('/', isAuthenticated, (req, res) => {
  Guest.find({}, (error, entries) => {
    res.render('app/index.ejs', {
      entries,
      navOn: true,
      currentUser: req.session.currentUser
    })
  })
})

main.get('/new', isAuthenticated, (req, res) => {
  res.render('app/new.ejs', {
    navOn: true,
    currentUser: req.session.currentUser
  })
})

main.get('/:id/edit', isAuthenticated, (req, res) => {
  Guest.findById(req.params.id, (error, foundGuest) => {
    res.render('app/edit.ejs', {
      foundGuest,
      navOn: true,
      currentUser: req.session.currentUser
    })
  })
})

main.get('/:id', isAuthenticated, (req, res) => {
  Guest.findById(req.params.id, (error, foundGuest) => {
    res.render('app/show.ejs', {
      foundGuest,
      navOn: true,
      currentUser: req.session.currentUser
    })
  })
})

main.post('/', isAuthenticated, (req, res) => {
  Guest.create(req.body, (error, newEntry) => {
    res.redirect('/app')
  })
})

main.put('/:id', isAuthenticated, (req, res) => {
  Guest.findByIdAndUpdate(req.params.id, req.body, (error, updatedGuest) => {
    res.redirect(`/app/${req.params.id}`)
  })
})

main.delete('/:id', isAuthenticated, (req, res) => {
  Guest.findByIdAndDelete(req.params.id, (error, deleted) => {
    res.redirect('/app')
  })
})

module.exports = main
