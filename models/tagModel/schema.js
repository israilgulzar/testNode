
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const tagSchema = new Schema(
    {
        tagName: String,
        isActive: Boolean,
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("tag", tagSchema)
