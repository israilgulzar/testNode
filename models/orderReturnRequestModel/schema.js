const mongoose = require("mongoose")

const Schema = mongoose.Schema

const OrderReturnRequestSchema = new Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        variantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Variant",
            required: true,
        },
        UserBanksId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserBanks",
            required: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        paymentStatus: Boolean,
        paymentMethod: String,
        status: Boolean,
    },
    { timestamps: true }
)

OrderReturnRequestSchema.index({ UserBanks: 1 })
OrderReturnRequestSchema.index({ variantId: 1 })
OrderReturnRequestSchema.index({ orderId: 1 })
OrderReturnRequestSchema.index({ userId: 1 })

module.exports = mongoose.model("OrderReturnRequest", OrderReturnRequestSchema)
