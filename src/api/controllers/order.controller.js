const LOGGER = require('../../logger')([__filename].join())
const { getAllOrders } = require('../../application/order')

module.exports = {
  getAll: async (req, res) => {
    try {
      const orders = await getAllOrders()
      return res.status(200).json(orders)
    } catch (error) {
      LOGGER.error('Health check failed: [%o]', error)
      return res.sendStatus(500)
    }
  }
}
