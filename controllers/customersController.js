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

const getCustomer = async (req, res, next) => {
  const customer = await Customer.findById(req.params.idCustomer)

  if (!customer) {
    res.status(404).json({
      message: 'Customer not found'
    })
    next()
  }

  res.status(200).json(customer)
}

const updateCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.idCustomer,
      req.body, // new values
      {
        // options
        new: true,
        runValidators: true
      }
    )

    if (!customer) {
      res.status(404).json({
        message: 'Customer not found'
      })
      next()
    }

    res.status(200).json(customer)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
    next()
  }
}

const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.idCustomer)

    if (!customer) {
      res.status(404).json({
        message: 'Customer not found'
      })
      next()
    }

    res.status(200).json({
      message: 'Customer deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
    next()
  }
}

module.exports = {
  newCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer
}
