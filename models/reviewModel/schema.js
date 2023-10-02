const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        rating: {
            type: Number,
        },
        userData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        productData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        // likes: {
        //     type: Number,
        //     default: 0,
        // },
        likes: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
            },
          ],
        unlikes: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)


const Review = mongoose.model("Review", reviewSchema)

module.exports = Review
