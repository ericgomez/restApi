const Order = require('../models/order')

const newOrder = async (req, res, next) => {
  try {
    // search for the product
    const order = await Order.create(req.body)

    res.status(201).json(order)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
    next()
  }
}

module.exports = {
  newOrder
}
