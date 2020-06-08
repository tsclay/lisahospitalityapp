//==================================================
// NPM pkgs
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
const moment = require('moment')

//==================================================
// Middleware
const isAuthenticated = require('./middleware/isAuthenticated')

//==================================================
// Environment variables for development
require('dotenv').config()

//==================================================
// Controllers
const guestController = require('./controllers/main')
const sessionController = require('./controllers/session')
const userController = require('./controllers/user')

//==================================================
// Configure PORT and MONGODB_URI
const PORT = process.env.PORT || 3333
const { MONGODB_URI } = process.env

//==================================================
// Connect to MongoDB
mongoose.connect(
  MONGODB_URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  () => {
    console.log(`Connected to MONGODB @ ${MONGODB_URI}`)
  }
)

//==================================================
// Create Express app and set middleware
const app = express()

app.locals.moment = require('moment')

// Set template engine
app.use(expressLayouts)
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)
app.use(sessionController)
app.use('/register', userController)
app.use('/app', guestController)

//==================================================
// Set the redirect to login or user session when loading main URL
app.get('/', isAuthenticated, (req, res) => {
  if (!req.session.currentUser) {
    res.redirect('/login')
  } else {
    res.redirect('/app')
  }
})

//==================================================
// Open server PORT for app
app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`)
})
