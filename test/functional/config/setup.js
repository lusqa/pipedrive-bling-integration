/* eslint-env node, mocha */
const mongoose = require('mongoose')

const {
  HOST,
  PORT,
  PROTOCOL
} = require('../../../src/env')

beforeEach(function (done) {
  this.baseURL = `${PROTOCOL}://${HOST}:${PORT}`
  require('../../../index')
  done()
})

afterEach(function (done) {
  if (mongoose.connection.db) {
    mongoose.connection.db.dropDatabase(done)
  } else {
    done()
  }
})
