const express = require('express')
const Guest = require('../models/Guest')
const Post = require('../models/Post')
const User = require('../models/User')
const seed = require('../models/seed')

const isAuthenticated = require('../middleware/isAuthenticated')

const main = express.Router()

// Optional seed route for DB
main.get('/seed', (req, res) => {
  Guest.insertMany(seed, (error, addedSeed) => {
    return error ? res.send(error) : res.redirect('/login')
  })
})

// Main page after login
main.get('/', isAuthenticated, (req, res) => {
  Guest.find({}, (error, entries) => {
    res.render('app/index.ejs', {
      entries,
      navOn: true,
      currentUser: req.session.currentUser,
      timeOffset: req.session.timeOffset
    })
  })
})

// Create new entry page
main.get('/new', isAuthenticated, (req, res) => {
  res.render('app/new.ejs', {
    navOn: true,
    currentUser: req.session.currentUser
  })
})

// Edit existing entry page
main.get('/:id/edit', isAuthenticated, (req, res) => {
  Guest.findById(req.params.id, (error, foundGuest) => {
    res.render('app/edit.ejs', {
      foundGuest,
      navOn: true,
      currentUser: req.session.currentUser,
      timeOffset: req.session.timeOffset
    })
  })
})

// View existing entry show page
main.get('/:id', isAuthenticated, (req, res) => {
  Guest.findById(req.params.id, (error, foundGuest) => {
    res.render('app/show.ejs', {
      foundGuest,
      navOn: true,
      currentUser: req.session.currentUser,
      timeOffset: req.session.timeOffset
    })
  })
})

// Create a new guest entry in DB
main.post('/', isAuthenticated, (req, res) => {
  Guest.create(req.body, (error, newEntry) => {
    res.redirect('/app')
  })
})

// Make a new comment on guest entry and store refs to Guest and User
main.post('/:id/newpost', isAuthenticated, (req, res) => {
  req.body.author = { name: '', id: '' }
  req.body.author.name = `${req.session.currentUser.name.firstName} ${req.session.currentUser.name.lastName}`
  req.body.author.id = req.session.currentUser._id
  Post.create(req.body, (error, newPost) => {
    if (error) {
      res.send(error)
    } else {
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

// Update guest info to DB from edit page submit
main.put('/:id', isAuthenticated, (req, res) => {
  req.body.arrived = new Date(req.body.arrived)
  req.body.arrived.toISOString()
  req.body.departed = new Date(req.body.departed)
  req.body.departed.toISOString()

  Guest.findByIdAndUpdate(req.params.id, req.body, (error, updatedGuest) => {
    res.redirect(`/app/${req.params.id}`)
  })
})

// User can delete one of their posts; refs also removed from User and Guest
main.delete('/:guestEntry/:postID', isAuthenticated, (req, res) => {
  Guest.findByIdAndUpdate(
    req.params.guestEntry,
    {
      $pull: { posts: req.params.postID }
    },
    { safe: true, upsert: true },
    (error, guest) => {
      User.findOneAndUpdate(
        { posts: req.params.postID },
        { $pull: { posts: req.params.postID } },
        (error, User) => {
          Post.findByIdAndDelete(req.params.postID, (error, deleted) => {
            res.redirect(`/app/${req.params.guestEntry}`)
          })
        }
      )
    }
  )
})

// Delete guest entry, comments and all
main.delete('/:id', isAuthenticated, (req, res) => {
  Guest.findByIdAndDelete(req.params.id, (error, deleted) => {
    res.redirect('/app')
  })
})

module.exports = main
