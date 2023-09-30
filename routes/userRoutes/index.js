
const userControllers = require("../../controllers/user")
const UserAuth = require("../../helpers/middlewares/auth")
const AdminAuth = require("../../helpers/middlewares/adminAuth")
const { validateFormFields } = require("../../helpers/middlewares/validateForm")
const { body } = require("express-validator")

module.exports = async (app) => {
    app.post(
        "/user/createUser",
        await validateFormFields([
            body("name")
                .notEmpty()
                .withMessage("name is required")
                .matches(/^[a-zA-Z0-9\s\-_.]*$/)
                .withMessage("Enter a valid userName"),

            body("email")
                .notEmpty()
                .withMessage("email is required")
                .isEmail()
                .withMessage("Invalid email format"),
            ,
            body("phone")
                .notEmpty()
                .withMessage("phone is required")
                .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
                .withMessage("Please enter valid phone"),

            body("password")
                .notEmpty()
                .withMessage("password is required")
                .isStrongPassword({
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                })
                .withMessage(
                    "password must be contain 8 characters, One Uppercase, One Lowercase  and One Number like P@ssw0rd"
                ),
        ]),
        async (req, res) => {
            const data = await userControllers.createUser(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/user/login",
        await validateFormFields([
            body("email").notEmpty().withMessage("email is required"),

            body("password").notEmpty().withMessage("password is required"),
        ]),
        async (req, res) => {
            const data = await userControllers.loginUser(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post("/user/getUserList", AdminAuth, async (req, res) => {
        const data = await userControllers.getUserData(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/user/updateUser", UserAuth, async (req, res) => {
        const data = await userControllers.updateUser({
            userId: req.body.userID,
            ...req.body,
        })
        res.status(data.status_code).json(data)
    })

    app.post("/user/getUserById", UserAuth, async (req, res) => {
        const data = await userControllers.getUserById({
            userId: req.body.userID,
        })
        res.status(data.status_code).json(data)
    })

    app.post("/user/deleteUser", UserAuth, async (req, res) => {
        const data = await userControllers.deleteUser({
            userId: req.body.userID,
        })
        res.status(data.status_code).json(data)
    })

    app.post("/user/forgotPassword", UserAuth, async (req, res) => {
        const { email } = req.body
        const data = await userControllers.forgotPassword({ email })
        res.status(data.status_code).json(data)
    })

    app.post("/user/resetPassword/:userId/:token", async (req, res) => {
        const { userId, token } = req.params
        const { password } = req.body
        const data = await userControllers.resetPassword({
            userId,
            token,
            password,
        })
        res.status(data.status_code).json(data)
    })

    app.post(
        "/user/chnageUserPassword",
        UserAuth,
        await validateFormFields([
            body("oldPassword")
                .notEmpty()
                .withMessage("Old password is required"),

            body("newPassword")
                .notEmpty()
                .withMessage("New password is required")
                .isStrongPassword({
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                })

                .withMessage(
                    "Password must contain 8 characters, one uppercase letter, one lowercase letter, and one number."
                ),

            body("confirmPassword")
                .notEmpty()
                .withMessage("Confirm password is required")
                .isStrongPassword({
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                })
                .withMessage(
                    "Password must contain 8 characters, one uppercase letter, one lowercase letter, and one number."
                ),
        ]),
        async (req, res) => {
            const data = await userControllers.chnageUserPassword({
                userId: req.body.userID,
                ...req.body,
            })
            res.status(data.status_code).json(data)
        }
    )
}
