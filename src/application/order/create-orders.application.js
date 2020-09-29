const pipedrive = require('pipedrive')

const LOGGER = require('../../logger')([__filename].join())
const { PIPEDRIVE_API_TOKEN } = require('../../env')

const Order = require('../../models/order')
const BlingService = require('../../services/bling.service')

const { DealsController } = pipedrive

function getWonDateFromDeal (deal) {
  const [wonDate] = deal.won_time.split(' ')
  const utcDate = new Date(wonDate).toISOString()
  return utcDate
}

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
  if (deals.length) {
    const dealsByDate = {}
    deals.forEach(deal => {
      const wonDate = getWonDateFromDeal(deal)
      const actualValue = dealsByDate[wonDate] || 0
      dealsByDate[wonDate] = actualValue + deal.value
    })

    const dbOrderPromises = []
    Object.entries(dealsByDate).forEach(([key, value]) => {
      dbOrderPromises.push(Order.createOrder({
        total_value: value,
        won_date: key
      }))
    })

    try {
      await Promise.all(dbOrderPromises)
    } catch (err) {
      LOGGER.error('Error creating orders in database [%o]', err)
      throw err
    }

    const blingOrderPromises = deals.map(deal => {
      const wonDate = getWonDateFromDeal(deal)
      return BlingService.createOrder({
        code: deal.id,
        companyName: deal.org_name,
        productValue: deal.value,
        productTitle: deal.title,
        wonDate
      })
    })

    try {
      await Promise.all(blingOrderPromises)
    } catch (err) {
      LOGGER.error('Error creating orders in Bling service [%o]', err)
      throw err
    }
  }
}
