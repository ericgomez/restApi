const Customer = require('../models/customer')

const newCustomer = async (req, res, next) => {
  console.log(req.body)
  const customer = new Customer(req.body)

  try {
    await customer.save()
    res.status(201).json({
      message: 'Customer created successfully'
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
    next()
  }
}

const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find({})
    res.status(200).json(customers)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
    next()
  }
}

module.exports = {
  newCustomer,
  getCustomers
}