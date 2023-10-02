let userRoutes = require("./userRoutes")
const adminRoutes = require("./adminRoutes")
const brandRoutes = require("./brandRoutes")

module.exports = (app) => {
    userRoutes(app)
    adminRoutes(app)
    brandRoutes(app)
}
