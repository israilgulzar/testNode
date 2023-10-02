
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const VariantSchema = new Schema(
    {
        variantType: String, // ml/kg
        isActive: Boolean,
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Variant", VariantSchema)
