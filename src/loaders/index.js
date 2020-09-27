const expressLoader = require('./express')
const databaseLoader = require('./database')

const LOGGER = require('../logger')([__filename].join())

module.exports = async ({ app }) => {
  await databaseLoader()

  await expressLoader({ app })

  LOGGER.debug('Express Loader has initalized successfully!')
}
