const imageSliderControllers = require("../../controllers/imageSlider")

module.exports = async (app) => {
    app.post("/imageSlider/createImageSlider", async (req, res) => {
        const data = await imageSliderControllers.createImageSlider(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/imageSlider/getImageSliderData", async (req, res) => {
        const data = await imageSliderControllers.getImageSliderData(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/imageSlider/getImageSliderDataCus", async (req, res) => {
        const data = await imageSliderControllers.getImageSliderDataCus(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/imageSlider/updateimageSlider", async (req, res) => {
        const data = await imageSliderControllers.updateimageSlider(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/imageSlider/deleteImageSlider", async (req, res) => {
        const data = await imageSliderControllers.deleteImageSlider(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/imageSlider/chnageImageSliderStatus", async (req, res) => {
        const data = await imageSliderControllers.chnageImageSliderStatus(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/imageSlider/changePosition", async (req, res) => {
        const data = await imageSliderControllers.changePosition(req.body)
        res.status(data.status_code).json(data)
    })
}
