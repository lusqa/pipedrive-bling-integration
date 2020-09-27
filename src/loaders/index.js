const expressLoader = require('./express')
const LOGGER = require('../logger')([__filename].join())

module.exports = async ({ app }) => {
  await expressLoader({ app })

  LOGGER.info('Express Loader has initalized successfully! ✅')
}
