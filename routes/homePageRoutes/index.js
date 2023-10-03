const homePageControllers = require("../../controllers/homePage")

module.exports = async (app) => {
    app.post("/homePage/category", async (req, res) => {
        const data = await homePageControllers.categoryList(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/homePage/brand", async (req, res) => {
        const data = await homePageControllers.getBrandData(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/homePage/product", async (req, res) => {
        const data = await homePageControllers.getProductData(req.body)
        res.status(data.status_code).json(data)
    })

    
    app.post("/homePage/badgeType", async (req, res) => {
      const data = await homePageControllers.getProduct(req.body)
      res.status(data.status_code).json(data)
  })

}
