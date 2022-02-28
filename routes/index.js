const { Router } = require('express')

const {
  newCustomer,
  getCustomers,
  getCustomer,
  updateCustomer
} = require('../controllers/customersController')

const router = Router()

router.post('/customers', newCustomer)

// get all customers
router.get('/customers', getCustomers)
router.get('/customers/:idCustomer', getCustomer)
router.put('/customers/:idCustomer', updateCustomer)

module.exports = router
