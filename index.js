const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./routes')
const { dbConnect } = require('./config/db')
const corsOptions = require('./config/cors')

const app = express()

// database
dbConnect()

// enable body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// enable cors
app.use(cors(corsOptions))

app.use('/', routes)

// public folder
app.use(express.static('uploads'))

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
