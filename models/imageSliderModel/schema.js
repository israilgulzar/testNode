const mongoose = require("mongoose");

const { Schema } = mongoose;

const imageSliderSchema = new Schema(
    {
        imageUrl: {
            type: String, 
        },
        redirectLink: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        shortOrder:{
            type: Number,
            default: 0,
        }

        // alternative: {
        //     type: String,
        // },
    },
    { timestamps: true }
);

module.exports = mongoose.model("imageSlider", imageSliderSchema);
