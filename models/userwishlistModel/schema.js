const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserwishlistSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        variantPriceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "VariantPrice",
        },
    },
    { timestamps: true }
)

UserwishlistSchema.index({ userId: 1 })
UserwishlistSchema.index({ variantPriceId: 1 })

module.exports = mongoose.model("Userwishlist", UserwishlistSchema)
