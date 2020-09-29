/* eslint-env node, mocha */

var { Mongoose } = require('mongoose')
var mongoose = new Mongoose()

var { Mockgoose } = require('mockgoose')
var mockgoose = new Mockgoose(mongoose)

before(function (done) {
  mockgoose.prepareStorage().then(function () {
    mongoose.connect('mongodb://example.com/TestingDB', function (err) {
      done(err)
    })
  })
})
