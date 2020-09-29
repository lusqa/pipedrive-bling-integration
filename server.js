const express = require('express')

const { PORT } = require('./src/env')
const loaders = require('./src/loaders')
const LOGGER = require('./src/logger')([__filename].join())

const startServer = async () => {
  const app = express()

  await loaders({ app })

  app.listen(PORT, err => {
    if (err) {
      LOGGER.error('Error starting server due to: %s', err)
      throw err
    }

    LOGGER.info(`Server listening on port: ${PORT}`)
  })
}

module.exports = startServer
