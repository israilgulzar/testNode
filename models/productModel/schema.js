
const mongoose = require("mongoose")

const { Schema } = mongoose

const productSchema = new Schema(
    {
        // categoryData: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Category",
        //     // required: true,
        // },
        subCategoryData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory",
            // required: true,
        },
        brandData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
        },
        variantPriceData: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "VariantPrice",
            },
        ],
        parentProductData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        productType: {
            type: Number,
            default: 1, //1 branded ,  2 clone, 3 taj product
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        name: {
            type: String,
            required: true,
        },
        badgeType: {
            type: Number,
            default: 1,
        },
        hasVariants: {
            type: Boolean,
            default: false,
        },
        description: String,
        shortDescription: String,
        thumbnailImage: String,
        tags: [String],
        stepFlag: {
            type: Number,
            default: 1,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

// Indexes
productSchema.index({ variantPriceData: 1 })
productSchema.index({ subCategoryData: 1 })
productSchema.index({ variantData: 1 })
productSchema.index({ parentProductData: 1 })
productSchema.index({ brandData: 1 })

const Product = mongoose.model("Product", productSchema)

module.exports = Product
