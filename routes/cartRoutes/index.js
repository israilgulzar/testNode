const cartControllers = require("../../controllers/cart")
const adminAuth = require("../../helpers/middlewares/adminAuth")
const UserAuth = require("../../helpers/middlewares/auth")

module.exports = async (app) => {
    app.post("/cart/addToCart", UserAuth, async (req, res) => {
        const data = await cartControllers.addCart({
            userId: req.body.userID,
            ...req.body,
        })
        res.status(data.status_code).json(data)
    })

    app.post("/cart/getUserCart", UserAuth, async (req, res) => {
        const data = await cartControllers.getCartData({
            userId: req.body.userID,
        })
        res.status(data.status_code).json(data)
    })

    app.post("/cart/getUserCart", adminAuth, async (req, res) => {
        const data = await cartControllers.getCartData({
            userId: req.body.userID,
        })
        res.status(data.status_code).json(data)
    })

    app.post("/cart/removeCart", UserAuth, async (req, res) => {
        const data = await cartControllers.removeCartData(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/cart/removeCartItem", UserAuth, async (req, res) => {
        const data = await cartControllers.removeCartItem(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/cart/ItemQtyIncrement", UserAuth, async (req, res) => {
        const data = await cartControllers.incrementItemQuantity(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/cart/itemQtyDecrement", UserAuth, async (req, res) => {
        const data = await cartControllers.decrementItemQuantity(req.body)
        res.status(data.status_code).json(data)
    })
}
