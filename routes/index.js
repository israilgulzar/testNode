let userRoutes = require("./userRoutes")
let catagoryRoutes = require("./catagoryRoutes")
let brandRoutes = require("./brandRoutes")
let subCategoryRoutes = require("./subCategoryRoutes")
let variantRoutes = require("./variantRoutes")
let productRoutes = require("./productRoutes")
let adminRoutes = require("./adminRoutes")
let cartRoutes = require("./cartRoutes")
let orderRoutes = require("./orderRoutes")
let userAddressRoutes = require("./userAddressRoutes")
let policyRoutes = require("./policyRoutes")
let tagRoutes = require("./tagRoutes")
let reviewRoutes = require("./reviewRoutes")

module.exports = (app) => {
    userRoutes(app)
    catagoryRoutes(app)
    brandRoutes(app)
    subCategoryRoutes(app)
    variantRoutes(app)
    productRoutes(app)
    adminRoutes(app)
    cartRoutes(app)
    orderRoutes(app)
    userAddressRoutes(app)
    tagRoutes(app)
    policyRoutes(app)
    reviewRoutes(app)
}
