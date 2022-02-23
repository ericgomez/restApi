const { Schema, model } = require('mongoose')

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: Date,
      required: true,
      trim: true
    },
    email: {
      type: Date,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    }
  },
  {
    versionKey: false
  }
)

module.exports = model('Event', CustomerSchema)
