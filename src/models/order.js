const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema(
  {
    id_deal: {
      type: String,
      required: true,
      unique: true
    },
    client: {
      company_name: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    product: {
      title: {
        type: String,
        required: true
      },
      currency: {
        type: String,
        required: true
      },
      value: {
        type: Number,
        required: true
      }
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

schema.statics.createOrder = async function (params) {
  const session = await mongoose.startSession()

  let order
  await session.withTransaction(async () => {
    order = await this.create({
      id_deal: params.id_deal,
      client: {
        company_name: params.company_name,
        name: params.name
      },
      product: {
        title: params.title,
        currency: params.currency,
        value: params.value
      }
    })
  })

  session.endSession()

  return order
}

module.exports = mongoose.model('order', schema, 'order')
