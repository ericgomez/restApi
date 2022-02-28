const { Router } = require('express')

const {
  newCustomer,
  getCustomers
} = require('../controllers/customersController')

const router = Router()

router.post('/customers', newCustomer)

// get all customers
router.get('/customers', getCustomers)

module.exports = router
