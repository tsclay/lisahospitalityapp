const express = require('express')
const Guest = require('../models/Guest')
const Post = require('../models/Post')
const User = require('../models/User')
const seed = require('../models/seed')

const isAuthenticated = require('../middleware/isAuthenticated')

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
    console.log(foundGuest)
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

main.post('/:id/newpost', isAuthenticated, (req, res) => {
  req.body.author = { name: '', id: '' }
  req.body.author.name = `${req.session.currentUser.name.firstName} ${req.session.currentUser.name.lastName}`
  req.body.author.id = req.session.currentUser._id
  console.log('This is req.body:', req.body)
  // req.body.author.id = req.params.author
  Post.create(req.body, (error, newPost) => {
    if (error) {
      res.send(error)
    } else {
      console.log('This is the Post:', newPost)
      Guest.findByIdAndUpdate(
        req.params.id,
        { $push: { posts: newPost.id } },
        (error, updatedGuest) => {
          User.findByIdAndUpdate(
            req.session.currentUser._id,
            {
              $push: { posts: newPost.id }
            },
            (error, updatedUser) => {
              return error
                ? res.send(error)
                : res.redirect(`/app/${req.params.id}`)
            }
          )
        }
      )
    }
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
