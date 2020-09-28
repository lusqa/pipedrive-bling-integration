const create = require('./create-orders.application')
const getAll = require('./get-all-orders.application')

module.exports = {
  createOrder: create,
  getAllOrders: getAll
}
