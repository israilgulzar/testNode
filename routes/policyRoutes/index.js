const policyControllers = require("../../controllers/policy")
const AdminAuth = require("../../helpers/middlewares/adminAuth")
const UserAuth = require("../../helpers/middlewares/auth")

module.exports = async (app) => {
    app.post("/policy/policyList", async (req, res) => {
        const data = await policyControllers.getPolicyData(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/policy/createOrUpdatePolicy", AdminAuth, async (req, res) => {
        const data = await policyControllers.addPolicy(req.body)
        res.status(data.status_code).json(data)
    })
}
