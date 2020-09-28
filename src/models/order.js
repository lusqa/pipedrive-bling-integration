const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema(
  {
    total_value: {
      type: Number,
      required: true
    },
    won_date: {
      type: Date,
      required: true,
      unique: true
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
      total_value: params.totalValue,
      won_date: params.wonDate
    })
  })

  session.endSession()

  return order
}

module.exports = mongoose.model('order', schema, 'order')
