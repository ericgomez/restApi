const express = require('express')

const routes = require('./routes')
const { dbConnect } = require('./config/db')

const app = express()

// database
dbConnect()

app.use('/', routes)

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})
