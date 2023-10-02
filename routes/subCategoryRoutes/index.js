
const SubCategoryControllers = require("../../controllers/subCategory")
const AdminAuth = require("../../helpers/middlewares/adminAuth")
const UserAuth = require("../../helpers/middlewares/auth")
const { body } = require("express-validator")
const { validateFormFields } = require("../../helpers/middlewares/validateForm")

module.exports = async (app) => {
    app.post(
        "/subCategory/createSubCategory",
        AdminAuth,
        await validateFormFields([
            body("categoryId")
                .notEmpty()
                .withMessage("categoryId is required")
                .isMongoId()
                .withMessage("catgoryId not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await SubCategoryControllers.createSubCategory(
                req.body
            )
            res.status(data.status_code).json(data)
        }
    )

    app.post("/subCategory/getSubCategoryList", AdminAuth, async (req, res) => {
        const data = await SubCategoryControllers.getSubCategoryData(req.body)
        res.status(data.status_code).json(data)
    })

    app.post(
        "/subCategory/customerSubCategoryList",
        UserAuth,
        async (req, res) => {
            const data = await SubCategoryControllers.getSubCategoryDataCus(
                req.body
            )
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/subCategory/updateSubCategory",
        AdminAuth,
        await validateFormFields([
            body("categoryId")
                .notEmpty()
                .withMessage("categoryId is required")
                .isMongoId()
                .withMessage("catgoryId not match in mongoose"),

            body("subCategoryId")
                .notEmpty()
                .withMessage("subCategoryId is required")
                .isMongoId()
                .withMessage("subCategoryId not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await SubCategoryControllers.updateSubCategory(
                req.body
            )
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/subCategory/chnageSubCategoryStatus",
        AdminAuth,
        await validateFormFields([
            body("subCategoryId")
                .notEmpty()
                .withMessage("subCategoryId is required")
                .isMongoId()
                .withMessage("subCategoryId not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await SubCategoryControllers.chnageSubCategoryStatus(
                req.body
            )
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/subCategory/getSubCategoryById",
        AdminAuth,
        await validateFormFields([
            body("subCategoryId")
                .notEmpty()
                .withMessage("subCategoryId is required")
                .isMongoId()
                .withMessage("subCategoryId not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await SubCategoryControllers.getSubCategoryById(
                req.body
            )
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/subCategory/deleteSubCategory",
        AdminAuth,
        await validateFormFields([
            body("subCategoryId")
                .notEmpty()
                .withMessage("subCategoryId is required")
                .isMongoId()
                .withMessage("subCategoryId not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await SubCategoryControllers.deleteSubCategory(
                req.body
            )
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/subCategory/subCategoryDropdown",
        AdminAuth,
        async (req, res) => {
            const data = await SubCategoryControllers.subCategoryDropdown(
                req.body
            )
            res.status(data.status_code).json(data)
        }
    )
}
