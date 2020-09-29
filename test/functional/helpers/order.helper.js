const Order = require('../../../src/models/order')

async function createOrder (params) {
  await Order.createOrder({
    total_value: params.total_value,
    won_date: params.won_date
  })
}

module.exports = {
  createOrder
}
