const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signup = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).send({ message: 'User already exists' })
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

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).send({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid password' })
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.SECRET_KEY, // key to sign the token (secret)
      {
        expiresIn: '1h'
      }
    )

    return res.status(200).send({ token })
  } catch (error) {
    res.status(500).send({ message: 'Server error' })
  }
}

module.exports = {
  signup,
  login
}
