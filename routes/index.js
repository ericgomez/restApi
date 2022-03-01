const { Router } = require('express')

const {
  newCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customersController')

const {
  uploadImage,
  newProduct,
  getProducts
} = require('../controllers/productsController')

const router = Router()

// CRUD
router.post('/customers', newCustomer)
router.get('/customers', getCustomers)
router.get('/customers/:idCustomer', getCustomer)
router.put('/customers/:idCustomer', updateCustomer)
router.delete('/customers/:idCustomer', deleteCustomer)

router.post('/products', uploadImage, newProduct)
router.get('/products', getProducts)

module.exports = router
