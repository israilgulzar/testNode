
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        phone: Number,
        countryCode: String,
        gender: String,
        emailVerifyAt: Date,
        passwordResetToken: String,
        referral: String,
        isCreatedByAdmin: Boolean,
        isActive: Boolean,
        defaultLanguage: { type: String, default: "english" },
        profileImage: String,
        dateOfBirth: String,
        token: String,   // reset password token
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)
