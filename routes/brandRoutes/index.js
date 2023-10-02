
const brandControllers = require("../../controllers/brand")
const { body } = require("express-validator")
const { validateFormFields } = require("../../helpers/middlewares/validateForm")
const AdminAuth = require("../../helpers/middlewares/adminAuth")
const UserAuth = require("../../helpers/middlewares/auth")

module.exports = async (app) => {
    app.post(
        "/brand/createBrand",
        AdminAuth,
        await validateFormFields([
            body("brandName").notEmpty().withMessage("brandName is required"),
            body("isActive").notEmpty().withMessage("isActive is required"),
        ]),

        async (req, res) => {
            const data = await brandControllers.createBrand(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post("/brand/getBrandList", AdminAuth, async (req, res) => {
        const data = await brandControllers.getBrandData(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/brand/customerBrandList", UserAuth, async (req, res) => {
        const data = await brandControllers.getBrandDataCus(req.body)
        res.status(data.status_code).json(data)
    })

    app.post(
        "/brand/updateBrand",
        AdminAuth,
        await validateFormFields([
            body("brandId")
                .notEmpty()
                .withMessage("brandId is required")
                .isMongoId()
                .withMessage("brandId is not in a valid format"),
        ]),

        async (req, res) => {
            const data = await brandControllers.updateBrand(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/brand/getBrandById",
        await validateFormFields([
            body("brandId")
                .notEmpty()
                .withMessage("brandId is required")
                .isMongoId()
                .withMessage("brandId is not in a valid format"),
        ]),

        async (req, res) => {
            const data = await brandControllers.getBrandById(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/brand/deleteBrand",
        AdminAuth,
        await validateFormFields([
            body("brandId")
                .notEmpty()
                .withMessage("brandId is required")
                .isMongoId()
                .withMessage("brandId is not in a valid format"),
        ]),

        async (req, res) => {
            const data = await brandControllers.deleteBrand(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post("/brand/brandDropdown", AdminAuth, async (req, res) => {
        const data = await brandControllers.brandDropdown(req.body)
        res.status(data.status_code).json(data)
    })

    app.post(
        "/brand/changeBrandStatus",
        AdminAuth,
        await validateFormFields([
            body("brandId")
                .notEmpty()
                .withMessage("brandId is required")
                .isMongoId()
                .withMessage("brandId is not in a valid format"),
        ]),

        async (req, res) => {
            const data = await brandControllers.changeBrandStatus(req.body)
            res.status(data.status_code).json(data)
        }
    )
}
