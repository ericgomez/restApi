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

const authenticateJWT = require('../middlewares/auth')

const router = Router()

// CRUD
router.post('/customers', authenticateJWT, newCustomer)
router.get('/customers', authenticateJWT, getCustomers)
router.get('/customers/:idCustomer', authenticateJWT, getCustomer)
router.put('/customers/:idCustomer', authenticateJWT, updateCustomer)
router.delete('/customers/:idCustomer', authenticateJWT, deleteCustomer)

router.post('/products', authenticateJWT, uploadImage, newProduct)
router.get('/products', authenticateJWT, getProducts)
router.post('/products/search/:query', authenticateJWT, searchProduct)
router.get('/products/:idProduct', authenticateJWT, getProduct)
router.put('/products/:idProduct', authenticateJWT, uploadImage, updateProduct)
router.delete('/products/:idProduct', authenticateJWT, deleteProduct)

router.post('/orders', authenticateJWT, newOrder)
router.get('/orders', authenticateJWT, getOrders)
router.get('/orders/:idOrder', authenticateJWT, getOrder)
router.put('/orders/:idOrder', authenticateJWT, updateOrder)
router.delete('/orders/:idOrder', authenticateJWT, deleteOrder)

// signup
router.post('/auth/signup', signup)
router.post('/auth/login', login)

module.exports = router
