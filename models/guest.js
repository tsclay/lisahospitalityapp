const mongoose = require('mongoose')

const { Schema } = mongoose

const guestSchema = new Schema({
  name: { type: String, required: true },
  lastStay: { type: String, required: true },
  reservationID: Number,
  accomodation: {
    property: { type: String, required: true },
    roomNumber: { type: Number, required: true }
  }
})

const Guest = mongoose.model('Guest', guestSchema)

module.exports = Guest
