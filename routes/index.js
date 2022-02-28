const { Router } = require('express')

const {
  newCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customersController')

const router = Router()

// CRUD
router.post('/customers', newCustomer)
router.get('/customers', getCustomers)
router.get('/customers/:idCustomer', getCustomer)
router.put('/customers/:idCustomer', updateCustomer)
router.delete('/customers/:idCustomer', deleteCustomer)

module.exports = router
