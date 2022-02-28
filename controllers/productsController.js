const Product = require('../models/product')

const newProduct = async (req, res, next) => {
  // console.log(req.body)
  const product = new Product(req.body)

  try {
    await product.save()
    res.status(201).json({
      message: 'Product created successfully'
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
    next()
  }
}

module.exports = {
  newProduct
}
