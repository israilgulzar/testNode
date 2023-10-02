const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CouponSchema = new Schema(
    {
        couponName: String,
        couponCode: String,
        type: Number, // persentage/amount
        isActive: Boolean,
        startDate: Date,
        endDate: Date,
        minOrderAmount: Number,
        paymentMethod: String,
        totalUsed: Number,
    },
    { timestamps: true }
)

module.exports = mongoose.model("Coupon", CouponSchema)
