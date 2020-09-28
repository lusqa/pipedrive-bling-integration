const mongoose = require('mongoose')
const LOGGER = require('../logger')([__filename].join())
const { DATABASE_URL } = require('../env')

const databaseLoader = async () => {
  const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  }

  await mongoose.connect(DATABASE_URL, options)

  const connectionState = mongoose.connection.readyState
  if (connectionState === 1) {
    LOGGER.info('Connection to database engine has successfully established')
  } else {
    LOGGER.error('Something went wrong connecting to the database!')
  }
}

module.exports = databaseLoader
