const mongoose = require('mongoose')

const { Schema } = mongoose

const guestSchema = new Schema({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  },
  recentStay: { type: String, required: true },
  reservationID: String,
  accomodation: {
    property: String || null,
    roomNumber: { type: String, required: true }
  },
  comments: { type: String, required: true }
})

const Guest = mongoose.model('Guest', guestSchema)

module.exports = Guest
