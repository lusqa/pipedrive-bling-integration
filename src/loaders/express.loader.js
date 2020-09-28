const bodyParser = require('body-parser')

const { NODE_ENV } = require('../env')
const routes = require('../routes')

const expressLoader = ({ app }) => {
  if (NODE_ENV === 'development') {
    const cors = require('cors')
    app.use(cors())
  }

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use('/', routes())

  return app
}

module.exports = expressLoader
