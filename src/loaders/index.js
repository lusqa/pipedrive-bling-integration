const expressLoader = require('./express.loader')
const databaseLoader = require('./database.loader')
const cronLoader = require('./cron.loader')

const LOGGER = require('../logger')([__filename].join())

module.exports = async ({ app }) => {
  await databaseLoader()

  await cronLoader()

  await expressLoader({ app })

  LOGGER.debug('Express Loader has initalized successfully!')
}
