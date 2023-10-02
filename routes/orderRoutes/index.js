const orderControllers = require("../../controllers/order")

module.exports = async (app) => {
    app.post("/order/createOrder", async (req, res) => {
        const data = await orderControllers.createOrder(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/order/getOrderList", async (req, res) => {
        const data = await orderControllers.getOrderData(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/order/updateOrder", async (req, res) => {
        const data = await orderControllers.updateOrder(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/order/updateStatusByUser", async (req, res) => {
        const data = await orderControllers.updateStatusByUser(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/order/updateStatusByAdmin", async (req, res) => {
        const data = await orderControllers.updateStatusByAdmin(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/order/getOrderById", async (req, res) => {
        const data = await orderControllers.getOrderById(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/order/deleteOrder", async (req, res) => {
        const data = await orderControllers.deleteOrder(req.body)
        res.status(data.status_code).json(data)
    })
}
