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

const getOrders = async (req, res, next) => {
  try {
    // populate the customer and product fields of the order model
    const orders = await Order.find()
      .populate('customer', ['name', 'lastName']) // In the first level we only add the name and lastName of the model - get only the name and lastName of the customer
      .populate('order.product', ['name', 'price']) // If it is greater than one level, it is required to indicate nesting separated by dots - get the name and price of the product

    res.status(200).json(orders)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
    next()
  }
}

const getOrder = async (req, res, next) => {
  try {
    // populate the customer and product fields of the order model
    const order = await Order.findById(req.params.idOrder)
      .populate('customer', 'name') // In the first level we only add the name of the model - get only the name of the customer
      .populate('order.product', 'name') // If it is greater than one level, it is required to indicate nesting separated by dots - get the name of the product

    if (!order) {
      res.status(404).json({
        message: 'Order not found'
      })
      return next()
    }

    res.status(200).json(order)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
    next()
  }
}

const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.idOrder, req.body, {
      new: true,
      runValidators: true
    })
      .populate('customer', 'name') // In the first level we only add the name of the model - get only the name of the customer
      .populate('order.product', 'name') // If it is greater than one level, it is required to indicate nesting separated by dots - get the name of the product

    if (!order) {
      res.status(404).json({
        message: 'Order not found'
      })
      return next()
    }

    res.status(200).json(order)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
    next()
  }
}

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.idOrder)

    if (!order) {
      res.status(404).json({
        message: 'Order not found'
      })
      return next()
    }

    res.status(200).json(order)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
    next()
  }
}

module.exports = {
  newOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder
}
