const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {
        userData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        cartItems: [
            {
                productData: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                productPrices: [
                    {
                        variantPriceData: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "VariantPrice",
                        },
                        quantity: Number,
                    },
                ],
            },
        ],
    },
    { timestamps: true }
);

cartSchema.index({ userData: 1 });
cartSchema.index({ "cartItems.productPrices.variantPriceData": 1 });
cartSchema.index({ "cartItems.productData": 1 });

module.exports = mongoose.model("Cart", cartSchema);
