const { Router } = require('express')
const swaggerUi = require('swagger-ui-express')

const order = require('./order.routes')
const swaggerDocument = require('../../swagger.json')

module.exports = () => {
  const routes = Router()

  routes.use('/order', order())
  routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  return routes
}
