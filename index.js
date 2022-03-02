const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./routes')
const { dbConnect } = require('./config/db')

const app = express()

// database
dbConnect()

// enable body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// enable cors
app.use(cors())

app.use('/', routes)

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})
