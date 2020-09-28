const pipedrive = require('pipedrive')

const LOGGER = require('../../logger')([__filename].join())

const Order = require('../../models/order')

const { PIPEDRIVE_API_TOKEN } = require('../../env')

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
  try {
    deals.forEach(async deal => {
      const existingOrder = await Order.findOne({ id_deal: deal.id })

      if (!existingOrder) {
        LOGGER.debug('Creating order on database to deal id: [%s]', deal.id)
        await Order.createOrder({
          company_name: deal.org_name,
          name: deal.person_name,
          title: deal.title,
          currency: deal.currency,
          value: deal.value,
          id_deal: deal.id
        })
      }
    })
  } catch (err) {
    LOGGER.error('Error creating orders in database [%o]', err)
    throw err
  }
}
