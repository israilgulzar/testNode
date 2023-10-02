
const ReviewControllers = require("../../controllers/review")
const { body } = require("express-validator")
const { validateFormFields } = require("../../helpers/middlewares/validateForm")
const AdminAuth = require("../../helpers/middlewares/adminAuth")
const UserAuth = require("../../helpers/middlewares/auth")

module.exports = async (app) => {
    app.post(
        "/review/reviewSubmit",
        await validateFormFields([
            body("userId")
                .notEmpty()
                .withMessage("userId is required")
                .isMongoId()
                .withMessage("userId not match in mongoose"),
            body("productId")
                .notEmpty()
                .withMessage("productId is required")
                .isMongoId()
                .withMessage("productId not match in mongoose"),
            body("rating").notEmpty().withMessage("rating is required"),
        ]),
        
        async (req, res) => {
            const data = await ReviewControllers.reviewSubmit(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/review/getReviewData",
        await validateFormFields([
            body("productId")
                .notEmpty()
                .withMessage("productId is required")
                .isMongoId()
                .withMessage("productId not match in mongoose"),
        ]),
        async (req, res) => {
            const data = await ReviewControllers.getReviewData(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/review/updateReview",
        await validateFormFields([
            body("reviewId")
                .notEmpty()
                .withMessage("reviewId is required")
                .isMongoId()
                .withMessage("reviewId not match in mongoose"),
            body("productId")
                .notEmpty()
                .withMessage("productId is required")
                .isMongoId()
                .withMessage("productId not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await ReviewControllers.updateReview(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/review/getReviewById",
        await validateFormFields([
            body("reviewId")
                .notEmpty()
                .withMessage("reviewId is required")
                .isMongoId()
                .withMessage("reviewId not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await ReviewControllers.getReviewById(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/review/deleteReview",
        await validateFormFields([
            body("reviewId")
                .notEmpty()
                .withMessage("reviewId is required")
                .isMongoId()
                .withMessage("reviewId not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await ReviewControllers.deleteReview(req.body)
            res.status(data.status_code).json(data)
        }
    )

    app.post(
        "/review/like",
        await validateFormFields([
            body("reviewId")
                .notEmpty()
                .withMessage("reviewId is required")
                .isMongoId()
                .withMessage("reviewId not match in mongoose"),
        ]),

        async (req, res) => {
            const data = await ReviewControllers.likeReview(req.body)
            res.status(data.status_code).json(data)
        }
    )
}
