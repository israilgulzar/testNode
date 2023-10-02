const mongoose = require("mongoose")

const Schema = mongoose.Schema

const OrderSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        userAddressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserAddress",
            required: true,
        },
        couponId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Coupon",
            required: true,
        },
        variantPriceIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "VariantPrice",
                required: true,
            },
        ],
        expectedDeliveryDate: Date,
        orderStatus: {
            type: Number,
            default: 1, // 1.'pending', 2 reject, 3 accept, 4 processing, 5 onGoing 6 complte , 7 cancle
        },
        totalAmount: {
            type: Number,
        },
        paymentStatus: Boolean, // success and faield
        paymentMethod: String,
        discount: Number,
        texAmount: Number,
        subTotal: Number, //invoice amount, totalAmount + texAmount + discount =
        orderNote: String,
    },
    { timestamps: true }
)

OrderSchema.index({ userId: 1 })
OrderSchema.index({ userAddressId: 1 })
OrderSchema.index({ variantPriceIds: 1 })
OrderSchema.index({ couponId: 1 })

module.exports = mongoose.model("Order", OrderSchema)
