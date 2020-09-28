const { Router } = require('express')
const order = require('./order.routes')

module.exports = () => {
  const routes = Router()

  routes.use('/order', order())

  return routes
}
