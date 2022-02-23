const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get('/about', (req, res) => {
  res.send('About page')
})

module.exports = router
