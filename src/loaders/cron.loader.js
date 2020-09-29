const cron = require('node-cron')

const LOGGER = require('../logger')([__filename].join())
const { createOrders } = require('../application/order')

const cronLoader = () => {
  LOGGER.info('Cron job scheduled to 00:00')
  cron.schedule('0 0 0 * * *', async () => {
    LOGGER.info('Executing cron job to get orders from pipedrive and create the orders')
    await createOrders()
  })
}

module.exports = cronLoader
