const express = require('express')
const Guest = require('../models/Guest')
const seed = require('../models/seed')

const isAuthenticated = () => {
  if (req.session.currentUser) {
    return next()
  }
  return res.redirect('/sessions/new')
}

const main = express.Router()

main.get('/seed', (req, res) => {
  Guest.insertMany(seed, (error, addedSeed) => {
    res.send(addedSeed)
  })
})

main.get('/', (req, res) => {
  Guest.find({}, (error, entries) => {
    res.render('app/index.ejs', { entries })
  })
})

main.get('/new', (req, res) => {
  res.render('app/new.ejs')
})

main.get('/:id/edit', (req, res) => {
  Guest.findById(req.params.id, (error, foundGuest) => {
    res.render('app/edit.ejs', { foundGuest })
  })
})

main.get('/:id', (req, res) => {
  Guest.findById(req.params.id, (error, foundGuest) => {
    res.render('app/show.ejs', { foundGuest })
  })
})

main.post('/', (req, res) => {
  Guest.create(req.body, (error, newEntry) => {
    res.redirect('/app')
  })
})

main.put('/:id', (req, res) => {
  Guest.findByIdAndUpdate(req.params.id, req.body, (error, updatedGuest) => {
    res.redirect(`/app/${req.params.id}`)
  })
})

main.delete('/:id', (req, res) => {
  Guest.findByIdAndDelete(req.params.id, (error, deleted) => {
    res.redirect('/app')
  })
})

module.exports = main
