/* eslint-env node, mocha */
const chai = require('chai')
const chaiHttp = require('chai-http')

const orderHelper = require('./helpers/order.helper')

chai.use(chaiHttp)

const { expect } = chai

describe('Order Controller spec', function () {
  describe('When getting the orders', function () {
    it('Should return 200', async function () {
      const response = await chai
        .request(this.baseURL)
        .get('/order')

      expect(response.status).to.be.equal(200, 'The status code should be 200')
    })

    it('Should return all data stored', async function () {
      const now = Date.now()
      await orderHelper.createOrder({
        total_value: 17500,
        won_date: now
      })

      const response = await chai
        .request(this.baseURL)
        .get('/order')

      const expectedResponse = {
        total_value: 17500,
        won_date: new Date(now).toISOString()
      }

      expect(response.status).to.be.equal(200, 'The status code should be 200')
      expect(response.body[0]).to.deep.include(expectedResponse)
    })
  })
})
