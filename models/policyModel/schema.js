const mongoose = require("mongoose")

const Schema = mongoose.Schema

const policySchema = new Schema(
    {
        termsAndConditions: {
            type: String,
        },
        privacyPolicy: {
            type: String,
        },
        refundPolicy: {
            type: String,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("policy", policySchema)
