const mongoose = require('mongoose')
const LOGGER = require('../logger')([__filename].join())
const { DATABASE_URL } = require('../env')

const databaseLoader = () => {
  const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  }

  mongoose.connect(DATABASE_URL, options)

  setTimeout(() => {
    const connectionState = mongoose.connection.readyState
    if (connectionState === 1) {
      LOGGER.info('Connection to database engine has successfully established ✅')
    } else {
      LOGGER.error('Something went wrong connecting to the database!')
    }
  }, 3000)
}

module.exports = databaseLoader
