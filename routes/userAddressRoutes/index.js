
const UserAddressControllers = require("../../controllers/userAddress")
const UserAuth = require("../../helpers/middlewares/auth")
const { validateFormFields } = require("../../helpers/middlewares/validateForm")
const { body } = require("express-validator")

module.exports = async (app) => {
    app.post(
        "/userAddress/createUserAddress",
        UserAuth,
        await validateFormFields([
            body("receiverName")
                .notEmpty()
                .withMessage("receiverName is required"),

            body("receiverEmail")
                .notEmpty()
                .withMessage("receiverEmail is required"),

            body("receiverPhone")
                .notEmpty()
                .withMessage("receiverPhone is required"),

            body("receiverCountryCode")
                .notEmpty()
                .withMessage("receiverCountryCode is required"),

            body("address").notEmpty().withMessage("address is required"),
        ]),
        async (req, res) => {
            const data = await UserAddressControllers.createUserAddress({
                userId: req.body.userID,
                ...req.body,
            })
            res.status(data.status_code).json(data)
        }
    )

    app.post("/userAddress/getUserAddressData", UserAuth, async (req, res) => {
        const data = await UserAddressControllers.getUserAddressData(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/userAddress/updateUserAddress", UserAuth, async (req, res) => {
        const data = await UserAddressControllers.updateUserAddress({
            userId: req.body.userID,
            ...req.body,
        })
        res.status(data.status_code).json(data)
    })

    app.post(
        "/userAddress/getUserAddressById",
        UserAuth,
        await validateFormFields([
            body("userAddressId")
                .notEmpty()
                .withMessage("userAddressId is required")
                .isMongoId()
                .withMessage("userAddressId not match in mongoose"),
        ]),
        async (req, res) => {
            const data = await UserAddressControllers.getUserAddressById(
                req.body
            )
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/userAddress/deleteUserAddress",
        UserAuth,
        await validateFormFields([
            body("userAddressId")
                .notEmpty()
                .withMessage("userAddressId is required")
                .isMongoId()
                .withMessage("userAddressId not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await UserAddressControllers.deleteUserAddress(
                req.body
            )
            res.status(data.status_code).json(data)
        }
    )
}
