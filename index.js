const express = require('express')

const routes = require('./routes')
const db = require('./config/db')

db.dbConnect()
  .then(res => {
    console.log('Database inline')
  })
  .catch(err => {
    console.log(err)
  })

const app = express()

app.use('/', routes)

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})
