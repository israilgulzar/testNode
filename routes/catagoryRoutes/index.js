
const CatagoryControllers = require("../../controllers/category/index")
const AdminAuth = require("../../helpers/middlewares/adminAuth")
const UserAuth = require("../../helpers/middlewares/auth")
const { body } = require("express-validator")
const { validateFormFields } = require("../../helpers/middlewares/validateForm")

module.exports = async (app) => {
    app.post(
        "/category/createCategory",
        AdminAuth,
        await validateFormFields([
            body("categoryName")
                .notEmpty()
                .withMessage("categoryName is required"),
        ]),

        async (req, res) => {
            const data = await CatagoryControllers.createCategory(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post("/category/getCategoryList", AdminAuth, async (req, res) => {
        const data = await CatagoryControllers.getCategoryData(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/category/customerCategoryList", UserAuth, async (req, res) => {
        const data = await CatagoryControllers.customerCategoryList(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/category/categoryDropdown", AdminAuth, async (req, res) => {
        const data = await CatagoryControllers.categoryDropdown(req.body)
        res.status(data.status_code).json(data)
    })

    app.post(
        "/category/updateCategory",
        AdminAuth,
        await validateFormFields([
            body("categoryName")
                .notEmpty()
                .withMessage("categoryName is required"),
            body("categoryId")
                .notEmpty()
                .withMessage("categoryId is require")
                .isMongoId()
                .withMessage("catgoryId not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await CatagoryControllers.updateCategory(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/category/chnageCategoryStatus",
        AdminAuth,
        await validateFormFields([
            body("categoryId")
                .notEmpty()
                .withMessage("categoryId is required")
                .isMongoId()
                .withMessage("catgoryId not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await CatagoryControllers.chnageCategoryStatus(
                req.body
            )
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/category/getCategoryById",
        await validateFormFields([
            body("categoryId")
                .notEmpty()
                .withMessage("categoryId is required")
                .isMongoId()
                .withMessage("catgoryId not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await CatagoryControllers.getCategoryById(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/category/deleteCategory",
        AdminAuth,
        await validateFormFields([
            body("categoryId")
                .notEmpty()
                .withMessage("categoryId is required")
                .isMongoId()
                .withMessage("catgoryId not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await CatagoryControllers.deleteCategory(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/category/updateCategoryPosition",
        AdminAuth,
        async (req, res) => {
            const data = await CatagoryControllers.updateCategoryPosition(
                req.body
            )
            res.status(data.status_code).json(data)
        }
    )

    app.post("/category/getCategorysWithSubCategoryData", async (_, res) => {
        const data = await CatagoryControllers.getCategorysWithSubCategoryData()
        res.status(data.status_code).json(data)
    })
}
