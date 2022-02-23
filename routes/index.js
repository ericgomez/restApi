const { Router } = require('express')

const { newCustomer } = require('../controllers/customersController')

const router = Router()

router.post('/customers', newCustomer)

module.exports = router
