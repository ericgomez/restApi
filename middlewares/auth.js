const jwt = require('jsonwebtoken')

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({ message: 'Token not provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    if (!decoded) {
      return res.status(401).send({ message: 'Token invalid' })
    }

    next()
  } catch (error) {
    res.status(500).send({ message: 'Server error' })
  }
}

module.exports = authenticateJWT
