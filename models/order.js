const { Schema, model } = require('mongoose')

const OrderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    order: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    total: {
      type: Number,
      required: true
    }
  },
  {
    versionKey: false
  }
)

module.exports = model('Order', OrderSchema)
