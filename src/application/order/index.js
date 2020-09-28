const create = require('./create-orders.application')
const getAll = require('./get-all-orders.application')

module.exports = {
  createOrders: create,
  getAllOrders: getAll
}
