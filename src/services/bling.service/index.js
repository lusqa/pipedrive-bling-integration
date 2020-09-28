const axios = require('axios').default

const LOGGER = require('../../logger')([__filename].join())

const { BLING_API_KEY } = require('../../env')
const xml = require('./xml')

module.exports = {
  createOrder: async (order) => {
    LOGGER.debug('Creating order on Bling to deal id: [%s]', order.code)
    try {
      const orderXML = xml.getXML({
        code: order.code,
        companyName: order.companyName,
        productValue: order.productValue,
        productTitle: order.productTitle
      })
      const { data } = await axios.post('https://bling.com.br/Api/v2/pedido/json/', undefined, {
        params: {
          apikey: BLING_API_KEY,
          xml: orderXML
        }
      })
      const { erros, pedidos } = data.retorno
      if (erros) {
        throw new Error(JSON.stringify(erros))
      }
      LOGGER.debug('Order created on Bling succesfully, pedidoId: [%s]', pedidos[0].pedido.idPedido)
    } catch (err) {
      LOGGER.error('Error creating order on Bling: [%o]', err)
      throw err
    }
  }
}
