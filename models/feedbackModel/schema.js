;
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedbackSchema = new Schema(
    {
        userData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        productData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        rating: {
            type: Number,
        },
        feedbackString: {
            type: String
        },
        image: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
