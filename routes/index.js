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
  getProducts,
  searchProduct,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productsController')

const {
  newOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/ordersController')

const { signup, login } = require('../controllers/usersController')

const router = Router()

// CRUD
router.post('/customers', newCustomer)
router.get('/customers', getCustomers)
router.get('/customers/:idCustomer', getCustomer)
router.put('/customers/:idCustomer', updateCustomer)
router.delete('/customers/:idCustomer', deleteCustomer)

router.post('/products', uploadImage, newProduct)
router.get('/products', getProducts)
router.post('/products/search/:query', searchProduct)
router.get('/products/:idProduct', getProduct)
router.put('/products/:idProduct', uploadImage, updateProduct)
router.delete('/products/:idProduct', deleteProduct)

router.post('/orders', newOrder)
router.get('/orders', getOrders)
router.get('/orders/:idOrder', getOrder)
router.put('/orders/:idOrder', updateOrder)
router.delete('/orders/:idOrder', deleteOrder)

// signup
router.post('/signup', signup)
router.post('/login', login)

module.exports = router
