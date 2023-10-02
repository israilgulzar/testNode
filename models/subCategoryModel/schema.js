
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const SubCategorySchema = new Schema(
    {
        categoryData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        subCategoryName: String,
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

SubCategorySchema.index({ categoryData: 1 })

module.exports = mongoose.model("SubCategory", SubCategorySchema)
