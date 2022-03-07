const fs = require('fs')

const Product = require('../models/product')
const multer = require('../middlewares/fileUpload')

const uploadImage = async (req, res, next) => {
  const upload = multer.single('image')

  upload(req, res, async error => {
    if (error) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        res.status(400).json({
          message: 'The file size is too big'
        })
      } else if (error.hasOwnProperty('message')) {
        // access the error message directly of new Error
        res.status(400).json({
          message: error.message
        })
      } else {
        res.status(400).json({
          message: error.message
        })
      }
      // redirect to back
      return res.redirect('back')
    } else {
      // if there is no error
      next()
    }
  })
}

const newProduct = async (req, res, next) => {
  // console.log(req.body)
  const product = new Product(req.body)

  if (req.file) {
    product.image = req.file.filename
  }

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

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()

    res.status(200).json(products)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
    next()
  }
}

const searchProduct = async (req, res, next) => {
  try {
    const { query } = req.params

    const products = await Product.find({
      name: new RegExp(query, 'i')
    })

    res.status(200).json(products)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
    next()
  }
}

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.idProduct)

    if (!product) {
      res.status(404).json({
        message: 'Product not found'
      })
      return next()
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
    next()
  }
}

const updateProduct = async (req, res, next) => {
  try {
    // search for the product
    const product = await Product.findById(req.params.idProduct)

    if (!product) {
      res.status(404).json({
        message: 'Product not found'
      })
      return next()
    }

    // check if there is an image
    if (req.file && product.image) {
      const pathImage = `./uploads/${product.image}`

      // delete the previous image asynchronously
      // no required await because it is not a blocking operation
      fs.unlink(pathImage, error => {
        if (error) {
          console.log(error)
        }

        return
      })
    }

    // add only name of image if exists
    if (req.file) {
      product.image = req.file.filename
    }

    // update the product
    product.name = req.body.name
    product.price = req.body.price

    // update the product with the new data
    await product.save()

    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
    next()
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    // search for the product
    const product = await Product.findById(req.params.idProduct)

    if (!product) {
      res.status(404).json({
        message: 'Product not found'
      })
      return next()
    }

    // check if there is an image
    if (product.image) {
      const pathImage = `./uploads/${product.image}`

      // delete the previous image asynchronously
      // no required await because it is not a blocking operation
      fs.unlink(pathImage, error => {
        if (error) {
          console.log(error)
        }

        return
      })
    }

    // delete the product
    await product.remove()

    res.status(200).json({
      message: 'Product deleted successfully'
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
    next()
  }
}

module.exports = {
  uploadImage,
  newProduct,
  getProducts,
  searchProduct,
  getProduct,
  updateProduct,
  deleteProduct
}
