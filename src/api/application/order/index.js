const create = require('./create-order.application')
const getAll = require('./get-all-orders.application')

module.exports = {
  createOrder: create,
  getAllOrders: getAll
}
