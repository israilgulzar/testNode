
const variantControllers = require("../../controllers/variant")
const { validateFormFields } = require("../../helpers/middlewares/validateForm")
const { body } = require("express-validator")
const AdminAuth = require("../../helpers/middlewares/adminAuth")
const UserAuth = require("../../helpers/middlewares/auth")

module.exports = async (app) => {
    app.post(
        "/variant/createVariant",
        AdminAuth,
        await validateFormFields([
            body("variantType")
                .notEmpty()
                .withMessage("variantType is required"),
        ]),

        async (req, res) => {
            req.body
            const data = await variantControllers.createVariant(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post("/variant/getVariantList", AdminAuth, async (req, res) => {
        const data = await variantControllers.getVariantData(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/variant/customerVariantList", UserAuth, async (req, res) => {
        const data = await variantControllers.getVariantDataCus(req.body)
        res.status(data.status_code).json(data)
    })

    app.post(
        "/variant/updateVariant",
        AdminAuth,
        await validateFormFields([
            body("variantId")
                .notEmpty()
                .withMessage("variantId is require")
                .isMongoId()
                .withMessage("variantId is not valid"),

            body("variantType")
                .notEmpty()
                .withMessage("variantType is require"),
        ]),

        async (req, res) => {
            const data = await variantControllers.updateVariant(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/variant/chnageVariantStatus",
        AdminAuth,
        await validateFormFields([
            body("variantId")
                .notEmpty()
                .withMessage("variantId is require")
                .isMongoId()
                .withMessage("variantId is not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await variantControllers.chnageVariantStatus(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/variant/getVariantById",
        await validateFormFields([
            body("variantId")
                .notEmpty()
                .withMessage("variantId is require")
                .isMongoId()
                .withMessage("variantId is not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await variantControllers.getVariantById(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/variant/deleteVariant",
        await validateFormFields([
            body("variantId")
                .notEmpty()
                .withMessage("variantId is require")
                .isMongoId()
                .withMessage("variantId is not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await variantControllers.deleteVariant(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post("/variant/variantDropdown", async (req, res) => {
        const data = await variantControllers.variantDropdown(req.body)
        res.status(data.status_code).json(data)
    })
}
