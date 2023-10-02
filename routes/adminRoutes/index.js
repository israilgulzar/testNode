
const adminControllers = require("../../controllers/admin")
const AdminAuth = require("../../helpers/middlewares/adminAuth")
const { body } = require("express-validator")
const { validateFormFields } = require("../../helpers/middlewares/validateForm")

module.exports = async (app) => {
    app.post(
        "/admin/createAdmin",
        await validateFormFields([
            body("name")
                .notEmpty()
                .withMessage("name is required")
                .matches(/^[a-zA-Z0-9\s\-_.]*$/)
                .withMessage("Enter a valid name"),
            ,
            body("email")
                .notEmpty()
                .withMessage("Email is required")
                .isEmail()
                .withMessage("Invalid email format"),

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
            const data = await adminControllers.createAdmin(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/admin/login",
        await validateFormFields([
            body("email").notEmpty().withMessage("Email is required"),

            body("password").notEmpty().withMessage("Password is required"),
        ]),
        async (req, res) => {
            const data = await adminControllers.loginAdmin(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post("/admin/getAdminList", async (req, res) => {
        const data = await adminControllers.getAdminData(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/admin/updateAdmin", AdminAuth, async (req, res) => {
        const data = await adminControllers.updateAdmin({
            adminId: req.body.adminID,
            ...req.body,
        })
        res.status(data.status_code).json(data)
    })

    app.post("/admin/getAdminById", AdminAuth, async (req, res) => {
        const data = await adminControllers.getAdminById({
            adminId: req.body.adminID,
        })
        res.status(data.status_code).json(data)
    })

    app.post("/admin/deleteAdmin", AdminAuth, async (req, res) => {
        const data = await adminControllers.deleteAdmin({
            adminId: req.body.adminID,
        })
        res.status(data.status_code).json(data)
    })
}
