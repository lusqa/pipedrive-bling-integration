const bodyParser = require('body-parser')

const { NODE_ENV } = require('../env')

const expressLoader = ({ app }) => {
  if (NODE_ENV === 'development') {
    const cors = require('cors')
    app.use(cors())
  }

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  return app
}

module.exports = expressLoader
