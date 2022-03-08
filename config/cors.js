// allow list
const allowlist = ['http://localhost:3000']

const corsOptions = {
  origin: function (req, callback) {
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

module.exports = corsOptions
