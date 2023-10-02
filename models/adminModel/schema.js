const mongoose = require("mongoose")

const Schema = mongoose.Schema

const AdminSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("admin", AdminSchema)
