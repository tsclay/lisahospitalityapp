//==================================================
// Require stack
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
require('dotenv').config()

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

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.send('Hello world!')
})

//==================================================
// Open server PORT for app
app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`)
})
