const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signup = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).send('User already exists')
    }

    const hashPassword = await bcrypt.hash(password, 10)

    await User.create({
      name,
      email,
      password: hashPassword
    })

    return res.status(201).send({ message: 'User created successfully' })
  } catch (error) {
    res.status(500).send('Server error')
  }
}

const login = (req, res) => {
  res.send('login')
}

module.exports = {
  signup,
  login
}
