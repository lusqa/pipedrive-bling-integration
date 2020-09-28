const { Router } = require('express')
const controller = require('../controllers/order.controller')

module.exports = () => {
  const router = Router()

  router.route('/')
    .get(controller.getAll)

  return router
}
