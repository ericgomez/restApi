const mongoose = require('mongoose')
require('dotenv').config()

const mongoDB = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`

const dbConnect = async () => {
  try {
    const { connection } = await mongoose.connect(mongoDB)

    console.log('Database inline')
    return connection.getClient()
  } catch (error) {
    console.log(error)
    throw new Error('Error while connecting to Mongo')
  }
}

module.exports = {
  dbConnect
}
