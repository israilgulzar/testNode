
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const BrandSchema = new Schema(
    {
        brandName: String,
        brandImage: String,
        isActive: Boolean,
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Brand", BrandSchema)
