const pipedrive = require('pipedrive')

const LOGGER = require('../../logger')([__filename].join())
const { PIPEDRIVE_API_TOKEN } = require('../../env')

const Order = require('../../models/order')
const BlingService = require('../../services/bling.service')

const { DealsController } = pipedrive

module.exports = async () => {
  pipedrive.Configuration.apiToken = PIPEDRIVE_API_TOKEN

  let response
  try {
    LOGGER.debug('Getting deals from pipedrive')
    response = await DealsController.getAllDeals({ status: 'won' })
    LOGGER.debug('Got deals succesfully!')
  } catch (err) {
    LOGGER.error('Error getting deals with won status from pipedrive [%o]', err)
    throw err
  }

  const { data: deals } = response
  const dbDeals = new Map()
  deals.forEach(async deal => {
    try {
      const [wonDate] = deal.won_time.split(' ')
      const utcDate = new Date(wonDate).toISOString()
      const actualValue = dbDeals.get(utcDate) || 0
      dbDeals.set(utcDate, actualValue + deal.value)

      await BlingService.createOrder({
        code: deal.id_deal,
        companyName: deal.org_name,
        productValue: deal.value,
        productTitle: deal.title
      })
    } catch (err) {
      LOGGER.error('Error creating orders in Bling service [%o]', err)
      throw err
    }
  })

  dbDeals.forEach(async (totalValue, wonDate) => {
    try {
      LOGGER.debug('Creating order on database to date: [%s]', wonDate)
      await Order.createOrder({
        totalValue,
        wonDate
      })
    } catch (err) {
      LOGGER.error('Error creating orders in database [%o]', err)
      throw err
    }
  })
}
