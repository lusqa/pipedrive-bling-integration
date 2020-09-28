module.exports = {
  getXML: ({ companyName, code, productTitle, productValue, dateCreated }) => (`
    <?xml version="1.0" encoding="ISO-8859-1"?>
      <pedido>
        <cliente>
            <nome>${companyName}</nome>
            <data>${dateCreated}</data>
        </cliente>
        <transporte>
          <volume>
            <servico>digital</servico>
          </volume>
        </transporte>
        <itens>
            <item>
                <codigo>${code}</codigo>
                <descricao>${productTitle}</descricao>
                <qtde>1</qtde>
                <vlr_unit>${productValue}</vlr_unit>
            </item>
        </itens>
      </pedido>
    `)
}
