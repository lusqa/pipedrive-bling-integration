const { getAllOrders } = require('../application/order')

module.exports = {
  getAll: async (req, res) => {
    try {
      const orders = await getAllOrders()
      return res.status(200).json(orders)
    } catch (error) {
      return res.sendStatus(500)
    }
  }
}
