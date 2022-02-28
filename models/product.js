const { Schema, model } = require('mongoose')

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    image: {
      type: String
    }
  },
  {
    versionKey: false
  }
)

module.exports = model('Product', ProductSchema)
