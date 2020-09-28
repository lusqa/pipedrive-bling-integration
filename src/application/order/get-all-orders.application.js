const LOGGER = require('../../logger')([__filename].join())
const order = require('../../models/order')

module.exports = async () => {
  try {
    const orders = await order.find()
    return orders
  } catch (err) {
    LOGGER.error('Error getting orders from database [%o]', err)
    throw err
  }
}
