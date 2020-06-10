const mongoose = require('mongoose')

const { Schema } = mongoose

const guestSchema = new Schema({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  },
  arrived: { type: Date, required: true, default: Date.now },
  departed: { type: Date, required: true },
  reservationID: String,
  accomodation: {
    property: String || null,
    roomNumber: { type: String, required: true }
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      autopopulate: true
    }
  ]
})

guestSchema.plugin(require('mongoose-autopopulate'))

const Guest = mongoose.model('Guest', guestSchema)

module.exports = Guest
