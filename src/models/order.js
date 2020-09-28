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

  await session.withTransaction(async () => {
    const existingOrder = await this.findOne({ won_date: params.won_date })

    if (!existingOrder) {
      await this.create({
        total_value: params.total_value,
        won_date: params.won_dat
      })
    }
  })

  session.endSession()
}

module.exports = mongoose.model('order', schema, 'order')
