
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserAddressSchema = new Schema(
    {
        userData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        receiverName: String,
        receiverEmail: String,
        receiverPhone: String,
        receiverCountryCode: String,
        address: String,
        pincode: String,
        country: String,
        state: String,
        city: String,
        street: String,
        landmark: String,
        lastUsedFlag: Boolean,
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("UserAddress", UserAddressSchema)
