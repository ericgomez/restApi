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

module.exports = {
  uploadImage,
  newProduct
}
