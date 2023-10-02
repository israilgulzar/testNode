
const tagControllers = require("../../controllers/tag")
const { validateFormFields } = require("../../helpers/middlewares/validateForm")
const { body } = require("express-validator")
const AdminAuth = require("../../helpers/middlewares/adminAuth")
const UserAuth = require("../../helpers/middlewares/auth")

module.exports = async (app) => {
    app.post(
        "/tag/createTag", AdminAuth,
        await validateFormFields([
            body("tagName").notEmpty().withMessage("tagName is required"),
        ]),
        async (req, res) => {
            const data = await tagControllers.addTag(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post("/tag/getTagsList", async (req, res) => {
        const data = await tagControllers.getTagsData(req.body)
        res.status(data.status_code).json(data)
    })

    app.post(
        "/tag/updateTag", AdminAuth,
        await validateFormFields([
            body("id")
                .notEmpty()
                .withMessage("id is require")
                .isMongoId()
                .withMessage("id is not valid"),
        ]),

        async (req, res) => {
            const data = await tagControllers.updateTag(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/tag/changeTagStatus",AdminAuth,
        await validateFormFields([
            body("id")
                .notEmpty()
                .withMessage("id is require")
                .isMongoId()
                .withMessage("id is not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await tagControllers.changeTagStatus(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/tag/getTagDataById",
        await validateFormFields([
            body("id")
                .notEmpty()
                .withMessage("id is require")
                .isMongoId()
                .withMessage("id is not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await tagControllers.getTagDataById(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/tag/deleteTag",AdminAuth,
        await validateFormFields([
            body("id")
                .notEmpty()
                .withMessage("id is require")
                .isMongoId()
                .withMessage("id is not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await tagControllers.deleteTag(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post("/tag/searchTag", async (req, res) => {
        const data = await tagControllers.searchTag(req.body)
        res.status(data.status_code).json(data)
    })
}
