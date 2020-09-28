require('dotenv').config()

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PROTOCOL: process.env.PROTOCOL || 'http',
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/seqtdb',
  LOGGER_LEVEL: process.env.LOGGER_LEVEL || 'debug',
  PIPEDRIVE_API_TOKEN: process.env.PIPEDRIVE_API_TOKEN,
  BLING_API_KEY: process.env.BLING_API_KEY
}
