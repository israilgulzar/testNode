
const mongoose = require("mongoose");

const { Schema } = mongoose;

const VariantPriceSchema = new Schema(
  {
    variantData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
      default: null, // Set the default value to null if the product has no variants
    },
    stock: {
      type: Number,
      required: true, // Assuming stock is required
    },
    price: {
      type: Number,
      required: true, // Assuming price is required
    },
    oldPrice: {
      type: Number,
      default: null, // Set the default value to null if there's no old price
    },
    sliderImages: [String],
    isReturnable: {
      type: Boolean,
      default: true,
    },
    canApplyCoupon: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    discounts: {
      type: Number,
      default: 0, // Assuming default discount is 0
    },
    isDeleted: {
      type: Boolean,
      default: false
  },
  },
  { timestamps: true }
);

VariantPriceSchema.index({ variantData: 1 });

const VariantPrice = mongoose.model("VariantPrice", VariantPriceSchema);

module.exports = VariantPrice;
