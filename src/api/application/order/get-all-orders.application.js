const LOGGER = require('../../../logger')([__filename].join())
const order = require('../../../models/order')

module.exports = async () => {
  try {
    LOGGER.debug('Getting orders from database')
    const orders = await order.find()
    LOGGER.debug('Got orders successfully!')
    return orders
  } catch (err) {
    LOGGER.error('Error getting orders from database [%o]', err)
    throw err
  }
}
