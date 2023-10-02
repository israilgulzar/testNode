
const Feedback = require("../../controllers/feedback")
const UserAuth = require("../../helpers/middlewares/auth")
const AdminAuth = require("../../helpers/middlewares/adminAuth")

module.exports = async (app) => {
    app.post("/feedback/apply", UserAuth, async (req, res) => {
        const data = await Feedback.applyFeedback(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/feedback/getfeedbackList", async (req, res) => {
        const data = await Feedback.getfeedbackData(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/feedback/updatefeedback", UserAuth, async (req, res) => {
        const data = await Feedback.updatefeedback(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/feedback/getfeedbackById", UserAuth, async (req, res) => {
        const data = await Feedback.getfeedbackById(req.body)
        res.status(data.status_code).json(data)
    })

    app.post("/feedback/deletefeedback", UserAuth, async (req, res) => {
        const data = await Feedback.deletefeedback(req.body)
        res.status(data.status_code).json(data)
    })
}
