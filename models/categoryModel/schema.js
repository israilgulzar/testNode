
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CategorySchema = new Schema(
    {
        categoryName: String,
        isActive: Boolean,
        shortOrder: {
            type: Number,
            default: 1
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
)



module.exports = mongoose.model("Category", CategorySchema)
