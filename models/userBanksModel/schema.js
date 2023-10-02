const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserBanksSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        ifscCode: String,
        accountNumber: String,
        branchAddress: String,
        isVerified: Boolean,
        isActive: Boolean,
    },
    { timestamps: true }
)

module.exports = mongoose.model("UserBanks", UserBanksSchema)
